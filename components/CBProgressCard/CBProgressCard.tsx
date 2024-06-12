"use client";

import { Box, Card, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { CBProgressBar } from "../CBProgressBar/CBProgressBar";
import { CBProgressCardProps } from "./CBProgressCardInterfaces";

export const CBProgressCard = ({
  title,
  subTitle,
  image,
  alt,
  progressValue,
  maxValue,
}: CBProgressCardProps): JSX.Element => {
  return (
    <Card
      sx={{
        height: 150,
        borderRadius: 3,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        height="100%"
        spacing={4}
        pr={4}
      >
        <Box position="relative" minWidth={150} height="100%">
          <Image
            src={image}
            alt={alt || ""}
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>

        <Stack flexGrow={1}>
          <Stack spacing={0.7}>
            <Typography variant="h3">{title}</Typography>

            <Typography variant="body2">{subTitle}</Typography>
          </Stack>

          <CBProgressBar
            currentValue={progressValue}
            maxValue={maxValue}
            height="small"
            color="primary"
            width="100%"
            format="percent"
          />
        </Stack>
      </Stack>
    </Card>
  );
};
