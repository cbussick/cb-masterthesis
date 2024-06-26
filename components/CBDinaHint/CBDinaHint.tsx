"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { CBDialog } from "../CBDialog/CBDialog";
import { CBEmoji } from "../CBEmoji/CBEmoji";
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
          <Box
            sx={{
              position: "relative",
              width: 100,
              height: 125,
            }}
          >
            <Image src="/logo/dina-bold-stroke.svg" alt="DiNA" fill />
          </Box>

          <Typography>{hint}</Typography>

          <Button onClick={() => setOpen(false)}>Ok</Button>
        </Stack>
      </CBDialog>
    </>
  );
};
