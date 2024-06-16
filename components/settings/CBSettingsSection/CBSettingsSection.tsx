import { Box, Container, Stack, Typography } from "@mui/material";
import { CBSettingsSectionProps } from "./CBSettingsSectionInterfaces";

export const CBSettingsSection = ({
  title,
  children,
}: CBSettingsSectionProps): JSX.Element => {
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
