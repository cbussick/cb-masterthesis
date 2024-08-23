"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import { CBImage } from "../CBImage/CBImage";
import { CBContentErrorMessageProps } from "./CBContentErrorMessageInterfaces";

export const CBContentErrorMessage = ({
  message,
}: CBContentErrorMessageProps): JSX.Element => {
  return (
    <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
      <Container maxWidth="md">
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <CBImage
            image={{ src: "/logo/dina-bold-stroke.svg", alt: "DiNA" }}
            boxProps={{
              sx: {
                width: 100,
                height: 125,
              },
            }}
          />

          <Typography>{message}</Typography>
        </Stack>
      </Container>
    </Box>
  );
};
