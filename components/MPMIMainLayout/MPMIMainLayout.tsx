"use client";

import { useUser } from "@/firebase/useUser";
import { layoutHorizontalSpacing } from "@/helpers/layoutSpacing";
import { getSpacingFactor } from "@/theme/theme";
import { MPMIConfettiProvider } from "@/ui/MPMIConfettiProvider";
import { useSnackbar } from "@/ui/useSnackbar";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MPMIConfettiWrapper } from "../MPMIConfettiWrapper/MPMIConfettiWrapper";
import { MPMISidebar } from "../MPMISidebar/MPMISidebar";
import { MPMISnackbar } from "../MPMISnackbar/MPMISnackbar";
import { MPMILoadingView } from "../views/MPMILoadingView/MPMILoadingView";
import { MPMIMobileView } from "../views/MPMIMobileView/MPMIMobileView";
import { MPMINotSignedInView } from "../views/MPMINotSignedInView/MPMINotSignedInView";
import { MPMIMainLayoutProps } from "./MPMIMainLayoutInterfaces";

const sidebarWidthOpen = 300;
const sidebarWidthClosed = 100;

export const MPMIMainLayout = ({
  children,
}: MPMIMainLayoutProps): JSX.Element => {
  const theme = useTheme();
  const user = useUser();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { isOpen, setOpen, title, message, severity } = useSnackbar();

  if (isMobile) {
    return <MPMIMobileView />;
  }

  // Show loading while user and custom data is not loaded
  if (
    !user?.isUserLoaded ||
    (user?.user && user?.customData.firstName === "")
  ) {
    return <MPMILoadingView />;
  }

  if (!user?.user) {
    return <MPMINotSignedInView />;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
      <Stack
        display={{ xs: "none", sm: "flex" }}
        direction="row"
        height="100vh"
      >
        <Box position="relative" height="100%">
          <MPMISidebar
            sidebarWidthOpen={sidebarWidthOpen}
            sidebarWidthClosed={sidebarWidthClosed}
            sidebarHorizontalSpacing={layoutHorizontalSpacing}
          />
        </Box>

        {/* The pages (= the content on the right side of the app) are rendered here */}
        <MPMIConfettiProvider>
          <MPMIConfettiWrapper>
            <Box
              flex="1 1 auto"
              height="100%"
              ml={
                layoutHorizontalSpacing * 2 +
                sidebarWidthClosed / getSpacingFactor()
              }
            >
              {children}
            </Box>
          </MPMIConfettiWrapper>
        </MPMIConfettiProvider>
      </Stack>

      <MPMISnackbar
        isOpen={isOpen}
        severity={severity}
        onClose={() => {
          setOpen(false);
        }}
        title={title}
        message={message}
      />
    </LocalizationProvider>
  );
};
