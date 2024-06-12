import { useUser } from "@/firebase/useUser";
import { CBUserRole } from "@/firebase/userRole";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
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
  const handleAvatarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <Box>
          <Avatar
            src={user?.customData.profilePicture}
            alt="Profilbild"
            onClick={handleAvatarClick}
            sx={{ width: avatarSize, height: avatarSize, cursor: "pointer" }}
          />
        </Box>

        <Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="h2">
              {`Hallo, ${user?.customData.username}`}
            </Typography>

            <CBEmoji emoji="🌱" typographyVariant="h2" />
          </Stack>

          {user?.customData.role === CBUserRole.Student && (
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
