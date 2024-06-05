"use client";

import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { MPMIExamSimulatorTopCardProps } from "./MPMIExamSimulatorTopCardInterfaces";

export const MPMIExamSimulatorTopCard = ({
  img,
  title,
  subTitle,
}: MPMIExamSimulatorTopCardProps): JSX.Element => {
  return (
    <Card sx={{ display: "flex", borderRadius: 3, height: 100, width: "100%" }}>
      <Stack direction="row">
        <Box position="relative" width={150}>
          <Image
            src={img.src}
            alt={img.alt}
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>

        <CardContent>
          <Typography variant="h3">{title}</Typography>

          <Typography>{subTitle}</Typography>
        </CardContent>
      </Stack>
    </Card>
  );
};
