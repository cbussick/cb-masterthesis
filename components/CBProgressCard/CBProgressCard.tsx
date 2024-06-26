import { Card, Stack, Typography } from "@mui/material";
import { CBImage } from "../CBImage/CBImage";
import { CBProgressBar } from "../CBProgressBar/CBProgressBar";
import { CBProgressCardProps } from "./CBProgressCardInterfaces";

export const CBProgressCard = ({
  title,
  subTitle,
  image,
  progressValue,
  maxValue,
}: CBProgressCardProps): JSX.Element => {
  return (
    <Card
      sx={{
        height: 150,
      }}
    >
      <Stack
        direction="row"
        spacing={4}
        sx={{
          alignItems: "center",
          height: "100%",
          pr: 4,
        }}
      >
        <CBImage
          image={image}
          boxProps={{
            sx: {
              width: 150,
              height: "100%",
            },
          }}
          imageProps={{ style: { objectFit: "cover" } }}
        />

        <Stack
          sx={{
            flexGrow: 1,
          }}
        >
          <Stack spacing={0.7}>
            <Typography variant="h3">{title}</Typography>

            <Typography variant="body2">{subTitle}</Typography>
          </Stack>

          <CBProgressBar
            currentValue={progressValue}
            maxValue={maxValue}
            height="small"
            width="100%"
            format="percent"
          />
        </Stack>
      </Stack>
    </Card>
  );
};
