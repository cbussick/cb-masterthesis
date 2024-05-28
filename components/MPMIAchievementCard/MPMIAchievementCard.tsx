"use client";

import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { MPMIProgressBar } from "../MPMIProgressBar/MPMIProgressBar";
import { MPMIAchievementCardProps } from "./MPMIAchievementCardInterfaces";

export const MPMIAchievementCard = ({
  title,
  subTitle,
  image,
  alt,
  progressValue,
  progressGoal,
}: MPMIAchievementCardProps): JSX.Element => {
  const isCompleted = progressValue >= progressGoal;
  const theme = useTheme();
  return (
    <Card
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        bgcolor: isCompleted ? "white" : theme.palette.grey[200],
        borderRadius: 3,
        opacity: isCompleted ? 1 : 0.6,
        pointerEvents: isCompleted ? "none" : "auto",
      }}
    >
      <Box position="relative" width="30%" height={150}>
        <Image
          src={image}
          alt={alt || ""}
          fill
          style={{ objectFit: "cover" }}
        />
      </Box>

      <CardContent sx={{ width: "70%" }}>
        <Stack spacing={1}>
          <Stack>
            <Typography variant="h5">{title}</Typography>

            <Typography variant="body2" marginTop={0.7}>
              {subTitle}
            </Typography>
          </Stack>

          <MPMIProgressBar
            currentValue={isCompleted ? progressGoal : progressValue}
            maxValue={progressGoal}
            width="100%"
            height="small"
            color="primary"
          />
        </Stack>
      </CardContent>
    </Card>
  );
};
