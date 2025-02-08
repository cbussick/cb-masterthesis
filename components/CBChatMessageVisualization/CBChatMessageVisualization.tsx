"use client";

import { CBChatMessageRole } from "@/data/exercises/CBChatMessage";
import { useUser } from "@/firebase-client/useUser";
import { Stack, Typography } from "@mui/material";
import { motion, MotionProps, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { CBAvatar } from "../CBAvatar/CBAvatar";
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
  const { customData } = useUser();
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
      initial={{ scale: 0.8, opacity: 0 }}
      animate={animationControls}
      variants={animationVariants}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <CBAvatar
          image={{
            src: isAI ? "/logo/dina.svg" : customData.profilePicture,
            alt: isAI ? "DiNA" : "Dein Profilbild",
          }}
          imageSize={35}
          avatarProps={{
            sx: { border: (t) => `2px solid ${t.palette.grey[300]}` },
          }}
        />

        <Typography
          sx={{
            fontWeight: (t) => t.typography.fontWeightBold,
          }}
        >
          {isAI ? "DiNA" : "Du"}
        </Typography>
      </Stack>

      <Typography sx={{ whiteSpace: "pre-wrap" }}>{message.content}</Typography>
    </Stack>
  );
};
