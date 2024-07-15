"use client";

import { CBContentWrapper } from "@/components/CBContentWrapper/CBContentWrapper";
import { CBImage } from "@/components/CBImage/CBImage";
import { CBLoadingButton } from "@/components/CBLoadingButton/CBLoadingButton";
import { CBPageHeader } from "@/components/CBPageHeader/CBPageHeader";
import { getOpenAIImage } from "@/helpers/openai/getOpenAIImage";
import { Box } from "@mui/material";
import { useState } from "react";

export default function Playground() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  return (
    <CBContentWrapper bgcolor={(t) => t.palette.background.default}>
      <CBPageHeader title="Playground" />

      <Box>
        <CBLoadingButton
          onClick={() => {
            setLoading(true);
            getOpenAIImage("A blue elephant")
              .then((response) => {
                setLoading(false);
                setImageUrl(response);
              })
              .catch(() => {
                setLoading(false);
              });
          }}
          isLoading={isLoading}
        >
          Get me an image! :)
        </CBLoadingButton>

        {imageUrl && <CBImage image={{ src: imageUrl, alt: "" }} />}
      </Box>
    </CBContentWrapper>
  );
}
