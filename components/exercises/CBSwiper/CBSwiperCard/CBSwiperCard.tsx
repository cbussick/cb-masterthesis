"use client";

import { CBImage } from "@/components/CBImage/CBImage";
import { CBExerciseDifficulty } from "@/data/exercises/CBExerciseDifficulty";
import { useDraggable } from "@dnd-kit/core";
import { Card, Stack, Typography } from "@mui/material";
import { CBSwiperCardProps } from "./CBSwiperCardInterfaces";

export const CBSwiperCard = ({
  difficulty,
  name,
  image,
  isExerciseFinished,
}: CBSwiperCardProps): JSX.Element => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: name,
      disabled: isExerciseFinished,
    });

  return (
    <Card
      sx={{
        width: "75%",
        height: "100%",
        p: 2,
        zIndex: 1,
        // eslint-disable-next-line no-nested-ternary
        cursor: isDragging
          ? "grabbing"
          : isExerciseFinished
            ? undefined
            : "grab",
        transition: isDragging ? undefined : "transform 0.25s ease",
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : "0px",
      }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
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
            <Typography variant="h3">{name}</Typography>
          ))}

        {image && (
          <CBImage
            image={image}
            boxProps={{
              sx: {
                height: 0,
                flexGrow: 1,
              },
            }}
            imageElementProps={{ draggable: false }}
          />
        )}
      </Stack>
    </Card>
  );
};
