import { CBMainLayout } from "@/components/CBMainLayout/CBMainLayout";
import { UserProvider } from "@/firebase/UserProvider";
import { font } from "@/theme/font";
import { themeWithResponsiveFontSizes as theme } from "@/theme/theme";
import { SnackbarProvider } from "@/ui/SnackbarProvider";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";
import Image from "next/image";
import { ReactNode } from "react";
import { SidebarProvider } from "../ui/SidebarProvider";

export const metadata: Metadata = {
  title: "DiNAs Lab",
  description: "Die Biologie Lernapp",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className={font.className}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <UserProvider>
              <SnackbarProvider>
                <SidebarProvider>
                  <Box
                    sx={{
                      position: "fixed",
                      width: "100%",
                      height: "100%",
                      zIndex: -1,
                    }}
                  >
                    <Image
                      src="/lab-bg.png"
                      alt="Labor Hintergrund"
                      quality={100}
                      fill
                      sizes="100vw"
                      priority
                      style={{
                        objectFit: "cover",
                        filter: "blur(4px)",
                        // Necessary to prevent white lines on the edges of the image after blur
                        scale: 1.01,
                      }}
                    />
                  </Box>

                  <CBMainLayout>{children}</CBMainLayout>
                </SidebarProvider>
              </SnackbarProvider>
            </UserProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
