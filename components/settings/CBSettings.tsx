"use client";

import { CBTabPanel } from "@/components/CBTabPanel/CBTabPanel";
import { FaceRounded, PersonRounded } from "@mui/icons-material";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { CBAvatarSettings } from "./CBAvatarSettings";
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

          <Tab label="Avatar verwalten" icon={<FaceRounded />} />
        </Tabs>
      </Box>

      <CBTabPanel value={value} index={0}>
        <CBProfileSettings />
      </CBTabPanel>

      <CBTabPanel value={value} index={1}>
        <CBAvatarSettings />
      </CBTabPanel>
    </Stack>
  );
};
