import { Box, Card, Stack, Typography } from "@mui/material";
import { CBImage } from "../CBImage/CBImage";
import { CBGraphCardProps } from "./CBGraphCardInterfaces";

const contentPadding = 4;

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
        spacing={contentPadding}
        sx={{
          alignItems: "center",
          flex: 1,
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
          imageProps={{
            style: {
              objectFit: "cover",
            },
          }}
        />

        <Stack
          direction="row"
          spacing={4}
          sx={{
            height: "100%",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Stack spacing={0.7}>
            <Typography variant="h3">{title}</Typography>

            <Typography variant="body2">{subTitle}</Typography>
          </Stack>

          <Box
            sx={{
              height: "100%",
              flex: 1,
              py: contentPadding,
              pr: contentPadding,
            }}
          >
            {graph}
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
};
