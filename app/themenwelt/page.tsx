"use client";

import { MPMIContentWrapper } from "@/components/MPMIContentWrapper/MPMIContentWrapper";
import { MPMIPageHeader } from "@/components/MPMIPageHeader/MPMIPageHeader";
import { MPMITopicWorld } from "@/components/MPMITopicWorld/MPMITopicWorld";
import {
  topicWorldContentWrapperStyles,
  topicWorldInnerBoxStyles,
  topicWorldPageHeaderStyles,
} from "@/helpers/topicWorldStyles";
import { Box } from "@mui/material";
import Image from "next/image";

export default function TopicWorld() {
  return (
    <MPMIContentWrapper {...topicWorldContentWrapperStyles}>
      <MPMIPageHeader
        title="Themenwelt"
        subTitle="Lerne Schritt für Schritt die Welt der Genetik kennen!"
        isOnTransparentBackground
        sx={topicWorldPageHeaderStyles}
      />

      <Box {...topicWorldInnerBoxStyles}>
        <MPMITopicWorld />
      </Box>

      <Box position="absolute" right={50} bottom={10} width={200} height={300}>
        <Image src="/logo/dina.svg" alt="DiNA" fill />
      </Box>
    </MPMIContentWrapper>
  );
}
