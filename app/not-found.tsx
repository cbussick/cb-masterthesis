import { MPMILogo } from "@/components/MPMILogo/MPMILogo";
import ThemeRegistry from "@/theme/ThemeRegistry";
import { font } from "@/theme/font";
import {
  Button,
  Container,
  CssBaseline,
  Stack,
  Typography,
} from "@mui/material";

export default function NotFound() {
  return (
    <div className={font.className} style={{ width: "100%", height: "100vh" }}>
      <ThemeRegistry>
        <CssBaseline />

        <Container
          sx={{
            height: "100%",
          }}
          maxWidth="md"
        >
          <Stack
            height="100%"
            spacing={6}
            alignItems="center"
            justifyContent="center"
          >
            <MPMILogo style={{ width: "100%" }} />

            <Stack spacing={3} alignItems="center">
              <Typography variant="h1" align="center">
                Hier ist leider nichts 🤔
              </Typography>

              <Typography align="center">
                Irgendetwas ist hier schief gelaufen. Geh am besten zur Homepage
                zurück und versuch es erneut.
              </Typography>

              <Button href="/">Zur Homepage</Button>
            </Stack>
          </Stack>
        </Container>
      </ThemeRegistry>
    </div>
  );
}
