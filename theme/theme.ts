import { createTheme, responsiveFontSizes, Theme } from "@mui/material";

const fontWeightMedium = 500;

// Is the MUI default, but to access this factor somewhere else, we need to define it here explicitly.
const spacing = 8;

export const getSpacingFactor = () => spacing;

const theme = createTheme({
  palette: {
    primary: {
      main: "#689F38",
      light: "#8bC34A",
      dark: "#486F27",
    },
    secondary: { main: "#8E4E94" },
  },
  spacing,
  typography: {
    // We are using `next/font` to load the font.
    // The theme needs to inherit from `body` in order not to override the `next/font` with the Material UI default fonts.
    fontFamily: "inherit",
    fontWeightMedium,
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
  },
});

const themeWithOverrides: Theme = {
  ...theme,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: "bold",
          p: 10,
          pl: 20,
          pr: 20,
        },
      },
      defaultProps: {
        variant: "contained",
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 2,
      },
    },
  },
};

const themeWithResponsiveFontSizes = responsiveFontSizes(
  themeWithOverrides,
  {},
);

export default themeWithResponsiveFontSizes;
