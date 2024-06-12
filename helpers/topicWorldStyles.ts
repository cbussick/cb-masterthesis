import { CBContentWrapperProps } from "@/components/CBContentWrapper/CBContentWrapperInterfaces";
import { BoxProps, SxProps, alpha } from "@mui/material";

export const topicWorldContentWrapperStyles: Omit<
  CBContentWrapperProps,
  "children"
> = {
  sxInnerContainer: {
    py: 0,
    px: 0,
    borderRadius: 5,
    overflow: "visible",
  },
  bgcolor: (t) => alpha(t.palette.background.default, 0.5),
};

export const topicWorldPageHeaderStyles: SxProps = {
  mb: 0,
};

export const topicWorldInnerBoxStyles: BoxProps = {
  flex: "1 1 auto",
  pt: 5,
  pb: 8,
  sx: { overflowY: "auto" },
  position: "relative",
};
