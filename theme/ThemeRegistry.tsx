"use client";

import { ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import theme from "./theme";

/**
 * Structure taken from: https://github.com/mui/material-ui/tree/master/examples/material-next-app-router-ts
 */
export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
