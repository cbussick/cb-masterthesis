import { useCBExerciseSequence } from "@/components/CBExerciseSequence/useCBExerciseSequenceProvider";
import { CBImage } from "@/components/CBImage/CBImage";
import { useUser } from "@/firebase/useUser";
import { playCorrectSound } from "@/helpers/playCorrectSound";
import { playIncorrectSound } from "@/helpers/playIncorrectSound";
import { Box, ButtonProps, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { CBQuizAnswerButton } from "./CBQuizAnswerButton/CBQuizAnswerButton";
import { CBQuizProps } from "./CBQuizInterfaces";

export const CBQuiz = ({
  exercise,
  onMistake,
  onCompleteExercise,
}: CBQuizProps): JSX.Element => {
  const user = useUser();
  const {
    isCurrentExerciseFinished,
    setCurrentExerciseFinished,
    setExercises,
  } = useCBExerciseSequence();

  const [clickedButton, setClickedButton] = useState<string>("");

  const onConfirm: ButtonProps["onClick"] = (e) => {
    const castEventTarget = e.currentTarget as HTMLButtonElement;
    const buttonAnswerId = castEventTarget.id;

    setClickedButton(buttonAnswerId);

    setCurrentExerciseFinished(true);

    const isCorrect = exercise.correctAnswer === buttonAnswerId;

    if (isCorrect && user?.user?.uid) {
      onCompleteExercise({ exerciseId: exercise.id, isCorrect });

      setExercises((previousExercises) => {
        const newExercises = previousExercises.map((ex) => {
          if (ex.id === exercise.id) {
            return {
              ...ex,
              isCompleted: true,
            };
          }
          return ex;
        });

        return newExercises;
      });

      playCorrectSound();
    } else {
      if (onMistake) {
        onMistake({
          id: exercise.id,
          topic: exercise.topic,
          type: exercise.type,
        });
      }

      playIncorrectSound();
    }
  };

  return (
    <Stack spacing={4}>
      <Box display="flex" justifyContent="center">
        <Stack spacing={5} maxWidth={1200} width="100%">
          <Stack justifyContent="center" alignItems="center" spacing={4}>
            {exercise.image && <CBImage image={exercise.image} />}

            <Grid container width="100%" spacing={2}>
              {exercise.answers.map((answer) => (
                <Grid xs={12} lg={6} key={answer.id}>
                  <CBQuizAnswerButton
                    answer={answer}
                    isCorrect={exercise.correctAnswer === answer.id}
                    onClick={onConfirm}
                    isCurrentExerciseFinished={isCurrentExerciseFinished}
                    clickedButton={clickedButton}
                  />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};
