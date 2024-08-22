"use client";

import { useCBExerciseSequence } from "@/components/CBExerciseSequence/useCBExerciseSequenceProvider";
import { CBSwiperCellType } from "@/data/exercises/CBSwiperExercise";
import { playCorrectSound } from "@/helpers/sounds/playCorrectSound";
import { playIncorrectSound } from "@/helpers/sounds/playIncorrectSound";
import { ClientRect, DndContext, DndContextProps } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { ButtonProps, Stack } from "@mui/material";
import Grid, { Grid2Props } from "@mui/material/Unstable_Grid2";
import { useRef, useState } from "react";
import { CBSwiperButton } from "./CBSwiperButton/CBSwiperButton";
import { CBSwiperButtonProps } from "./CBSwiperButton/CBSwiperButtonInterfaces";
import { CBSwiperCard } from "./CBSwiperCard/CBSwiperCard";
import { CBSwiperProps } from "./CBSwiperInterfaces";

const commonGridProps: Grid2Props = {
  xs: 4,
  display: "flex",
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

  const constraintsRef = useRef<HTMLDivElement>(null);

  const onConfirm = (buttonAnswerId: string) => {
    setClickedButton(buttonAnswerId);
    setCurrentExerciseFinished(true);

    const isCorrect = exercise.belongsTo === buttonAnswerId;

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
  };

  const onClick: ButtonProps["onClick"] = (e) => {
    const castEventTarget = e.currentTarget as HTMLButtonElement;
    const buttonAnswerId = castEventTarget.id;

    onConfirm(buttonAnswerId);
  };

  const commonButtonProps: Pick<
    CBSwiperButtonProps,
    "onClick" | "isCurrentExerciseFinished" | "clickedButton"
  > = {
    onClick,
    isCurrentExerciseFinished,
    clickedButton,
  };

  const onDragEnd: DndContextProps["onDragEnd"] = (event) => {
    const chosenCellType = event.over?.id;
    if (chosenCellType) {
      onConfirm(chosenCellType.toString());
    }
  };

  return (
    <DndContext
      onDragEnd={onDragEnd}
      modifiers={[
        (e) =>
          restrictToParentElement({
            ...e,
            containerNodeRect:
              constraintsRef?.current?.getBoundingClientRect() as ClientRect,
          }),
      ]}
    >
      <Stack
        sx={{
          // `p={1}` is necessary to not have the boxshadow of the cards cut off
          p: 1,
          minHeight: "100%",
        }}
      >
        <Grid container ref={constraintsRef} sx={{ flex: 1 }}>
          <Grid {...commonGridProps}>
            <CBSwiperButton
              cellType={CBSwiperCellType.Plant}
              isCorrect={exercise.belongsTo === CBSwiperCellType.Plant}
              {...commonButtonProps}
            />
          </Grid>

          <Grid {...commonGridProps} sx={{ justifyContent: "center" }}>
            <CBSwiperCard
              name={exercise.name}
              image={exercise.image}
              difficulty={difficulty}
              isExerciseFinished={isCurrentExerciseFinished}
            />
          </Grid>

          <Grid {...commonGridProps} sx={{ justifyContent: "flex-end" }}>
            <CBSwiperButton
              cellType={CBSwiperCellType.Animal}
              isCorrect={exercise.belongsTo === CBSwiperCellType.Animal}
              {...commonButtonProps}
            />
          </Grid>

          <Grid
            container
            xs={12}
            sx={{
              justifyContent: "center",
              mt: 9,
            }}
          >
            <Grid {...commonGridProps} sx={{ justifyContent: "center" }}>
              <CBSwiperButton
                cellType={CBSwiperCellType.Both}
                isCorrect={exercise.belongsTo === CBSwiperCellType.Both}
                {...commonButtonProps}
              />
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </DndContext>
  );
};
