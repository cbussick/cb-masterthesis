"use client";

import { getOpenAITextToSpeech } from "@/helpers/openai/getOpenAITextToSpeech";
import { useSnackbar } from "@/ui/useSnackbar";
import { MicRounded } from "@mui/icons-material";
import { Alert, Button, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { CBDialog } from "../CBDialog/CBDialog";
import { CBEmoji } from "../CBEmoji/CBEmoji";
import { CBImage } from "../CBImage/CBImage";
import { CBLoadingButton } from "../CBLoadingButton/CBLoadingButton";
import { CBDinaHintProps } from "./CBDinaHintInterfaces";

export const CBDinaHint = ({
  onClick,
  hint,
  isLoading,
  disabled,
}: CBDinaHintProps): JSX.Element => {
  const { showSnackbar } = useSnackbar();

  const [isOpen, setOpen] = useState<boolean>(false);
  const [isFetchingSpeech, setFetchingSpeech] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement>();

  // Necessary, because the the callback for the promise to fetch the speech will always
  // have the value of `isOpen` stored from when it was created. A ref will always have the up-to-date value.
  // This way, the audio will not play if the dialog was closed while fetching the speech.
  const openStateRef = useRef(false);
  openStateRef.current = isOpen;

  const onClose = () => {
    setOpen(false);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  useEffect(() => {
    setAudio(undefined);
  }, [hint]);

  return (
    <>
      <CBLoadingButton
        onClick={() => {
          setOpen(true);
          if (!hint) {
            onClick();
          }
        }}
        disabled={disabled}
        isLoading={isLoading}
        variant="outlined"
        endIcon={<CBEmoji emoji="💡" />}
      >
        Tipp
      </CBLoadingButton>

      <CBDialog
        isOpen={hint !== "" && isOpen}
        onClose={onClose}
        fullWidth={false}
        dialogContentProps={{ sx: { py: 0 } }}
      >
        <Stack
          spacing={2}
          sx={{
            alignItems: "center",
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

          <Typography>{hint}</Typography>

          <Stack spacing={3} alignItems="center">
            <Stack direction="row" spacing={1}>
              <CBLoadingButton
                variant="outlined"
                isLoading={isFetchingSpeech}
                onClick={() => {
                  if (audio) {
                    audio.play();
                  } else {
                    setFetchingSpeech(true);
                    getOpenAITextToSpeech(hint)
                      .then((res) => {
                        setFetchingSpeech(false);

                        const speech = new Audio(res);
                        setAudio(speech);

                        if (openStateRef.current) {
                          speech.play();
                        }
                      })
                      .catch((err) => {
                        setFetchingSpeech(false);
                        showSnackbar("Fehler beim Vorlesen", err, "error");
                      });
                  }
                }}
                endIcon={<MicRounded />}
              >
                Tipp vorlesen
              </CBLoadingButton>

              <Button onClick={onClose}>Ok</Button>
            </Stack>

            <Alert severity="info">
              Die Stimme, die den Tipp vorliest, stammt nicht von einer echten
              Person. Sie wird durch künstliche Intelligenz erzeugt.
            </Alert>
          </Stack>
        </Stack>
      </CBDialog>
    </>
  );
};
