"use client";

import { CancelRounded, CheckCircleRounded } from "@mui/icons-material";
import {
  Card,
  CardMedia,
  Stack,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { CBExamSimulatorEndScreenTaskCardProps } from "./CBExamSimulatorEndScreenTaskCardInterfaces";

const commonIconStyles: SxProps<Theme> = {
  fontSize: 64,
  margin: "auto",
  display: "flex",
};

export const CBExamSimulatorEndScreenTaskCard = ({
  exerciseNumber,
  exercise,
  isCorrect,
}: CBExamSimulatorEndScreenTaskCardProps): JSX.Element => {
  return (
    <Card
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        height: 60,
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
      }}
    >
      <Stack direction="row" spacing={2}>
        <Typography
          sx={{
            color: (t) => t.palette.grey[500],
          }}
        >
          {exerciseNumber}
        </Typography>

        <Typography>{exercise}</Typography>
      </Stack>

      <CardMedia
        sx={{
          objectFit: "contain",
        }}
      >
        {isCorrect ? (
          <CheckCircleRounded
            sx={{
              ...commonIconStyles,
              color: (t) => t.palette.primary.main,
              fontSize: "32px",
            }}
          />
        ) : (
          <CancelRounded
            sx={{
              ...commonIconStyles,
              color: (t) => t.palette.error.main,
              fontSize: "32px",
            }}
          />
        )}
      </CardMedia>
    </Card>
  );
};
