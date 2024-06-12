import { Box } from "@mui/material";
import { CBTabPanelProps } from "./CBSettingsInterfaces";

export const CBTabPanel = ({ children, value, index }: CBTabPanelProps) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      sx={{ overflowY: "auto" }}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
};
