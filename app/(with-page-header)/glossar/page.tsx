"use client";

import { MPMIAlphabetList } from "@/components/MPMIGlossary/MPMIAlphabetList";
import {
  MPMIGlossaryEntry,
  glossaryEntries,
} from "@/components/MPMIGlossary/MPMIGlossaryEntries";
import { MPMIGlossarySearchbar } from "@/components/MPMIGlossary/MPMIGlossarySearchBar";
import { useUser } from "@/firebase/useUser";
import { alphabet } from "@/helpers/alphabet";
import { Box } from "@mui/material";
import { useState } from "react";

export default function Glossary() {
  const user = useUser();

  const unlockedGlossaryEntryIds =
    user?.customData.unlockedGlossaryEntryIDs || [];

  const unlockedGlossaryEntries = glossaryEntries.filter((entry) => {
    return unlockedGlossaryEntryIds.includes(entry.id);
  });

  const [filteredGlossaryEntries, setFilteredGlossaryEntries] = useState<
    MPMIGlossaryEntry[]
  >(unlockedGlossaryEntries);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [firstLetters, setFirstLetters] = useState<string[]>([]);

  const handleSearch = (searchTerm: string) => {
    const searching = searchTerm !== "";
    setIsSearching(searching);

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
    <Box>
      <MPMIGlossarySearchbar
        onSearch={handleSearch}
        glossaryEntries={filteredGlossaryEntries}
      />

      <MPMIAlphabetList
        filteredEntries={filteredGlossaryEntries}
        isSearching={isSearching}
        filteredLetters={firstLetters}
      />
    </Box>
  );
}
