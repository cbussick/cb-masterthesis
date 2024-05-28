"use client";

import { KeyboardArrowDownRounded } from "@mui/icons-material";
import { Box, Divider, Theme } from "@mui/material";
import { MPMIProgressCircleConnectorProps } from "./MPMIProgressCircleConnectorProps";

const dividerHeight = 75;

export const MPMIProgressCircleConnector = ({
  disabled,
}: MPMIProgressCircleConnectorProps): JSX.Element => {
  const color = (t: Theme) =>
    disabled ? t.palette.grey[600] : t.palette.background.default;

  return (
    <Box
      display="flex"
      justifyContent="center"
      position="relative"
      height={dividerHeight}
    >
      <Divider
        orientation="vertical"
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          height: dividerHeight,
          borderRightWidth: 8,
          borderRightColor: color,
        }}
      />

      <KeyboardArrowDownRounded
        sx={{
          position: "absolute",
          bottom: -29,
          fontSize: 75,
          color,
        }}
      />
    </Box>
  );
};
