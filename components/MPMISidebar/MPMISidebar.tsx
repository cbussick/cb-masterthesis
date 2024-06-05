"use client";

import { menuItems } from "@/data/menuItems";
import { useUser } from "@/firebase/useUser";
import { handleSignOut } from "@/helpers/handleSignOut";
import {
  layoutHorizontalSpacing,
  layoutVerticalSpacing,
} from "@/helpers/layoutSpacing";
import { MPMIRoute } from "@/helpers/routes";
import { getSpacingFactor } from "@/theme/theme";
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
  Divider,
  List,
  Stack,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { MPMILogo } from "../MPMILogo/MPMILogo";
import { MPMISidebarProps } from "./MPMISidebarInterfaces";
import { MPMISidebarItem } from "./MPMISidebarItem/MPMISidebarItem";

const logoTextElementID = "text";
const sidebarPaddingHorizontal = 2.8;
const itemsLeftPadding = 2;

/**
 * The sidebar on the left side of the app.
 */
export const MPMISidebar = ({
  sidebarWidthOpen,
  sidebarWidthClosed,
}: MPMISidebarProps): JSX.Element => {
  const theme = useTheme();
  const { isOpen, toggleIsOpen } = useSidebar();
  const { showSnackbar } = useSnackbar();

  const user = useUser();

  const settingsRouteData = menuItems.find(
    (item) => item.href === MPMIRoute.Einstellungen,
  );

  return (
    <Box
      sx={{
        bgcolor: (t) => t.palette.background.default,
        width: isOpen ? sidebarWidthOpen : sidebarWidthClosed,
        transition: isOpen
          ? theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            })
          : theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        borderRadius: 5,
        overflowX: "hidden",
        overflowY: "auto",
        position: "absolute",
        top: theme.spacing(layoutVerticalSpacing),
        bottom: theme.spacing(layoutVerticalSpacing),
        left: theme.spacing(layoutHorizontalSpacing),
        pt: 3,
        pb: 5,
        zIndex: 999,
        boxShadow: theme.shadows[8],
      }}
    >
      <Stack
        height="100%"
        justifyContent="space-between"
        pt={3}
        px={sidebarPaddingHorizontal}
      >
        <Stack spacing={2} alignItems="flex-start">
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
              <MPMILogo
                textElementID={logoTextElementID}
                style={{
                  width:
                    sidebarWidthOpen -
                    sidebarPaddingHorizontal * getSpacingFactor() * 2 -
                    itemsLeftPadding * getSpacingFactor(),
                  paddingLeft: theme.spacing(itemsLeftPadding),
                }}
              />
            </Link>
          </Box>

          <List sx={{ width: "100%" }} disablePadding>
            <MPMISidebarItem
              listItemButtonProps={{ onClick: toggleIsOpen }}
              icon={
                isOpen ? (
                  <KeyboardDoubleArrowLeft />
                ) : (
                  <KeyboardDoubleArrowRight />
                )
              }
              label="Einklappen"
            />
          </List>

          <Divider sx={{ mx: 4, width: "100%" }} />

          {user ? (
            <List sx={{ width: "100%" }} disablePadding>
              {menuItems.reduce<JSX.Element[]>((acc, item) => {
                if (
                  item.forRoles.includes(user?.customData.role) &&
                  item.href !== MPMIRoute.Einstellungen
                ) {
                  acc.push(
                    <MPMISidebarItem
                      key={item.label}
                      listItemButtonProps={{ href: item.href }}
                      icon={item.icon}
                      label={item.label}
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

        <List sx={{ width: "100%" }} disablePadding>
          {settingsRouteData && (
            <MPMISidebarItem
              listItemButtonProps={{
                href: settingsRouteData.href,
              }}
              icon={settingsRouteData.icon}
              label={settingsRouteData.label}
            />
          )}

          <MPMISidebarItem
            listItemButtonProps={{
              onClick: () => handleSignOut(showSnackbar),
            }}
            icon={<LogoutRounded />}
            label="Abmelden"
          />
        </List>
      </Stack>
    </Box>
  );
};
