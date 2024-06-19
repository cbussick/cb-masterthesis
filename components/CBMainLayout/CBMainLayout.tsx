"use client";

import { useUser } from "@/firebase/useUser";
import { layoutHorizontalSpacing } from "@/helpers/layoutSpacing";
import { themeSpacingFactor } from "@/theme/theme";
import { CBConfettiProvider } from "@/ui/CBConfettiProvider";
import { useSnackbar } from "@/ui/useSnackbar";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CBConfettiWrapper } from "../CBConfettiWrapper/CBConfettiWrapper";
import { CBSidebar } from "../CBSidebar/CBSidebar";
import { CBSnackbar } from "../CBSnackbar/CBSnackbar";
import { CBLoadingView } from "../views/CBLoadingView";
import { CBMobileView } from "../views/CBMobileView";
import { CBNotSignedInView } from "../views/CBNotSignedInView";
import { CBMainLayoutProps } from "./CBMainLayoutInterfaces";

const sidebarWidthOpen = 300;
const sidebarWidthClosed = 100;

export const CBMainLayout = ({ children }: CBMainLayoutProps): JSX.Element => {
  const user = useUser();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    isOpen: isSnackbarOpen,
    setOpen: setSnackbarOpen,
    title,
    message,
    severity,
  } = useSnackbar();

  if (isMobile) {
    return <CBMobileView />;
  }

  // Show loading while user and custom data is not loaded
  if (!user?.isUserLoaded || (user.user && user.customData.firstName === "")) {
    return <CBLoadingView />;
  }

  if (!user.user) {
    return <CBNotSignedInView />;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
      <Stack
        direction="row"
        sx={{
          height: "100vh",
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: "100%",
          }}
        >
          <CBSidebar
            sidebarWidthOpen={sidebarWidthOpen}
            sidebarWidthClosed={sidebarWidthClosed}
            sidebarHorizontalSpacing={layoutHorizontalSpacing}
          />
        </Box>

        {/* The pages (= the content on the right side of the app) are rendered here */}
        <CBConfettiProvider>
          <CBConfettiWrapper>
            <Box
              sx={{
                flex: "1 1 auto",
                height: "100%",
                ml:
                  layoutHorizontalSpacing * 2 +
                  sidebarWidthClosed / themeSpacingFactor,
              }}
            >
              {children}
            </Box>
          </CBConfettiWrapper>
        </CBConfettiProvider>
      </Stack>

      <CBSnackbar
        isOpen={isSnackbarOpen}
        severity={severity}
        onClose={() => {
          setSnackbarOpen(false);
        }}
        title={title}
        message={message}
      />
    </LocalizationProvider>
  );
};
