/* eslint-disable no-nested-ternary */

import { alphabet } from "@/helpers/alphabet";
import { CBRoute } from "@/helpers/routes";
import { LockRounded } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { CBEmoji } from "../../CBEmoji/CBEmoji";
import { CBLink } from "../../CBLink/CBLink";
import { CBUnstyledNextLink } from "../../CBUnstyledNextLink/CBUnstyledNextLink";
import { CBGlossaryDrawer } from "../CBGlossaryDrawer/CBGlossaryDrawer";
import { CBGlossaryEntry, glossaryEntries } from "../CBGlossaryEntries";
import { CBGlossaryEntriesListProps } from "./CBGlossaryEntriesListInterfaces";

const scrollToLetter = (letter: string) => {
  const element = document.getElementById(letter);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
    });
  }
};

export const CBGlossaryEntriesList = ({
  filteredEntries,
  isSearching,
  filteredLetters,
}: CBGlossaryEntriesListProps): JSX.Element => {
  const [selectedEntry, setSelectedEntry] = useState<CBGlossaryEntry | null>(
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

  const handleOpenEntryDrawer = (entry: CBGlossaryEntry) => {
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
      <Stack
        sx={{
          minHeight: 0,
          flex: 1,
        }}
      >
        {noSearchResults ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Stack
              spacing={1}
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CBEmoji emoji="🔍" typographyVariant="h1" />

              <Typography variant="h4">
                Leider wurden keine Suchergebnisse gefunden.
              </Typography>
            </Stack>
          </Box>
        ) : (
          <>
            <Stack direction="row">
              {filteredAlphabet.map((letter, index) => (
                <Stack
                  key={letter}
                  direction="row"
                  sx={{
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      color: (t) => t.palette.grey[800],
                      px: 1.2,
                    }}
                  >
                    <CBUnstyledNextLink
                      href={`#${letter}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToLetter(letter);
                      }}
                    >
                      {letter}
                    </CBUnstyledNextLink>
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
                      sx={{
                        color: (t) => t.palette.grey[700],
                        pt: 4,
                      }}
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
                              spacing={2}
                              sx={{
                                alignItems: "center",
                                p: 2,
                              }}
                            >
                              <LockRounded
                                sx={{
                                  color: (t) => t.palette.grey[700],
                                }}
                              />

                              <Stack direction="row" spacing={1}>
                                <Typography>
                                  {`Schalte Level ${entry.unlockLevel} in der `}

                                  <CBLink
                                    href={CBRoute.Themenwelt}
                                    style={{
                                      fontWeight: "medium",
                                    }}
                                  >
                                    Themenwelt
                                  </CBLink>

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
