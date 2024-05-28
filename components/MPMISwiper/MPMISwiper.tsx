"use client";

import { MPMIExerciseDifficulty } from "@/data/exercises/MPMIExerciseDifficulty";
import { MPMISwiperCellType } from "@/data/exercises/MPMISwiperExercise";
import { playCorrectSound } from "@/helpers/playCorrectSound";
import { playIncorrectSound } from "@/helpers/playIncorrectSound";
import { ButtonProps, Card, Stack, Typography } from "@mui/material";
import Grid, { Grid2Props } from "@mui/material/Unstable_Grid2";
import { DraggableProps, motion } from "framer-motion";
import { useRef, useState } from "react";
import { useMPMIExerciseSequence } from "../MPMIExerciseSequence/useMPMIExerciseSequenceProvider";
import { MPMIImage } from "../MPMIImage/MPMIImage";
import { MPMISwiperButton } from "../MPMISwiperButton/MPMISwiperButton";
import { MPMISwiperButtonProps } from "../MPMISwiperButton/MPMISwiperButtonInterfaces";
import { MPMISwiperProps } from "./MPMISwiperInterfaces";

const commonGridProps: Grid2Props = {
  xs: 4,
  display: "flex",
  alignItems: "center",
};

export const MPMISwiper = ({
  exercise,
  onMistake,
  onCompleteExercise,
  difficulty,
}: MPMISwiperProps): JSX.Element => {
  const {
    isCurrentExerciseFinished,
    setIsCurrentExerciseFinished,
    setExercises,
  } = useMPMIExerciseSequence();

  const [clickedButton, setClickedButton] = useState<string>("");
  const [dropTarget, setDropTarget] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const constraintsRef = useRef(null);

  const onConfirm = (buttonAnswerId: string) => {
    setClickedButton(buttonAnswerId);
    setIsCurrentExerciseFinished(true);

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
    setIsDragging(false);
    if (dropTarget) {
      onConfirm(dropTarget);
    }
  };

  const commonButtonProps: Pick<
    MPMISwiperButtonProps,
    "onClick" | "isCurrentExerciseFinished" | "clickedButton" | "onMouseLeave"
  > = {
    onClick,
    isCurrentExerciseFinished,
    clickedButton,
    onMouseLeave: () => setDropTarget(""),
  };

  return (
    // `pb={1}` is necessary to not have the boxshadow of the button at the bottom be cut off
    <Stack pb={1} overflow="hidden" ref={constraintsRef}>
      <Grid container>
        <Grid {...commonGridProps}>
          <MPMISwiperButton
            cellType={MPMISwiperCellType.Plant}
            isCorrect={exercise.belongsTo === MPMISwiperCellType.Plant}
            onMouseEnter={() => setDropTarget(MPMISwiperCellType.Plant)}
            {...commonButtonProps}
          />
        </Grid>

        <Grid {...commonGridProps} justifyContent="center">
          <Card
            sx={{
              width: "80%",
              height: "100%",
              p: 2,
              zIndex: 1,
              pointerEvents: isDragging ? "none" : "auto",
            }}
            component={motion.div}
            drag={!isCurrentExerciseFinished}
            dragMomentum={false}
            dragSnapToOrigin
            dragConstraints={constraintsRef}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={onDragEnd}
          >
            <Stack width="100%" height="100%" alignItems="center" spacing={1}>
              {difficulty === MPMIExerciseDifficulty.Medium ||
                (difficulty === MPMIExerciseDifficulty.Easy && (
                  <Typography variant="h3">{exercise.name}</Typography>
                ))}

              {exercise.image && (
                <MPMIImage
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

        <Grid {...commonGridProps} justifyContent="flex-end">
          <MPMISwiperButton
            cellType={MPMISwiperCellType.Animal}
            isCorrect={exercise.belongsTo === MPMISwiperCellType.Animal}
            onMouseEnter={() => setDropTarget(MPMISwiperCellType.Animal)}
            {...commonButtonProps}
          />
        </Grid>

        <Grid container xs={12} justifyContent="center" mt={3}>
          <Grid {...commonGridProps} justifyContent="center">
            <MPMISwiperButton
              cellType={MPMISwiperCellType.Both}
              isCorrect={exercise.belongsTo === MPMISwiperCellType.Both}
              onMouseEnter={() => setDropTarget(MPMISwiperCellType.Both)}
              {...commonButtonProps}
            />
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};
