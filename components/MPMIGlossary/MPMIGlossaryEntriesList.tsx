/* eslint-disable no-nested-ternary */

import { alphabet } from "@/helpers/alphabet";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { MPMIEmoji } from "../MPMIEmoji/MPMIEmoji";
import { MPMILink } from "../MPMILink/MPMILink";
import { MPMIUnstyledNextLink } from "../MPMIUnstyledNextLink/MPMIUnstyledNextLink";
import { CBGlossaryDrawer } from "./CBGlossaryDrawer/CBGlossaryDrawer";
import { MPMIGlossaryEntry, glossaryEntries } from "./MPMIGlossaryEntries";
import { MPMIGlossaryEntriesListProps } from "./MPMIGlossaryEntriesListInterfaces";

const scrollToLetter = (letter: string) => {
  const element = document.getElementById(letter);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
    });
  }
};

export const MPMIGlossaryEntriesList = ({
  filteredEntries,
  isSearching,
  filteredLetters,
}: MPMIGlossaryEntriesListProps): JSX.Element => {
  const [selectedEntry, setSelectedEntry] = useState<MPMIGlossaryEntry | null>(
    null,
  );

  const filteredAlphabet =
    filteredLetters.length > 0
      ? filteredLetters
      : alphabet.filter((letter) =>
          glossaryEntries.some(
            (entry) => entry.term.charAt(0).toUpperCase() === letter,
          ),
        );

  const handleOpenEntryDrawer = (entry: MPMIGlossaryEntry) => {
    setSelectedEntry(entry);
  };

  const handleCloseEntryDrawer = () => {
    setSelectedEntry(null);
  };

  const filteredGlossaryEntries = (letter: string) =>
    glossaryEntries.filter(
      (entry) => entry.term.charAt(0).toUpperCase() === letter,
    );

  const noSearchResults = isSearching && filteredEntries.length === 0;

  return (
    <>
      <Stack minHeight={0} flex="1">
        {noSearchResults ? (
          <Box display="flex" justifyContent="flex-start">
            <Stack justifyContent="center" alignItems="center" spacing={1}>
              <MPMIEmoji emoji="🔍" typographyVariant="h1" />

              <Typography variant="h4">
                Leider wurden keine Suchergebnisse gefunden.
              </Typography>
            </Stack>
          </Box>
        ) : (
          <>
            <Stack direction="row">
              {filteredAlphabet.map((letter, index) => (
                <Stack key={letter} direction="row" alignItems="center">
                  <Typography
                    variant="h4"
                    color={(t) => t.palette.grey[800]}
                    px={1.2}
                  >
                    <MPMIUnstyledNextLink
                      href={`#${letter}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToLetter(letter);
                      }}
                    >
                      {letter}
                    </MPMIUnstyledNextLink>
                  </Typography>

                  {index < filteredAlphabet.length - 1 && "|"}
                </Stack>
              ))}
            </Stack>

            <Box sx={{ overflowY: "auto" }}>
              {filteredAlphabet.map((letter) => {
                const filteredLetterEntries = filteredGlossaryEntries(letter);

                return (
                  <Box key={letter}>
                    <Typography
                      id={letter}
                      variant="h2"
                      color={(t) => t.palette.grey[700]}
                      pt={4}
                    >
                      {letter}
                    </Typography>

                    <Divider />

                    {filteredLetterEntries.map((entry) => (
                      <Box key={entry.term}>
                        {filteredEntries.includes(entry) ? (
                          <Box>
                            <Button
                              sx={{
                                zIndex: 0,
                                color: (t) => t.palette.grey[800],
                                fontSize: (t) => t.typography.h3.fontSize,
                                pl: 2,
                                pt: 1.5,
                                pb: 1.5,
                              }}
                              variant="text"
                              onClick={() => handleOpenEntryDrawer(entry)}
                            >
                              {entry.term}
                            </Button>

                            <Divider />
                          </Box>
                        ) : isSearching ? (
                          ""
                        ) : (
                          <>
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                              p={2}
                            >
                              <LockRoundedIcon
                                sx={{
                                  color: (t) => t.palette.grey[700],
                                }}
                              />

                              <Stack direction="row" spacing={1}>
                                <Typography>
                                  {`Schalte Level ${entry.unlockLevel} in der `}

                                  <MPMILink
                                    href="/themenwelt"
                                    style={{
                                      fontWeight: "medium",
                                    }}
                                  >
                                    Themenwelt
                                  </MPMILink>

                                  {` frei`}
                                </Typography>
                              </Stack>
                            </Stack>

                            <Divider />
                          </>
                        )}
                      </Box>
                    ))}
                  </Box>
                );
              })}
            </Box>
          </>
        )}
      </Stack>

      <CBGlossaryDrawer
        selectedEntry={selectedEntry}
        handleCloseEntryDrawer={handleCloseEntryDrawer}
      />
    </>
  );
};
