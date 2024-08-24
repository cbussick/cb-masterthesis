import { useCBExerciseSequence } from "@/components/CBExerciseSequence/useCBExerciseSequenceProvider";
import { CBImage } from "@/components/CBImage/CBImage";
import { CBAnswer } from "@/data/exercises/CBAnswer";
import { playCorrectSound } from "@/helpers/sounds/playCorrectSound";
import { playIncorrectSound } from "@/helpers/sounds/playIncorrectSound";
import { Box, ButtonProps, Container, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useCallback, useEffect, useState } from "react";
import { CBQuizAnswerButton } from "./CBQuizAnswerButton/CBQuizAnswerButton";
import { CBQuizProps } from "./CBQuizInterfaces";

export const CBQuiz = ({
  exercise,
  onMistake,
  onCompleteExercise,
}: CBQuizProps): JSX.Element => {
  const {
    isCurrentExerciseFinished,
    setCurrentExerciseFinished,
    setExercises,
  } = useCBExerciseSequence();

  const [chosenAnswer, setChosenAnswer] = useState<string>("");
  const [randomizedAnswers, setRandomizedAnswers] = useState<CBAnswer[]>([]);

  useEffect(() => {
    setRandomizedAnswers([...exercise.answers].sort(() => Math.random() - 0.5));
  }, [exercise.answers]);

  const confirmAnswer = useCallback(
    (buttonAnswerId: string) => {
      setChosenAnswer(buttonAnswerId);

      setCurrentExerciseFinished(true);

      const isCorrect = exercise.correctAnswer === buttonAnswerId;

      if (isCorrect) {
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
          onMistake(exercise);
        }

        playIncorrectSound();
      }
    },
    [
      exercise,
      onCompleteExercise,
      onMistake,
      setCurrentExerciseFinished,
      setExercises,
    ],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isCurrentExerciseFinished) {
        const { key } = event;
        if (key === "A" || key === "a") {
          const buttonId = randomizedAnswers[0].id;
          confirmAnswer(buttonId);
        } else if (key === "B" || key === "b") {
          const buttonId = randomizedAnswers[1].id;
          confirmAnswer(buttonId);
        } else if (key === "C" || key === "c") {
          const buttonId = randomizedAnswers[2].id;
          confirmAnswer(buttonId);
        } else if (key === "D" || key === "d") {
          const buttonId = randomizedAnswers[3].id;
          confirmAnswer(buttonId);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [confirmAnswer, isCurrentExerciseFinished, randomizedAnswers]);

  const onConfirm: ButtonProps["onClick"] = (e) => {
    const buttonAnswerId = e.currentTarget.id;
    confirmAnswer(buttonAnswerId);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container disableGutters>
        <Stack
          spacing={4}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {exercise.image && (
            <CBImage
              image={exercise.image}
              boxProps={{ sx: { height: 200 } }}
            />
          )}

          <Grid
            container
            spacing={2}
            sx={{
              width: "100%",
            }}
          >
            {randomizedAnswers.map((answer, index) => (
              // Don't use the id of the answer as key alone, because it might cause visual glitches
              // when the next question is loaded and the answers are shuffled.
              <Grid xs={12} lg={6} key={`${answer.id}-${answer.text}`}>
                <CBQuizAnswerButton
                  answer={answer}
                  isCorrect={exercise.correctAnswer === answer.id}
                  onClick={onConfirm}
                  isCurrentExerciseFinished={isCurrentExerciseFinished}
                  clickedButton={chosenAnswer}
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
