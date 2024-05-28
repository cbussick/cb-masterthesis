"use client";

import { Box, Card, Stack, Typography } from "@mui/material";
import { MotionProps, motion } from "framer-motion";
import Image from "next/image";
import { MPMIUnstyledNextLink } from "../MPMIUnstyledNextLink/MPMIUnstyledNextLink";
import { MPMIInfoCardProps } from "./MPMIInfoCardInterfaces";

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

export const MPMIInfoCard = ({
  image,
  alt,
  text,
  href,
  disabled,
}: MPMIInfoCardProps): JSX.Element => {
  const component: JSX.Element = (
    <Card
      sx={{
        height: 275,
        borderRadius: 3,
        display: "flex",
      }}
      component={motion.div}
      whileHover={disabled ? undefined : "hover"}
      variants={cardVariants}
    >
      <Stack flex="1 1 auto">
        <Box overflow="hidden">
          <Box
            position="relative"
            width="100%"
            height={205}
            component={motion.div}
            variants={imageVariants}
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
        </Box>

        <Box display="flex" flex="1 1 auto" alignItems="center">
          <Typography
            sx={{
              textAlign: "center",
              padding: 1,
              flex: "1 1 auto",
            }}
            fontWeight={(t) => t.typography.fontWeightMedium}
          >
            {text}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );

  return href ? (
    <MPMIUnstyledNextLink href={href}>{component}</MPMIUnstyledNextLink>
  ) : (
    component
  );
};
