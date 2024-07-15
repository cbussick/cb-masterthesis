"use client";

import { CBContentWrapper } from "@/components/CBContentWrapper/CBContentWrapper";
import { CBPageHeader } from "@/components/CBPageHeader/CBPageHeader";

export default function Playground() {
  return (
    <CBContentWrapper bgcolor={(t) => t.palette.background.default}>
      <CBPageHeader title="Playground" />
    </CBContentWrapper>
  );
}
