import { CBContentWrapperProps } from "@/components/CBContentWrapper/CBContentWrapperInterfaces";
import { BoxProps, SxProps, alpha } from "@mui/material";

export const topicWorldContentWrapperStyles: Omit<
  CBContentWrapperProps,
  "children"
> = {
  sxInnerContainer: {
    bgcolor: (t) => alpha(t.palette.background.default, 0.5),
    py: 0,
    px: 0,
    borderRadius: 5,
    overflow: "visible",
  },
};

export const topicWorldPageHeaderStyles: SxProps = {
  mb: 0,
};

export const topicWorldInnerBoxStyles: BoxProps = {
  sx: {
    flex: "1 1 auto",
    position: "relative",
    pt: 5,
    pb: 8,
    overflowY: "auto",
  },
};
