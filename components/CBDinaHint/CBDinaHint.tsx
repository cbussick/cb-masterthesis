"use client";

import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
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
  const [isOpen, setOpen] = useState<boolean>(false);

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
        onClose={() => setOpen(false)}
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

          <Button onClick={() => setOpen(false)}>Ok</Button>
        </Stack>
      </CBDialog>
    </>
  );
};
