import { useCBExerciseSequence } from "@/components/CBExerciseSequence/useCBExerciseSequenceProvider";
import { CBImage } from "@/components/CBImage/CBImage";
import { CBAnswer } from "@/data/exercises/CBAnswer";
import { useUser } from "@/firebase/useUser";
import { playCorrectSound } from "@/helpers/playCorrectSound";
import { playIncorrectSound } from "@/helpers/playIncorrectSound";
import { Box, ButtonProps, Container, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
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
  const [randomizedAnswers, setRandomizedAnswers] = useState<CBAnswer[]>([]);

  useEffect(() => {
    setRandomizedAnswers([...exercise.answers].sort(() => Math.random() - 0.5));
  }, [exercise.answers]);

  const onConfirm: ButtonProps["onClick"] = (e) => {
    const buttonAnswerId = e.currentTarget.id;

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container>
        <Stack
          spacing={4}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {exercise.image && <CBImage image={exercise.image} />}

          <Grid
            container
            spacing={2}
            sx={{
              width: "100%",
            }}
          >
            {randomizedAnswers.map((answer, index) => (
              <Grid xs={12} lg={6} key={answer.id}>
                <CBQuizAnswerButton
                  answer={answer}
                  isCorrect={exercise.correctAnswer === answer.id}
                  onClick={onConfirm}
                  isCurrentExerciseFinished={isCurrentExerciseFinished}
                  clickedButton={clickedButton}
                  index={index}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};
