"use client";

import { Box, Card, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { CBGraphCardProps } from "./CBGraphCardInterfaces";

export const CBGraphCard = ({
  image,
  title,
  subTitle,
  graph,
  alt,
}: CBGraphCardProps): JSX.Element => {
  return (
    <Card
      sx={{
        display: "flex",
        height: 150,
        borderRadius: 3,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={4}>
        <Box position="relative" minWidth={150} height="100%">
          <Image
            src={image}
            alt={alt || ""}
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>

        <Stack direction="row" alignItems="center" height="100%">
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
