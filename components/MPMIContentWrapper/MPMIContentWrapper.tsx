"use client";

import {
  layoutHorizontalSpacing,
  layoutVerticalSpacing,
} from "@/helpers/layoutSpacing";
import { Box, useTheme } from "@mui/material";
import { MPMIContentWrapperProps } from "./MPMIContentWrapperInterfaces";

/**
 * A component to wrap the main content of the app on the right side.
 * This is used to set the background color and the padding of the main content.
 * Primarily helpful for ensuring that all pages have the same padding and position on the screen.
 */
export const MPMIContentWrapper = ({
  children,
  bgcolor,
  paddingHorizontal,
  sxOuterContainer,
  sxInnerContainer,
}: MPMIContentWrapperProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Box position="relative" height="100%" sx={{ ...sxOuterContainer }}>
      <Box
        sx={{
          overflowY: "auto",
          ...sxInnerContainer,
          scrollbarGutter: "stable",
        }}
        bgcolor={bgcolor}
        boxShadow={(t) => (bgcolor ? t.shadows[8] : undefined)}
        borderRadius={5}
        px={
          paddingHorizontal || paddingHorizontal === 0 ? paddingHorizontal : 6
        }
        py={4}
        position="absolute"
        top={theme.spacing(layoutVerticalSpacing)}
        bottom={theme.spacing(layoutVerticalSpacing)}
        right={theme.spacing(layoutHorizontalSpacing)}
        left={0}
        display="flex"
        flexDirection="column"
      >
        {children}
      </Box>
    </Box>
  );
};
