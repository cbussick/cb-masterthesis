"use client";

import { Box, Card, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import { MPMIExerciseSequenceEndCardProps } from "./MPMIExerciseSequenceEndCardInterfaces";

export const MPMIExerciseSequenceEndCard = ({
  image,
  alt,
  text,
}: MPMIExerciseSequenceEndCardProps): JSX.Element => {
  return (
    <Card
      sx={{
        height: 100,
        borderRadius: 3,
        display: "flex",
      }}
    >
      <Stack direction="row" flex="1" spacing={4}>
        <Box
          position="relative"
          width={150}
          component={motion.div}
          alignItems="center"
        >
          <Image
            src={image}
            alt={alt || ""}
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>

        <Typography variant="h3" pr={4} display="flex" alignItems="center">
          {text}
        </Typography>
      </Stack>
    </Card>
  );
};
