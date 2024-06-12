"use client";

import { replaceEmoji } from "@/helpers/replaceWithTwemoji";
import { useCurrentMuiBreakpoint } from "@/helpers/useCurrentMuiBreakpoint";
import { Box, TypographyProps, useTheme } from "@mui/material";
import { TypographyStyle } from "@mui/material/styles/createTypography";
import { CBEmojiProps } from "./CBEmojiInterfaces";

const getMediaString = (breakpointPxValue: number) =>
  `@media (min-width:${breakpointPxValue}px)`;

export const CBEmoji = ({
  emoji,
  typographyVariant,
  fontSize,
}: CBEmojiProps): JSX.Element => {
  const theme = useTheme();
  const currentBreakpoint = useCurrentMuiBreakpoint();
  const variant: TypographyProps["variant"] = typographyVariant || "body1";

  // `xl` does not have a value when using `responsiveFontSizes` in the theme, so the fontSize for that breakpoint would be undefined.
  // That's why we use the value of `lg` for `xl` breakpoints.
  const currentBreakpointPxValue =
    currentBreakpoint === "xl"
      ? theme.breakpoints.values.lg
      : theme.breakpoints.values[currentBreakpoint];
  const mediaString = getMediaString(currentBreakpointPxValue);

  // @ts-ignore
  const typographyThemeStyle = theme.typography[variant] as TypographyStyle;

  const responsiveFontSize = typographyThemeStyle[mediaString] as
    | {
        fontSize: string;
      }
    | undefined;

  const imgSize =
    fontSize || responsiveFontSize?.fontSize || typographyThemeStyle.fontSize;

  return (
    <Box
      dangerouslySetInnerHTML={{ __html: replaceEmoji(emoji) }}
      display="flex"
      alignItems="center"
      sx={{
        "& img": {
          width: imgSize,
          height: imgSize,
        },
      }}
    />
  );
};
