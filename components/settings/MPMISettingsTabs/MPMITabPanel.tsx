import { Box } from "@mui/material";
import { MPMISetttingsTabsProps } from "./MPMISettingsTabsInterfaces";

export const MPMITabPanel = ({
  children,
  value,
  index,
}: MPMISetttingsTabsProps) => {
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
