import {
  layoutHorizontalSpacing,
  layoutVerticalSpacing,
} from "@/helpers/layoutSpacing";
import { Box } from "@mui/material";
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
  return (
    <Box position="relative" height="100%" sx={{ ...sxOuterContainer }}>
      <Box
        bgcolor={bgcolor}
        boxShadow={(t) => (bgcolor ? t.shadows[8] : undefined)}
        borderRadius={5}
        px={
          paddingHorizontal || paddingHorizontal === 0 ? paddingHorizontal : 6
        }
        py={4}
        position="absolute"
        top={(t) => t.spacing(layoutVerticalSpacing)}
        bottom={(t) => t.spacing(layoutVerticalSpacing)}
        right={(t) => t.spacing(layoutHorizontalSpacing)}
        left={0}
        display="flex"
        flexDirection="column"
        sx={{
          overflowY: "auto",
          ...sxInnerContainer,
          scrollbarGutter: "stable",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
