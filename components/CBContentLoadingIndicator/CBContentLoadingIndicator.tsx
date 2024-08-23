"use client";

import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { CBImage } from "../CBImage/CBImage";

export const CBContentLoadingIndicator = (): JSX.Element => {
  return (
    <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
      <Container maxWidth="md">
        <Stack
          spacing={2}
          sx={{ alignItems: "center" }}
          component={motion.div}
          animate={{
            scale: [1, 1.025, 1],
          }}
          transition={{
            duration: 2,
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
        >
          <CBImage
            image={{ src: "/logo/dina-bold-stroke.svg", alt: "DiNA" }}
            boxProps={{
              sx: {
                width: 100,
                height: 125,
              },
            }}
          />

          <Typography>Deine Inhalte werden geladen...</Typography>

          <CircularProgress size={80} />
        </Stack>
      </Container>
    </Box>
  );
};
