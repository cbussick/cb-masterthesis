"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { CBDialog } from "../CBDialog/CBDialog";
import { CBEmoji } from "../CBEmoji/CBEmoji";
import { CBDinaHintProps } from "./CBDinaHintInterfaces";

export const CBDinaHint = ({
  hint,
  disabled,
}: CBDinaHintProps): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} disabled={disabled}>
        <CBEmoji emoji="💡" fontSize="18px" />
      </Button>

      <CBDialog
        isOpen={open}
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

          <Typography>
            {hint.split("\n").map((str, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <p key={index}>{str}</p>
            ))}
          </Typography>

          <Button onClick={() => setOpen(false)}>Ok</Button>
        </Stack>
      </CBDialog>
    </>
  );
};
