import { useUser } from "@/firebase/useUser";
import { MPMIUserRole } from "@/firebase/userRole";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { MPMIEmoji } from "../MPMIEmoji/MPMIEmoji";
import { MPMIUserOptionsMenu } from "../MPMIUserOptionsMenu/MPMIUserOptionsMenu";

const userMenuIconId = "user-menu-icon";
const userMenuId = "user-menu";
const avatarSize = 50;
export const MPMIWelcomeBanner = (): JSX.Element => {
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

            <MPMIEmoji emoji="🌱" typographyVariant="h2" />
          </Stack>

          {user?.customData.role === MPMIUserRole.Student && (
            <Typography variant="h4">Lass uns lernen!</Typography>
          )}
        </Stack>

        <Box>
          <MPMIUserOptionsMenu
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
