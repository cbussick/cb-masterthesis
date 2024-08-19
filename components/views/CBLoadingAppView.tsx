"use client";

import { CBLogo } from "@/components/CBLogo/CBLogo";
import { CircularProgress, Container, Stack } from "@mui/material";
import { motion } from "framer-motion";

export const CBLoadingView = (): JSX.Element => {
  return (
    <Stack
      spacing={5}
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: (t) => t.palette.background.default,
      }}
    >
      <Container maxWidth="md">
        <motion.div
          animate={{
            scale: [1, 1.025, 1],
          }}
          transition={{
            duration: 2,
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
        >
          <CBLogo style={{ width: "100%" }} />

          <Stack sx={{ alignItems: "center" }}>
            <CircularProgress size={80} />
          </Stack>
        </motion.div>
      </Container>
    </Stack>
  );
};
