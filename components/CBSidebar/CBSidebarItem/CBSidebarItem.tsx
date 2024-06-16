"use client";

import { CBRoute } from "@/helpers/routes";
import { useSidebar } from "@/ui/useSidebar";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  alpha,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CBSidebarItemProps } from "./CBSidebarItemInterfaces";

export const CBSidebarItem = ({
  listItemButtonProps,
  icon,
  label,
  isToolTipActive,
}: CBSidebarItemProps): JSX.Element => {
  const { isOpen } = useSidebar();
  const pathname = usePathname();

  let isActive = false;

  if (pathname.includes(CBRoute.Themenwelt)) {
    isActive = listItemButtonProps.href === CBRoute.Themenwelt;
  } else if (pathname.includes(CBRoute.FreieUebung)) {
    isActive = listItemButtonProps.href === CBRoute.FreieUebung;
  } else {
    isActive = listItemButtonProps.href === pathname;
  }

  const item: JSX.Element = (
    <ListItem
      disablePadding
      sx={{
        overflowX: "hidden",
        color: isActive ? (t) => t.palette.grey[900] : undefined,
        bgcolor: isActive
          ? (t) => alpha(t.palette.primary.main, 0.2)
          : undefined,
        borderRadius: 2,
      }}
    >
      <ListItemButton {...listItemButtonProps} LinkComponent={Link}>
        <ListItemIcon
          sx={{ color: isActive ? (t) => t.palette.grey[700] : undefined }}
        >
          {icon}
        </ListItemIcon>

        <ListItemText
          primary={label}
          sx={{
            whiteSpace: "nowrap",
            overflowX: "hidden",
            opacity: isOpen ? 1 : 0,
            transition: "opacity 0.2s ease-in-out",
          }}
        />
      </ListItemButton>
    </ListItem>
  );

  return isToolTipActive ? (
    <Tooltip title={label} placement="right">
      {item}
    </Tooltip>
  ) : (
    item
  );
};
