import { Card, Stack, Typography } from "@mui/material";
import { CBImage } from "../CBImage/CBImage";
import { CBProgressBar } from "../CBProgressBar/CBProgressBar";
import { CBProgressCardProps } from "./CBProgressCardInterfaces";

const contentPadding = 4;

export const CBProgressCard = ({
  title,
  subTitle,
  image,
  progressValue,
  maxValue,
  format,
}: CBProgressCardProps): JSX.Element => {
  return (
    <Card
      sx={{
        height: 150,
      }}
    >
      <Stack
        direction="row"
        spacing={contentPadding}
        sx={{
          alignItems: "center",
          height: "100%",
        }}
      >
        <CBImage
          image={image}
          boxProps={{
            sx: {
              width: 150,
              height: "100%",
              flexShrink: 0,
            },
          }}
          imageProps={{ style: { objectFit: "cover" } }}
        />

        <Stack
          sx={{
            flexGrow: 1,
            py: contentPadding,
            pr: contentPadding,
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
            format={format}
          />
        </Stack>
      </Stack>
    </Card>
  );
};
