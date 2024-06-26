"use client";

import { CBContentWrapper } from "@/components/CBContentWrapper/CBContentWrapper";
import { CBImage } from "@/components/CBImage/CBImage";
import { CBPageHeader } from "@/components/CBPageHeader/CBPageHeader";
import { CBTopicWorld } from "@/components/CBTopicWorld/CBTopicWorld";
import {
  topicWorldContentWrapperStyles,
  topicWorldInnerBoxStyles,
  topicWorldPageHeaderStyles,
} from "@/helpers/topic-world/topicWorldStyles";
import { Box } from "@mui/material";

export default function TopicWorld() {
  return (
    <CBContentWrapper {...topicWorldContentWrapperStyles}>
      <CBPageHeader
        title="Themenwelt"
        subTitle="Lerne Schritt für Schritt die Welt der Genetik kennen!"
        isOnTransparentBackground
        sx={topicWorldPageHeaderStyles}
      />

      <Box {...topicWorldInnerBoxStyles}>
        <CBTopicWorld />
      </Box>

      <CBImage
        image={{
          src: "/logo/dina.svg",
          alt: "DiNA",
        }}
        boxProps={{
          sx: {
            position: "absolute",
            right: 50,
            bottom: 10,
            width: 200,
            height: 300,
          },
        }}
      />
    </CBContentWrapper>
  );
}
