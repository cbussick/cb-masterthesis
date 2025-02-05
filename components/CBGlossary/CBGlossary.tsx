"use client";

import { glossaryEntries } from "@/data/glossaryEntries";
import { useUser } from "@/firebase-client/useUser";
import { alphabet } from "@/helpers/alphabet";
import { Stack } from "@mui/material";
import { useState } from "react";
import { CBGlossaryEntriesList } from "./CBGlossaryEntriesList/CBGlossaryEntriesList";
import { CBGlossaryEntry } from "./CBGlossaryEntry";
import { CBGlossarySearchbar } from "./CBGlossarySearchBar/CBGlossarySearchBar";

export const CBGlossary = (): JSX.Element => {
  const user = useUser();

  const { unlockedGlossaryEntryIDs } = user.customData;

  // const unlockedGlossaryEntries = glossaryEntries.filter((entry) => {
  //   return unlockedGlossaryEntryIDs.includes(entry.id);
  // });

  const unlockedGlossaryEntries = glossaryEntries;

  const [filteredGlossaryEntries, setFilteredGlossaryEntries] = useState<
    CBGlossaryEntry[]
  >(unlockedGlossaryEntries);
  const [isSearching, setSearching] = useState<boolean>(false);
  const [firstLetters, setFirstLetters] = useState<string[]>([]);

  const handleSearch = (searchTerm: string) => {
    const searching = searchTerm !== "";
    setSearching(searching);

    const filteredLetters: string[] = [];
    setFilteredGlossaryEntries(
      unlockedGlossaryEntries.filter((entry) => {
        const isIncluded = entry.term
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const firstLetter = entry.term.charAt(0);

        if (isIncluded && filteredLetters.indexOf(firstLetter) === -1) {
          filteredLetters.push(firstLetter);
        }
        return isIncluded;
      }),
    );
    setFirstLetters(searching ? filteredLetters : alphabet);
  };

  return (
    <Stack spacing={1} sx={{ flex: "1", minHeight: 0 }}>
      <CBGlossarySearchbar
        onSearch={handleSearch}
        glossaryEntries={filteredGlossaryEntries}
      />

      <CBGlossaryEntriesList
        filteredEntries={filteredGlossaryEntries}
        isSearching={isSearching}
        filteredLetters={firstLetters}
      />
    </Stack>
  );
};
