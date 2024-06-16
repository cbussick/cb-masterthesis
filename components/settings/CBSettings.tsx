"use client";

import { CBTabPanel } from "@/components/CBTabPanel/CBTabPanel";
import { PersonRounded } from "@mui/icons-material";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { CBProfileSettings } from "./CBProfileSettings";

export const CBSettings = () => {
  const [value, setValue] = useState<number>(0);

  return (
    <Stack sx={{ flexGrow: 1, overflowY: "auto" }}>
      <Box sx={{ borderBottom: 1, borderColor: (t) => t.palette.divider }}>
        <Tabs
          value={value}
          onChange={(event: SyntheticEvent, newValue: number) => {
            setValue(newValue);
          }}
        >
          <Tab label="Profil verwalten" icon={<PersonRounded />} />
        </Tabs>
      </Box>

      <CBTabPanel value={value} index={0}>
        <CBProfileSettings />
      </CBTabPanel>
    </Stack>
  );
};
