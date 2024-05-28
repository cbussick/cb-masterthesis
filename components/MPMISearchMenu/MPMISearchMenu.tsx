"use client";

import { useUser } from "@/firebase/useUser";
import { routeMap } from "@/helpers/routes";
import { Search } from "@mui/icons-material";
import { Divider, List, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { MPMIDialog } from "../MPMIDialog/MPMIDialog";
import { MPMISearchResult } from "../MPMISearchResult/MPMISearchResult";
import { MPMISearchMenuProps } from "./MPMISearchMenuInterfaces";

export const MPMISearchMenu = ({
  isMenuOpen,
  onClose,
}: MPMISearchMenuProps): JSX.Element => {
  const user = useUser();

  const [searchTerm, setSearchTerm] = useState<string>("");

  const searchResults = user
    ? Object.entries(routeMap).filter(
        ([, value]) =>
          value.title?.toLowerCase().includes(searchTerm.toLowerCase()) &&
          value.forRoles.includes(user?.customData.role),
      )
    : [];

  return (
    <MPMIDialog isOpen={isMenuOpen} onClose={onClose}>
      <Stack height={350} width="100%">
        <TextField
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          label="Suche"
          placeholder="Gib deinen Suchbegriff ein"
          fullWidth
          InputProps={{
            endAdornment: (
              <Search
                sx={{
                  color: (t) => t.palette.grey[700],
                  pointerEvents: "none",
                }}
              />
            ),
          }}
        />

        <List sx={{ overflowY: "auto" }}>
          {searchResults.map((s, index) => (
            <React.Fragment key={s[0]}>
              {index !== 0 && <Divider />}

              <MPMISearchResult routeData={s[1]} onClose={onClose} />
            </React.Fragment>
          ))}
        </List>
      </Stack>
    </MPMIDialog>
  );
};
