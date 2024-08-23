import { Breakpoint, Theme, useMediaQuery } from "@mui/material";

const defaultBreakpoint: Breakpoint = "xs";

export const useCurrentMuiBreakpoint = (): Breakpoint => {
  const breakpoints: Record<Breakpoint, boolean> = {
    xs: useMediaQuery<Theme>((t) => t.breakpoints.only("xs")),
    sm: useMediaQuery<Theme>((t) => t.breakpoints.only("sm")),
    md: useMediaQuery<Theme>((t) => t.breakpoints.only("md")),
    lg: useMediaQuery<Theme>((t) => t.breakpoints.only("lg")),
    xl: useMediaQuery<Theme>((t) => t.breakpoints.only("xl")),
  };

  const breakPoint = Object.entries(breakpoints).find(
    ([, isActive]) => isActive,
  ) as [Breakpoint, boolean] | undefined;

  return breakPoint?.[0] || defaultBreakpoint;
};
