"use client";

import { CBImage } from "@/components/CBImage/CBImage";
import { Button, Drawer, Stack, Typography } from "@mui/material";
import { CBGlossaryDrawerProps } from "./CBGlossaryDrawerInterfaces";

export const CBGlossaryDrawer = ({
  selectedEntry,
  handleCloseEntryDrawer,
}: CBGlossaryDrawerProps): JSX.Element => {
  return (
    <Drawer
      anchor="right"
      open={!!selectedEntry}
      onClose={handleCloseEntryDrawer}
      PaperProps={{
        sx: {
          width: "33.33%",
          borderTopLeftRadius: (t) => t.shape.borderRadius * 5,
          borderBottomLeftRadius: (t) => t.shape.borderRadius * 5,
        },
      }}
    >
      <Stack
        spacing={2}
        sx={{
          p: 4,
        }}
      >
        <Typography variant="h2">{selectedEntry?.term}</Typography>

        <Typography>{selectedEntry?.definition}</Typography>

        {selectedEntry?.image && (
          <CBImage
            image={{ src: selectedEntry.image, alt: selectedEntry.term }}
          />
        )}

        <Button
          onClick={handleCloseEntryDrawer}
          sx={{ right: 50, bottom: 50, position: "fixed" }}
        >
          Schließen
        </Button>
      </Stack>
    </Drawer>
  );
};
