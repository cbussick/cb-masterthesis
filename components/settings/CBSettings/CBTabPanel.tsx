import { Box } from "@mui/material";
import { CBTabPanelProps } from "./CBSettingsInterfaces";

export const CBTabPanel = ({ children, value, index }: CBTabPanelProps) => {
  return (
    <Box hidden={value !== index} sx={{ overflowY: "auto" }}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
};
