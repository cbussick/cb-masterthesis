"use client";

import { KeyboardArrowDownRounded } from "@mui/icons-material";
import { Box, Divider, Theme } from "@mui/material";
import { motion } from "framer-motion";
import { CBProgressCircleConnectorProps } from "./CBProgressCircleConnectorProps";

const dividerHeight = 75;

export const CBProgressCircleConnector = ({
  disabled,
}: CBProgressCircleConnectorProps): JSX.Element => {
  const color = (t: Theme) =>
    disabled ? t.palette.grey[600] : t.palette.background.default;

  return (
    <Box
      component={motion.div}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      sx={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
        height: dividerHeight,
      }}
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
