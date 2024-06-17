"use client";

import { Box, Card, Stack, Typography } from "@mui/material";
import { MotionProps, motion } from "framer-motion";
import Image from "next/image";
import { CBUnstyledNextLink } from "../CBUnstyledNextLink/CBUnstyledNextLink";
import { CBInfoCardProps } from "./CBInfoCardInterfaces";

const cardVariants: MotionProps["variants"] = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1,
  },
};

const imageVariants: MotionProps["variants"] = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.025,
  },
};

export const CBInfoCard = ({
  image,
  alt,
  text,
  href,
  disabled,
}: CBInfoCardProps): JSX.Element => {
  const component: JSX.Element = (
    <Card
      sx={{
        height: 300,
        borderRadius: 3,
        display: "flex",
      }}
      component={motion.div}
      whileHover={disabled ? undefined : "hover"}
      variants={cardVariants}
    >
      <Stack
        sx={{
          flexGrow: 1,
        }}
      >
        <Stack
          sx={{
            flexGrow: 1,
            bgcolor: "skyblue",
            overflow: "hidden",
          }}
        >
          <Box
            component={motion.div}
            variants={imageVariants}
            sx={{
              position: "relative",
              height: "100%",
            }}
          >
            <Image
              src={image}
              alt={alt || ""}
              fill
              style={{
                objectFit: "cover",
                filter: disabled ? "grayscale(0.9)" : undefined,
              }}
            />
          </Box>
        </Stack>

        <Typography
          sx={{
            p: 2,
            textAlign: "center",
            fontWeight: (t) => t.typography.fontWeightMedium,
          }}
        >
          {text}
        </Typography>
      </Stack>
    </Card>
  );

  return href ? (
    <CBUnstyledNextLink href={href}>{component}</CBUnstyledNextLink>
  ) : (
    component
  );
};
