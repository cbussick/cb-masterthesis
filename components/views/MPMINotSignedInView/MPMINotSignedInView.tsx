"use client";

import { MPMIDialog } from "@/components/MPMIDialog/MPMIDialog";
import { MPMIEmoji } from "@/components/MPMIEmoji/MPMIEmoji";
import { MPMILogo } from "@/components/MPMILogo/MPMILogo";
import { MPMISignInForm } from "@/components/MPMISignInForm/MPMISignInForm";
import { MPMISignUpForm } from "@/components/MPMISignUpForm/MPMISignUpForm";
import { MPMISnackbar } from "@/components/MPMISnackbar/MPMISnackbar";
import { useSnackbar } from "@/ui/useSnackbar";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";

export const MPMINotSignedInView = (): JSX.Element => {
  const { isOpen, setOpen, title, message, severity } = useSnackbar();

  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <>
      <Stack
        display={{ xs: "none", sm: "flex" }}
        alignItems="center"
        justifyItems="center"
      >
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <Grid xs={3} width="100%">
            <Box
              bgcolor={(t) => t.palette.background.default}
              boxShadow={(t) => t.shadows[8]}
              borderRadius={5}
              padding={5}
            >
              <Container maxWidth="md">
                <Stack spacing={10} justifyContent="center" alignItems="center">
                  <MPMILogo style={{ width: "100%" }} />

                  <Stack spacing={3} alignItems="center">
                    <Stack direction="row" spacing={1}>
                      <Typography variant="h1">Willkommen!</Typography>

                      <MPMIEmoji emoji="👋🏻" typographyVariant="h1" />
                    </Stack>

                    <Typography>
                      Um DiNAs Lab nutzen zu können, musst du dich einloggen.
                    </Typography>

                    <MPMISignInForm />

                    <Stack direction="row" alignItems="center">
                      <Typography>Du hast noch keinen Account?</Typography>

                      <Button
                        variant="text"
                        onClick={() => setDialogOpen(true)}
                      >
                        <Typography>Neuen Account anlegen</Typography>
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              </Container>
            </Box>
          </Grid>
        </Grid>
      </Stack>

      <MPMISnackbar
        isOpen={isOpen}
        severity={severity}
        onClose={() => {
          setOpen(false);
        }}
        title={title}
        message={message}
      />

      <MPMIDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        title={
          <Stack direction="row" spacing={1}>
            <Typography variant="h2">Neuen Account anlegen</Typography>

            <MPMIEmoji emoji="🚀" typographyVariant="h2" />
          </Stack>
        }
      >
        <MPMISignUpForm />
      </MPMIDialog>
    </>
  );
};
