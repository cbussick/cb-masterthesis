import { useUser } from "@/firebase-client/useUser";
import { CBUserRole } from "@/firebase-client/userRole";
import {
  Box,
  ButtonBase,
  ButtonBaseProps,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CBAvatar } from "../CBAvatar/CBAvatar";
import { CBEmoji } from "../CBEmoji/CBEmoji";
import { CBUserOptionsMenu } from "../CBUserOptionsMenu/CBUserOptionsMenu";

const userMenuIconId = "user-menu-icon";
const userMenuId = "user-menu";
const avatarSize = 50;
export const CBWelcomeBanner = (): JSX.Element => {
  const user = useUser();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const isUserMenuOpen = Boolean(anchorEl);

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };
  const handleAvatarClick: ButtonBaseProps["onClick"] = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <ButtonBase
          onClick={handleAvatarClick}
          sx={{ borderRadius: "50%", height: "fit-content" }}
        >
          <CBAvatar
            image={{ src: user.customData.profilePicture, alt: "Profilbild" }}
            imageSize={avatarSize}
          />
        </ButtonBase>

        <Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="h2">
              {`Hallo, ${user.customData.username}`}
            </Typography>

            <CBEmoji emoji="🌱" typographyVariant="h2" />
          </Stack>

          {user.customData.role === CBUserRole.Student && (
            <Typography variant="h4">Lass uns lernen!</Typography>
          )}
        </Stack>

        <Box>
          <CBUserOptionsMenu
            userMenuId={userMenuId}
            anchorElId={userMenuIconId}
            anchorEl={anchorEl}
            isUserMenuOpen={isUserMenuOpen}
            onClose={handleUserMenuClose}
          />
        </Box>
      </Stack>
    </Box>
  );
};
