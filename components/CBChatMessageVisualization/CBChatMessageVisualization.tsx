"use client";

import { CBChatMessageRole } from "@/data/exercises/CBChatMessage";
import { Stack, Typography } from "@mui/material";
import { motion, MotionProps, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { CBChatMessageVisualizationProps } from "./CBChatMessageVisualizationInterfaces";

const animationVariants: MotionProps["variants"] = {
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: "tween", ease: "easeOut", duration: 0.2 },
  },
};
export const CBChatMessageVisualization = ({
  message,
}: CBChatMessageVisualizationProps): JSX.Element => {
  const animationControls = useAnimationControls();

  useEffect(() => {
    animationControls.start("show");
  }, [animationControls]);

  const isAI = message.role === CBChatMessageRole.AI;

  return (
    <Stack
      spacing={1}
      sx={{
        alignSelf: isAI ? "flex-start" : "flex-end",
        bgcolor: (t) => (isAI ? t.palette.grey[50] : t.palette.primary.light),
        color: (t) => (isAI ? undefined : t.palette.primary.contrastText),
        p: 2,
        borderRadius: 3,
        width: "60%",
      }}
      component={motion.div}
      initial={{ scale: 0, opacity: 0 }}
      animate={animationControls}
      variants={animationVariants}
    >
      <Typography
        sx={{
          fontWeight: (t) => t.typography.fontWeightBold,
        }}
      >
        {isAI ? "DiNA" : "Du"}
      </Typography>

      <Typography>{message.content}</Typography>
    </Stack>
  );
};
