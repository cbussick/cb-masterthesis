"use client";

import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

export const MPMINotificationSettings = (): JSX.Element => {
  return (
    <Stack>
      <Typography variant="body2" mb={2}>
        Erhalte E-Mails, um nichts zu verpassen. Du kannst die Benachrichtungen
        jederzeit ausschalten.
      </Typography>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 3 }}>
        <Grid xs={6}>
          <Stack>
            <Typography variant="h4">E-Mails von uns</Typography>

            <Typography variant="body2">
              Erhalte von uns die neuesten Nachrichten und Updates.
            </Typography>
          </Stack>
        </Grid>

        <Grid xs={6} pl={6}>
          <FormGroup>
            <FormControlLabel
              componentsProps={{ typography: { variant: "h4" } }}
              control={<Checkbox defaultChecked />}
              label="Neuigkeiten und Updates"
            />

            <Typography variant="body2">
              Neuigkeiten zu neuen Funktionen
            </Typography>

            <FormControlLabel
              componentsProps={{ typography: { variant: "h4" } }}
              control={<Checkbox />}
              label="Nutzerforschung"
            />

            <Typography variant="body2">
              Neuigkeiten zu neuen Funktionen
            </Typography>
          </FormGroup>
        </Grid>

        <Grid xs={12} pt={2} pb={2}>
          <Divider />
        </Grid>

        <Grid xs={6}>
          <Stack>
            <Typography variant="h4">E-Mails von der Lehrkraft</Typography>

            <Typography variant="body2">
              Erhalte E-Mails wenn deine Lehrkraft neue Aufgaben hochlädt oder
              Termine für Klausuren veröffentlicht.
            </Typography>
          </Stack>
        </Grid>

        <Grid xs={6} pl={6}>
          <FormGroup>
            <FormControlLabel
              componentsProps={{ typography: { variant: "h4" } }}
              control={<Checkbox defaultChecked />}
              label="Neue Aufgaben"
            />

            <Typography variant="body2">
              Es wurden neue Aufgaben zur freien Übung hinzugefügt.
            </Typography>

            <FormControlLabel
              componentsProps={{ typography: { variant: "h4" } }}
              control={<Checkbox defaultChecked />}
              label="Klausurtermine"
            />

            <Typography variant="body2">
              Im Kalender können die Termine jederzeit eingesehen werden.
            </Typography>
          </FormGroup>
        </Grid>

        <Grid xs={12} pt={2} pb={2}>
          <Divider />
        </Grid>

        <Grid xs={6}>
          <Stack>
            <Typography variant="h4">Erinnerungen</Typography>

            <Typography variant="body2">
              Erhalte E-Mails die dich an das Lernen sowie Klausurtermine
              erinnern.
            </Typography>
          </Stack>
        </Grid>

        <Grid xs={6} pl={6}>
          <RadioGroup defaultValue="day">
            <FormControlLabel
              componentsProps={{ typography: { variant: "h4" } }}
              value="day"
              control={<Radio />}
              label="Täglich"
            />

            <FormControlLabel
              componentsProps={{ typography: { variant: "h4" } }}
              value="week"
              control={<Radio />}
              label="Wöchentlich"
            />

            <FormControlLabel
              componentsProps={{ typography: { variant: "h4" } }}
              value="month"
              control={<Radio />}
              label="Monatlich"
            />

            <FormControlLabel
              componentsProps={{ typography: { variant: "h4" } }}
              value="never"
              control={<Radio />}
              label="Nie"
            />
          </RadioGroup>
        </Grid>
      </Grid>
    </Stack>
  );
};
