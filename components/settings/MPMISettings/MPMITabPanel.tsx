import { Box } from "@mui/material";
import { MPMITabPanelProps } from "./MPMISettingsInterfaces";

export const MPMITabPanel = ({ children, value, index }: MPMITabPanelProps) => {
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
