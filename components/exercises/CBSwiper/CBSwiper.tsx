"use client";

import { useCBExerciseSequence } from "@/components/CBExerciseSequence/useCBExerciseSequenceProvider";
import { CBImage } from "@/components/CBImage/CBImage";
import { CBExerciseDifficulty } from "@/data/exercises/CBExerciseDifficulty";
import { CBSwiperCellType } from "@/data/exercises/CBSwiperExercise";
import { playCorrectSound } from "@/helpers/sounds/playCorrectSound";
import { playIncorrectSound } from "@/helpers/sounds/playIncorrectSound";
import { ButtonProps, Card, Stack, Typography } from "@mui/material";
import Grid, { Grid2Props } from "@mui/material/Unstable_Grid2";
import { DraggableProps, motion } from "framer-motion";
import { useRef, useState } from "react";
import { CBSwiperButton } from "./CBSwiperButton/CBSwiperButton";
import { CBSwiperButtonProps } from "./CBSwiperButton/CBSwiperButtonInterfaces";
import { CBSwiperProps } from "./CBSwiperInterfaces";

const commonGridProps: Grid2Props = {
  xs: 4,
  display: "flex",
  alignItems: "center",
};

export const CBSwiper = ({
  exercise,
  onMistake,
  onCompleteExercise,
  difficulty,
}: CBSwiperProps): JSX.Element => {
  const {
    isCurrentExerciseFinished,
    setCurrentExerciseFinished,
    setExercises,
  } = useCBExerciseSequence();

  const [clickedButton, setClickedButton] = useState<string>("");
  const [dropTarget, setDropTarget] = useState<string>("");
  const [isDragging, setDragging] = useState<boolean>(false);

  const constraintsRef = useRef<HTMLDivElement>(null);

  const onConfirm = (buttonAnswerId: string) => {
    setClickedButton(buttonAnswerId);
    setCurrentExerciseFinished(true);

    const isCorrect = exercise.belongsTo === buttonAnswerId;

    if (isCorrect) {
      onCompleteExercise({ exerciseId: exercise.id, isCorrect });
      onCompleteExercise(exercise.id);

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

  const onClick: ButtonProps["onClick"] = (e) => {
    const castEventTarget = e.currentTarget as HTMLButtonElement;
    const buttonAnswerId = castEventTarget.id;

    onConfirm(buttonAnswerId);
  };

  const onDragEnd: DraggableProps["onDragEnd"] = () => {
    setDragging(false);
    if (dropTarget) {
      onConfirm(dropTarget);
    }
  };

  const commonButtonProps: Pick<
    CBSwiperButtonProps,
    "onClick" | "isCurrentExerciseFinished" | "clickedButton" | "onMouseLeave"
  > = {
    onClick,
    isCurrentExerciseFinished,
    clickedButton,
    onMouseLeave: () => setDropTarget(""),
  };

  return (
    // `p={0.5}` is necessary to not have the boxshadow of the cards cut off
    <Stack
      sx={{
        p: 0.5,
        overflow: "hidden",
        cursor: isDragging ? "grabbing" : "auto",
      }}
    >
      <Grid container ref={constraintsRef}>
        <Grid {...commonGridProps}>
          <CBSwiperButton
            cellType={CBSwiperCellType.Plant}
            isCorrect={exercise.belongsTo === CBSwiperCellType.Plant}
            onMouseEnter={() => setDropTarget(CBSwiperCellType.Plant)}
            {...commonButtonProps}
          />
        </Grid>

        <Grid
          {...commonGridProps}
          sx={{
            justifyContent: "center",
          }}
        >
          <Card
            sx={{
              width: "80%",
              height: "100%",
              p: 2,
              zIndex: 1,
              pointerEvents: isDragging ? "none" : "auto",
              cursor: isDragging ? "grabbing" : "grab",
            }}
            component={motion.div}
            drag={!isCurrentExerciseFinished}
            dragSnapToOrigin
            dragConstraints={constraintsRef}
            // Can not be 0, otherwise the snapping to origin is not animated and the card jumps back instantly
            dragElastic={{}}
            onDragStart={() => setDragging(true)}
            onDragEnd={onDragEnd}
          >
            <Stack
              spacing={1}
              sx={{
                width: "100%",
                height: "100%",
                alignItems: "center",
              }}
            >
              {difficulty === CBExerciseDifficulty.Medium ||
                (difficulty === CBExerciseDifficulty.Easy && (
                  <Typography variant="h3">{exercise.name}</Typography>
                ))}

              {exercise.image && (
                <CBImage
                  image={exercise.image}
                  boxProps={{
                    flexGrow: 1,
                    height: undefined,
                  }}
                  draggable={false}
                />
              )}
            </Stack>
          </Card>
        </Grid>

        <Grid
          {...commonGridProps}
          sx={{
            justifyContent: "flex-end",
          }}
        >
          <CBSwiperButton
            cellType={CBSwiperCellType.Animal}
            isCorrect={exercise.belongsTo === CBSwiperCellType.Animal}
            onMouseEnter={() => setDropTarget(CBSwiperCellType.Animal)}
            {...commonButtonProps}
          />
        </Grid>

        <Grid
          container
          xs={12}
          sx={{
            justifyContent: "center",
            mt: 3,
          }}
        >
          <Grid
            {...commonGridProps}
            sx={{
              justifyContent: "center",
            }}
          >
            <CBSwiperButton
              cellType={CBSwiperCellType.Both}
              isCorrect={exercise.belongsTo === CBSwiperCellType.Both}
              onMouseEnter={() => setDropTarget(CBSwiperCellType.Both)}
              {...commonButtonProps}
            />
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};
