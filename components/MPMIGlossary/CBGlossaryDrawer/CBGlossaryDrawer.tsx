"use client";

import { Box, Button, Drawer, Stack, Typography } from "@mui/material";
import Image from "next/image";
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
      <Stack spacing={2} p={4}>
        <Typography variant="h2">{selectedEntry?.term}</Typography>

        <Typography pt={1}>{selectedEntry?.definition}</Typography>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={5}
          width="100%"
          minHeight={250}
          position="relative"
        >
          {selectedEntry?.image && (
            <Image
              src={selectedEntry.image}
              alt={selectedEntry.term}
              fill
              style={{ objectFit: "contain" }}
            />
          )}
        </Box>

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
