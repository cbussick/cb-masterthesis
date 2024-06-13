"use client";

import { useCurrentMuiBreakpoint } from "@/helpers/useCurrentMuiBreakpoint";
import { Lock } from "@mui/icons-material";
import {
  Box,
  Breakpoint,
  ButtonBase,
  CircularProgress,
  Stack,
  Typography,
  circularProgressClasses,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CBProgressCircleProps } from "./CBProgressCircleInterfaces";

const thickness = 4.5;

const innerCircleSizeMap: Record<Breakpoint, number> = {
  xs: 150,
  sm: 200,
  md: 250,
  lg: 325,
  xl: 370,
};

const iconSizeMap: Record<Breakpoint, number> = {
  xs: 20,
  sm: 30,
  md: 40,
  lg: 55,
  xl: 65,
};

export const CBProgressCircle = ({
  label,
  progress,
  href,
  unlocked,
  icon,
}: CBProgressCircleProps): JSX.Element => {
  const theme = useTheme();
  const currentBreakpoint = useCurrentMuiBreakpoint();

  // Only works for `thickness = 4.5`
  const outerCircleSize =
    innerCircleSizeMap[currentBreakpoint] +
    (innerCircleSizeMap[currentBreakpoint] / 10) * 2.6;

  return (
    <Box
      component={motion.div}
      initial={{ scale: 1 }}
      whileHover={{ scale: unlocked ? 1.025 : undefined }}
      sx={{
        position: "relative",
        width: "fit-content",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          width: outerCircleSize,
          height: outerCircleSize,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Inactive part of the progress (= grey background) */}
        <Box
          sx={{
            position: "absolute",
            bgcolor: (t) =>
              unlocked ? t.palette.grey[200] : t.palette.grey[600],
            borderRadius: "50%",
            boxShadow: (t) => t.shadows[8],
            top: 1,
            right: 1,
            bottom: 1,
            left: 1,
            opacity: 0.5,
          }}
        />

        <svg width={0} height={0}>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={theme.palette.primary.dark} />

              <stop offset="100%" stopColor={theme.palette.primary.light} />
            </linearGradient>
          </defs>
        </svg>

        {unlocked && (
          /* Active part of the progress (= green foreground) */
          <CircularProgress
            variant="determinate"
            thickness={thickness}
            value={progress}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              width: "100% !important",
              height: "100% !important",
              [`& .${circularProgressClasses.circle}`]: {
                strokeLinecap: "round",
                stroke: "url(#gradient)",
              },
            }}
          />
        )}

        <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
          <ButtonBase
            sx={{
              width: innerCircleSizeMap[currentBreakpoint],
              height: innerCircleSizeMap[currentBreakpoint],
              borderRadius: "50%",
              bgcolor: (t) => t.palette.background.default,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 3,
              boxShadow: (t) => t.shadows[8],
            }}
            TouchRippleProps={{
              style: { color: theme.palette.primary.light },
            }}
            disabled={!unlocked}
          >
            <Stack
              sx={{
                alignItems: "center",
                mt: -4,
              }}
              spacing={1}
            >
              {unlocked ? (
                <Image src={icon.src} alt={icon.alt} width={120} height={95} />
              ) : (
                <Lock
                  sx={{
                    color: (t) => t.palette.grey[700],
                    fontSize: iconSizeMap[currentBreakpoint],
                  }}
                />
              )}

              <Typography
                variant="h3"
                sx={{
                  textAlign: "center",
                  fontWeight: (t) => t.typography.fontWeightBold,
                }}
              >
                {label}
              </Typography>
            </Stack>
          </ButtonBase>
        </Link>
      </Box>
    </Box>
  );
};
