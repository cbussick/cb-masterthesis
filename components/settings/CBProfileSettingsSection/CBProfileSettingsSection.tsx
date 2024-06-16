"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import { CBProfileSettingsSectionProps } from "./CBProfileSettingsSectionInterfaces";

export const CBProfileSettingsSection = ({
  title,
  children,
}: CBProfileSettingsSectionProps): JSX.Element => {
  return (
    <Box>
      <Container maxWidth="md">
        <Stack spacing={3}>
          <Typography variant="h3">{title}</Typography>

          {children}
        </Stack>
      </Container>
    </Box>
  );
};
