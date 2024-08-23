"use client";

import { isUserFullyLoaded } from "@/firebase-client/isUserFullyLoaded";
import { useUncertainUser } from "@/firebase-client/useUncertainUser";
import { layoutHorizontalSpacing } from "@/helpers/layoutSpacing";
import { useRouteData } from "@/helpers/useRouteData";
import { themeSpacingFactor } from "@/theme/theme";
import { CBConfettiProvider } from "@/ui/CBConfettiProvider";
import { useSnackbar } from "@/ui/useSnackbar";
import { Box, Stack, Theme, useMediaQuery } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CBConfettiWrapper } from "../CBConfettiWrapper/CBConfettiWrapper";
import { CBSidebar } from "../CBSidebar/CBSidebar";
import { CBSnackbar } from "../CBSnackbar/CBSnackbar";
import { CBLoadingView } from "../views/CBLoadingAppView";
import { CBMobileView } from "../views/CBMobileView";
import { CBNoAccessView } from "../views/CBNoAccessView";
import { CBNotSignedInView } from "../views/CBNotSignedInView";
import { CBMainLayoutProps } from "./CBMainLayoutInterfaces";

const sidebarWidthOpen = 300;
const sidebarWidthClosed = 100;

export const CBMainLayout = ({ children }: CBMainLayoutProps): JSX.Element => {
  const routeData = useRouteData();
  const user = useUncertainUser();
  const isMobile = useMediaQuery<Theme>((t) => t.breakpoints.down("sm"));

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

  if (!isUserFullyLoaded(user)) {
    return <CBLoadingView />;
  }

  if (!user.user) {
    return <CBNotSignedInView />;
  }

  const hasAccess = routeData?.forRoles.includes(user.customData.role);
  const notFound = hasAccess === undefined;

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
              {hasAccess || notFound ? children : <CBNoAccessView />}
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
