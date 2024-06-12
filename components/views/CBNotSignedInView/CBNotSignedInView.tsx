"use client";

import { CBDialog } from "@/components/CBDialog/CBDialog";
import { CBEmoji } from "@/components/CBEmoji/CBEmoji";
import { CBLogo } from "@/components/CBLogo/CBLogo";
import { CBSignInForm } from "@/components/CBSignInForm/CBSignInForm";
import { CBSignUpForm } from "@/components/CBSignUpForm/CBSignUpForm";
import { CBSnackbar } from "@/components/CBSnackbar/CBSnackbar";
import { useSnackbar } from "@/ui/useSnackbar";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";

export const CBNotSignedInView = (): JSX.Element => {
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
              p={5}
            >
              <Container maxWidth="md">
                <Stack spacing={10} justifyContent="center" alignItems="center">
                  <CBLogo style={{ width: "100%" }} />

                  <Stack spacing={3} alignItems="center">
                    <Stack direction="row" spacing={1}>
                      <Typography variant="h1">Willkommen!</Typography>

                      <CBEmoji emoji="👋🏻" typographyVariant="h1" />
                    </Stack>

                    <Typography>
                      Um DiNAs Lab nutzen zu können, musst du dich einloggen.
                    </Typography>

                    <CBSignInForm />

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

      <CBSnackbar
        isOpen={isOpen}
        severity={severity}
        onClose={() => {
          setOpen(false);
        }}
        title={title}
        message={message}
      />

      <CBDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        title={
          <Stack direction="row" spacing={1}>
            <Typography variant="h2">Neuen Account anlegen</Typography>

            <CBEmoji emoji="🚀" typographyVariant="h2" />
          </Stack>
        }
      >
        <CBSignUpForm />
      </CBDialog>
    </>
  );
};
