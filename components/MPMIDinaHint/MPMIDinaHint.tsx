"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { MPMIDialog } from "../MPMIDialog/MPMIDialog";
import { MPMIEmoji } from "../MPMIEmoji/MPMIEmoji";
import { MPMIDinaHintProps } from "./MPMIDinaHintInterfaces";

export const MPMIDinaHint = ({
  hint,
  disabled,
}: MPMIDinaHintProps): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} disabled={disabled}>
        <MPMIEmoji emoji="💡" fontSize="18px" />
      </Button>

      <MPMIDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        fullWidth={false}
        dialogContentProps={{ sx: { py: 0 } }}
      >
        <Stack alignItems="center" spacing={2}>
          <Box position="relative" width={100} height={125}>
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
      </MPMIDialog>
    </>
  );
};
