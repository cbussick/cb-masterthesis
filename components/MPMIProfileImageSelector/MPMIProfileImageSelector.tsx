"use client";

import { levels } from "@/data/gamification";
import { profilePictures } from "@/data/profilePictures";
import { useUser } from "@/firebase/useUser";
import { Avatar, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {
  MPMIProfileImageSelectorProps,
  MPMIProfilePicture,
} from "./MPMIProfileImageSelectorInterfaces";

export const MPMIProfileImageSelector = ({
  onSelect,
}: MPMIProfileImageSelectorProps): JSX.Element => {
  const user = useUser();
  const userPoints = user?.customData.points || 0;
  const currentLevel =
    levels.find(
      (l) => l.pointsToNextLevel && l.pointsToNextLevel > userPoints,
    ) || levels[levels.length - 1];

  const checkIsLvlUnlocked = (image: MPMIProfilePicture) => {
    return currentLevel.level >= image.unlockLevel;
  };

  return (
    <Grid container spacing={2}>
      {profilePictures.map((image) => (
        <Grid key={image.src}>
          <Button
            disabled={!checkIsLvlUnlocked(image)}
            onClick={() => onSelect(image.src)}
            sx={{
              backgroundColor: "transparent",
              "&:hover": { backgroundColor: "transparent" },
              borderRadius: "50%",
              width: 110,
              height: 110,
            }}
          >
            <Avatar
              alt={`Profilbild: ${image}`}
              src={checkIsLvlUnlocked(image) ? image.src : image.srcLocked}
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
              }}
            />
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};
