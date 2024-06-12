"use client";

import { Box, Card, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { CBSimpleInfoCardProps } from "./CBSimpleInfoCardInterfaces";

export const CBSimpleInfoCard = ({
  title,
  subTitle,
  image,
  alt,
}: CBSimpleInfoCardProps): JSX.Element => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: 150,
        borderRadius: 3,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        width="100%"
        height="100%"
        spacing={4}
      >
        <Box position="relative" width={150} height="100%">
          <Image
            src={image}
            alt={alt || ""}
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>

        <Stack
          spacing={0.7}
          sx={{
            width: "70%",
          }}
        >
          <Typography variant="h3">{title}</Typography>

          <Typography variant="body2">{subTitle}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
};
