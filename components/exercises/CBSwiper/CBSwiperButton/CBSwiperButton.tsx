"use client";

import { CBAnswerButton } from "@/components/CBAnswerButton/CBAnswerButton";
import { CBEmoji } from "@/components/CBEmoji/CBEmoji";
import { swiperCellTypes } from "@/data/exercises/CBSwiperExercise";
import { useDroppable } from "@dnd-kit/core";
import { Box, Stack, Typography } from "@mui/material";
import { CBSwiperButtonProps } from "./CBSwiperButtonInterfaces";

const iconFontSize = "40px";

export const CBSwiperButton = ({
  cellType,
  isCorrect,
  onClick,
  isCurrentExerciseFinished,
  clickedButton,
}: CBSwiperButtonProps): JSX.Element => {
  const cellTypeData = swiperCellTypes[cellType];

  const { isOver, setNodeRef } = useDroppable({
    id: cellType,
  });

  return (
    <Box ref={setNodeRef} sx={{ width: "75%", height: "100%" }}>
      <CBAnswerButton
        id={cellType}
        isCorrect={isCorrect}
        onClick={onClick}
        isCurrentExerciseFinished={isCurrentExerciseFinished}
        clickedButton={clickedButton}
        sx={{
          width: "100%",
          height: "100%",
          p: 0,
          transition: "0.25s",
          opacity: isOver ? "0.5" : undefined,
          boxShadow: (t) => (isOver ? t.shadows[4] : undefined),
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "4px dashed",
            borderRadius: 5,
            borderColor: (t) =>
              isOver ? t.palette.primary.main : "transparent",
            transition: "border-color 0.3s",
          }}
        >
          <Stack spacing={1} sx={{ alignItems: "center" }}>
            {cellTypeData.icons.length > 1 ? (
              <Stack direction="row" spacing={1}>
                {cellTypeData.icons.map((icon) => {
                  return (
                    <CBEmoji emoji={icon} fontSize={iconFontSize} key={icon} />
                  );
                })}
              </Stack>
            ) : (
              <CBEmoji emoji={cellTypeData.icons[0]} fontSize={iconFontSize} />
            )}

            <Typography>{cellTypeData.name}</Typography>
          </Stack>
        </Box>
      </CBAnswerButton>
    </Box>
  );
};
