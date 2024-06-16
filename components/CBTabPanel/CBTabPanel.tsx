"use client";

import { Box } from "@mui/material";
import { CBTabPanelProps } from "./CBTabPanelInterfaces";

export const CBTabPanel = ({ children, value, index }: CBTabPanelProps) => {
  return (
    <Box hidden={value !== index} sx={{ overflowY: "auto" }}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </Box>
  );
};
