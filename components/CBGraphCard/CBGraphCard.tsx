import { Card, Stack, Typography } from "@mui/material";
import { CBImage } from "../CBImage/CBImage";
import { CBGraphCardProps } from "./CBGraphCardInterfaces";

export const CBGraphCard = ({
  image,
  title,
  subTitle,
  graph,
}: CBGraphCardProps): JSX.Element => {
  return (
    <Card
      sx={{
        display: "flex",
        height: 150,
      }}
    >
      <Stack
        direction="row"
        spacing={4}
        sx={{
          alignItems: "center",
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
          imageProps={{
            style: {
              objectFit: "cover",
            },
          }}
        />

        <Stack
          direction="row"
          sx={{
            height: "100%",
            alignItems: "center",
          }}
        >
          <Stack spacing={0.7}>
            <Typography variant="h3">{title}</Typography>

            <Typography variant="body2">{subTitle}</Typography>
          </Stack>

          {graph}
        </Stack>
      </Stack>
    </Card>
  );
};
