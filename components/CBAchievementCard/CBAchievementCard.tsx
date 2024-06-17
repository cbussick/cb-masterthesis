import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { CBProgressBar } from "../CBProgressBar/CBProgressBar";
import { CBAchievementCardProps } from "./CBAchievementCardInterfaces";

export const CBAchievementCard = ({
  title,
  subTitle,
  image,
  alt,
  progressValue,
  progressGoal,
}: CBAchievementCardProps): JSX.Element => {
  const isCompleted = progressValue >= progressGoal;

  return (
    <Card
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        bgcolor: (t) =>
          isCompleted ? t.palette.background.default : t.palette.grey[200],
        opacity: isCompleted ? 1 : 0.6,
        pointerEvents: isCompleted ? "none" : "auto",
      }}
    >
      <Box sx={{ position: "relative", width: "30%", height: 150 }}>
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

            <Typography
              variant="body2"
              sx={{
                mt: 0.7,
              }}
            >
              {subTitle}
            </Typography>
          </Stack>

          <CBProgressBar
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
