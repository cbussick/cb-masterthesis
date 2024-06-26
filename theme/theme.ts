"use client";

import { createTheme, responsiveFontSizes, Theme } from "@mui/material";
import { font } from "./font";

const fontWeightMedium = 500;
const fontWeightBold = 700;

// Is the MUI default, but to access this factor somewhere else, we need to define it here explicitly.
export const themeSpacingFactor = 8;

const theme = createTheme({
  palette: {
    primary: {
      main: "#689F38",
      light: "#8bC34A",
      dark: "#486F27",
    },
    secondary: { main: "#8E4E94" },
  },
  spacing: themeSpacingFactor,
  typography: {
    fontFamily: font.style.fontFamily,
    fontWeightMedium,
    fontWeightBold,
    h1: {
      fontSize: "2.5rem", // 40px
      fontWeight: fontWeightMedium,
    },
    h2: {
      fontSize: "2.188rem", // 35px
      fontWeight: fontWeightMedium,
    },
    h3: {
      fontSize: "1.5rem", // 24px
      fontWeight: fontWeightMedium,
    },
    h4: {
      fontSize: "1.25rem", // 20px
      fontWeight: fontWeightMedium,
    },
    body1: {
      fontSize: "1.125rem", // 18px
    },
    body2: {
      fontSize: "1rem", // 16px
    },
    caption: {
      fontSize: "0.625rem", // 10px
    },
    button: {
      textTransform: "none",
      fontWeight: fontWeightBold,
    },
  },
});

const themeWithOverrides: Theme = {
  ...theme,
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 2,
      },
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius * 3,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: theme.typography.body1.fontSize,
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
    },
  },
};

export const themeWithResponsiveFontSizes = responsiveFontSizes(
  themeWithOverrides,
  {},
);
