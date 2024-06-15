"use client";

import { levels } from "@/data/gamification";
import { profilePictures } from "@/data/profilePictures";
import { getAuthError } from "@/firebase/authErrors";
import { changeProfilePicture } from "@/firebase/changeProfilePicture";
import { useUser } from "@/firebase/useUser";
import { useSnackbar } from "@/ui/useSnackbar";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { CBProfilePicture } from "./CBProfileImageSelectorInterfaces";

const currentAvatarSize = 150;
const avatarChoiceSize = 110;

export const CBProfileImageSelector = (): JSX.Element => {
  const user = useUser();
  const { showSnackbar } = useSnackbar();

  const [profilePicture, setProfilePicture] = useState<string>(
    user?.customData.profilePicture || "",
  );

  const userPoints = user?.customData.points || 0;
  const currentLevel =
    levels.find(
      (l) => l.pointsToNextLevel && l.pointsToNextLevel > userPoints,
    ) || levels[levels.length - 1];

  const isUnlocked = (image: CBProfilePicture) => {
    return currentLevel.level >= image.unlockLevel;
  };

  const handleSaveButtonClickProfilePic = () => {
    if (user?.user) {
      changeProfilePicture(user.user.uid, profilePicture)
        .then(() => {
          showSnackbar(
            "Profilbild geändert",
            "Du hast dein Profilbild erfolgreich geändert.",
            "success",
          );
        })
        .catch((error: FirebaseError) => {
          const errorMessage = getAuthError(error.code) || error.message;

          showSnackbar(
            "Profilbild konnte nicht geändert werden",
            errorMessage,
            "error",
          );
        });
    }
  };

  return (
    <Stack spacing={2}>
      <Stack
        spacing={2}
        sx={{
          alignItems: "center",
        }}
      >
        <Avatar
          alt="Profilbild"
          src={profilePicture}
          sx={{
            border: 8,
            borderColor: (t) => t.palette.primary.light,
            boxShadow: 3,
            width: currentAvatarSize,
            height: currentAvatarSize,
          }}
        />

        <Button
          onClick={handleSaveButtonClickProfilePic}
          disabled={user?.customData.profilePicture === profilePicture}
        >
          Speichern
        </Button>
      </Stack>

      <Stack>
        <Typography
          sx={{
            mb: 2,
          }}
        >
          Wähle einen Avatar aus
        </Typography>

        <Grid container spacing={2}>
          {profilePictures.map((image) => (
            <Grid key={image.src}>
              <Button
                disabled={!isUnlocked(image)}
                onClick={() => setProfilePicture(image.src)}
                sx={{
                  bgcolor: (t) => t.palette.background.default,
                  "&:hover": {
                    backgroundColor: (t) => t.palette.background.default,
                  },
                  borderRadius: "50%",
                  p: 0.75,
                }}
              >
                <Avatar
                  alt={`Profilbild: ${image}`}
                  src={isUnlocked(image) ? image.src : image.srcLocked}
                  sx={{
                    width: avatarChoiceSize,
                    height: avatarChoiceSize,
                    borderRadius: "50%",
                  }}
                />
              </Button>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
};
