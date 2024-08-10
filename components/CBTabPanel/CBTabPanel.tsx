"use client";

import { Box } from "@mui/material";
import { CBTabPanelProps } from "./CBTabPanelInterfaces";

export const CBTabPanel = ({ children, value, index }: CBTabPanelProps) => {
  return (
    <Box hidden={value !== index} sx={{ overflowY: "auto" }}>
      {/* Keep `pb: ...` to avoid cutting off boxshadow of elements at the bottom */}
      {value === index && <Box sx={{ pt: 1, pb: 2 }}>{children}</Box>}
    </Box>
  );
};
