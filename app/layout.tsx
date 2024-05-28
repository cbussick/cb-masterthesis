import { MPMIMainLayout } from "@/components/MPMIMainLayout/MPMIMainLayout";
import { UserProvider } from "@/firebase/UserProvider";
import ThemeRegistry from "@/theme/ThemeRegistry";
import { font } from "@/theme/font";
import { SnackbarProvider } from "@/ui/SnackbarProvider";
import { Box, CssBaseline } from "@mui/material";
import type { Metadata } from "next";
import Image from "next/image";
import { SidebarProvider } from "../ui/SidebarProvider";

export const metadata: Metadata = {
  title: "DiNAs Lab",
  description: "Eine Biologie Lernapp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={font.className}>
      <body>
        <ThemeRegistry>
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

                <MPMIMainLayout>{children}</MPMIMainLayout>
              </SidebarProvider>
            </SnackbarProvider>
          </UserProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
