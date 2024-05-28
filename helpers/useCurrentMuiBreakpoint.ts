import theme from "@/theme/theme";
import { useMediaQuery } from "@mui/material";
import { Breakpoint } from "@mui/system";

const defaultBreakpoint: Breakpoint = "xs";

/**
 * Returns the current MUI breakpoint.
 */
export const useCurrentMuiBreakpoint = (): Breakpoint => {
  const breakpoints: Record<Breakpoint, boolean> = {
    xs: useMediaQuery(theme.breakpoints.only("xs")),
    sm: useMediaQuery(theme.breakpoints.only("sm")),
    md: useMediaQuery(theme.breakpoints.only("md")),
    lg: useMediaQuery(theme.breakpoints.only("lg")),
    xl: useMediaQuery(theme.breakpoints.only("xl")),
  };

  const breakPoint = Object.entries(breakpoints).find(
    ([, isActive]) => isActive,
  ) as [Breakpoint, boolean] | undefined;

  return breakPoint?.[0] || defaultBreakpoint;
};
