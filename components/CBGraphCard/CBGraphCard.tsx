import { Box, Card, Stack, Typography } from "@mui/material";
import Image from "next/image";
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
        <Box
          sx={{
            position: "relative",
            minWidth: 150,
            height: "100%",
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>

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
