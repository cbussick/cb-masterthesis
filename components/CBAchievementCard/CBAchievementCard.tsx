import { Card, CardContent, Stack, Typography } from "@mui/material";
import { CBImage } from "../CBImage/CBImage";
import { CBProgressBar } from "../CBProgressBar/CBProgressBar";
import { CBAchievementCardProps } from "./CBAchievementCardInterfaces";

export const CBAchievementCard = ({
  title,
  subTitle,
  image,
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
      }}
    >
      <CBImage
        image={image}
        boxProps={{ sx: { width: "30%", height: 150 } }}
        imageProps={{
          style: {
            objectFit: "cover",
          },
        }}
      />

      <CardContent sx={{ width: "70%" }}>
        <Stack spacing={1}>
          <Stack>
            <Typography variant="h5">{title}</Typography>

            <Typography variant="body2">{subTitle}</Typography>
          </Stack>

          <CBProgressBar
            currentValue={isCompleted ? progressGoal : progressValue}
            maxValue={progressGoal}
            width="100%"
            height="small"
          />
        </Stack>
      </CardContent>
    </Card>
  );
};
