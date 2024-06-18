"use client";

import { menuItems } from "@/data/menuItems";
import { useUser } from "@/firebase/useUser";
import { handleSignOut } from "@/helpers/handleSignOut";
import {
  layoutHorizontalSpacing,
  layoutVerticalSpacing,
} from "@/helpers/layoutSpacing";
import { CBRoute } from "@/helpers/routes";
import { themeSpacingFactor } from "@/theme/theme";
import { useSidebar } from "@/ui/useSidebar";
import { useSnackbar } from "@/ui/useSnackbar";
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  LogoutRounded,
} from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Collapse,
  Divider,
  List,
  ListProps,
  Stack,
  collapseClasses,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { CBLogo } from "../CBLogo/CBLogo";
import { CBSidebarProps } from "./CBSidebarInterfaces";
import { CBSidebarItem } from "./CBSidebarItem/CBSidebarItem";

const logoTextElementID = "text";
const sidebarPaddingHorizontal = 2.8;
const itemsLeftPadding = 2;

const commonListProps: ListProps = {
  sx: {
    width: "100%",
  },
  disablePadding: true,
};

/**
 * The sidebar on the left side of the app.
 */
export const CBSidebar = ({
  sidebarWidthOpen,
  sidebarWidthClosed,
}: CBSidebarProps): JSX.Element => {
  const theme = useTheme();
  const user = useUser();
  const { isOpen, toggleIsOpen } = useSidebar();
  const { showSnackbar } = useSnackbar();

  const [isTransitionRunning, setTransitionRunning] = useState<boolean>(false);

  const settingsRouteData = menuItems.find(
    (item) => item.href === CBRoute.Einstellungen,
  );

  return (
    <Collapse
      orientation="horizontal"
      collapsedSize={sidebarWidthClosed}
      in={isOpen}
      onEnter={() => {
        setTransitionRunning(true);
      }}
      onEntered={() => {
        setTransitionRunning(false);
      }}
      onExit={() => {
        setTransitionRunning(true);
      }}
      onExited={() => {
        setTransitionRunning(false);
      }}
      sx={{
        position: "absolute",
        top: (t) => t.spacing(layoutVerticalSpacing),
        bottom: (t) => t.spacing(layoutVerticalSpacing),
        left: (t) => t.spacing(layoutHorizontalSpacing),
        zIndex: 999,
        bgcolor: (t) => t.palette.background.default,
        borderRadius: 5,
        boxShadow: (t) => t.shadows[8],
        [`& .${collapseClasses.wrapperInner}`]: {
          width: "100%",
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          pt: 3,
          pb: 5,
        }}
      >
        <Stack
          sx={{
            height: "100%",
            justifyContent: "space-between",
            pt: 3,
            px: sidebarPaddingHorizontal,
          }}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "flex-start",
            }}
          >
            <Box
              sx={{
                width: "100%",
                [`& #${logoTextElementID}`]: {
                  opacity: isOpen ? 1 : 0,
                  transition: "opacity 0.2s ease-in-out",
                },
              }}
            >
              <Link
                href="/"
                style={{
                  width: "100%",
                }}
              >
                <CBLogo
                  textElementID={logoTextElementID}
                  style={{
                    width:
                      sidebarWidthOpen -
                      sidebarPaddingHorizontal * themeSpacingFactor * 2 -
                      itemsLeftPadding * themeSpacingFactor,
                    paddingLeft: theme.spacing(itemsLeftPadding),
                  }}
                />
              </Link>
            </Box>

            <List {...commonListProps}>
              <CBSidebarItem
                listItemButtonProps={{ onClick: toggleIsOpen }}
                icon={
                  isOpen ? (
                    <KeyboardDoubleArrowLeft />
                  ) : (
                    <KeyboardDoubleArrowRight />
                  )
                }
                label={isOpen ? "Einklappen" : "Ausklappen"}
                isExpansionTransitionRunning={isTransitionRunning}
              />
            </List>

            <Divider sx={{ mx: 4, width: "100%" }} />

            {user ? (
              <List {...commonListProps}>
                {menuItems.reduce<JSX.Element[]>((acc, item) => {
                  if (
                    item.forRoles.includes(user?.customData.role) &&
                    item.href !== CBRoute.Einstellungen
                  ) {
                    acc.push(
                      <CBSidebarItem
                        key={item.label}
                        listItemButtonProps={{ href: item.href }}
                        icon={item.icon}
                        label={item.label}
                        isExpansionTransitionRunning={isTransitionRunning}
                      />,
                    );
                  }
                  return acc;
                }, [])}
              </List>
            ) : (
              <CircularProgress />
            )}
          </Stack>

          <List {...commonListProps}>
            {settingsRouteData && (
              <CBSidebarItem
                listItemButtonProps={{
                  href: settingsRouteData.href,
                }}
                icon={settingsRouteData.icon}
                label={settingsRouteData.label}
                isExpansionTransitionRunning={isTransitionRunning}
              />
            )}

            <CBSidebarItem
              listItemButtonProps={{
                onClick: () => handleSignOut(showSnackbar),
              }}
              icon={<LogoutRounded />}
              label="Abmelden"
              isExpansionTransitionRunning={isTransitionRunning}
            />
          </List>
        </Stack>
      </Box>
    </Collapse>
  );
};
