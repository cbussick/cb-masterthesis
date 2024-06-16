"use client";

import { Stack, Typography } from "@mui/material";
import { CBUserActionsBar } from "../CBUserActionsBar/CBUserActionsBar";
import { CBUserChip } from "../CBUserChip/CBUserChip";
import { CBPageHeaderProps } from "./CBPageHeaderInterfaces";

export const CBPageHeader = ({
  title,
  subTitle,
  isOnTransparentBackground,
  sx,
}: CBPageHeaderProps): JSX.Element => {
  return (
    <Stack
      direction="row"
      spacing={5}
      sx={{
        width: "100%",
        justifyContent: "space-between",
        alignItems: "flex-start",
        bgcolor: isOnTransparentBackground
          ? (t) => t.palette.background.default
          : undefined,
        boxShadow: isOnTransparentBackground ? (t) => t.shadows[8] : undefined,
        py: isOnTransparentBackground ? 4 : undefined,
        px: isOnTransparentBackground ? 6 : undefined,
        borderRadius: isOnTransparentBackground ? 5 : undefined,
        zIndex: 9,
        mb: 4,
        ...sx,
      }}
    >
      <Stack spacing={1}>
        {typeof title === "string" ? (
          <Typography variant="h2">{title}</Typography>
        ) : (
          title
        )}

        {subTitle === "string" ? (
          <Typography variant="h3">{subTitle}</Typography>
        ) : (
          subTitle
        )}
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: "center",
        }}
      >
        <CBUserChip />

        <CBUserActionsBar />
      </Stack>
    </Stack>
  );
};
