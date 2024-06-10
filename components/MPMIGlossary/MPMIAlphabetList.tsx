/* eslint-disable no-nested-ternary */

import { alphabet } from "@/helpers/alphabet";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { MPMILink } from "../MPMILink/MPMILink";
import { MPMIUnstyledNextLink } from "../MPMIUnstyledNextLink/MPMIUnstyledNextLink";
import { MPMIAlphabetListProps } from "./MPMIAlphabetListInterfaces";
import { MPMIGlossaryEntry, glossaryEntries } from "./MPMIGlossaryEntries";

const scrollToLetter = (letter: string) => {
  const element = document.getElementById(letter);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
    });
  }
};

export const MPMIAlphabetList = ({
  filteredEntries,
  isSearching,
  filteredLetters,
}: MPMIAlphabetListProps): JSX.Element => {
  const theme = useTheme();
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
    <Box>
      {noSearchResults ? (
        <Typography>Leider wurden keine Suchergebnisse gefunden!</Typography>
      ) : (
        <>
          <Stack direction="row">
            {filteredAlphabet.map((letter, index) => (
              <Stack key={letter} direction="row" alignItems="center">
                <Typography
                  variant="h4"
                  color={theme.palette.grey[800]}
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

                {index < filteredAlphabet.length - 1 && <span> | </span>}
              </Stack>
            ))}
          </Stack>

          <Box sx={{ overflowY: "auto", maxHeight: "60vh" }}>
            {filteredAlphabet.map((letter) => {
              const filteredLetterEntries = filteredGlossaryEntries(letter);
              const hasSearchResults =
                isSearching &&
                filteredLetterEntries.some((entry) =>
                  filteredEntries.includes(entry),
                );

              return (
                <Box key={letter}>
                  {!isSearching && (
                    <>
                      <Typography
                        id={letter}
                        variant="h2"
                        sx={{
                          color: theme.palette.grey[700],
                          pt: 20,
                          pb: 10,
                        }}
                      >
                        {letter}
                      </Typography>

                      <Divider />
                    </>
                  )}

                  {hasSearchResults && (
                    <>
                      <Typography
                        variant="h2"
                        sx={{
                          color: theme.palette.grey[700],
                          pt: 20,
                          pb: 10,
                        }}
                      >
                        {letter}
                      </Typography>

                      <Divider />
                    </>
                  )}

                  {filteredLetterEntries.map((entry) => (
                    <Box key={entry.term}>
                      {filteredEntries.includes(entry) ? (
                        <Box>
                          <Button
                            sx={{
                              zIndex: 0,
                              color: theme.palette.grey[800],
                              fontSize: theme.typography.h3.fontSize,
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
                              style={{
                                color: theme.palette.grey[700],
                              }}
                            />

                            <Stack direction="row" spacing={1}>
                              <Typography>
                                Schalte Level {entry.unlockLevel} in der
                              </Typography>

                              <MPMILink
                                href="/themenwelt"
                                style={{
                                  fontWeight: "medium",
                                }}
                              >
                                Themenwelt
                              </MPMILink>

                              <Typography> frei</Typography>
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

      <Drawer
        anchor="right"
        open={!!selectedEntry}
        onClose={handleCloseEntryDrawer}
        PaperProps={{
          sx: {
            width: "33.33%",
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
          },
        }}
      >
        <Stack spacing={2} p={4}>
          <Typography variant="h2">{selectedEntry?.term}</Typography>

          <Typography pt={1}>{selectedEntry?.definition}</Typography>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={5}
            width="100%"
            minHeight={250}
            position="relative"
          >
            {selectedEntry?.image && (
              <Image
                src={selectedEntry.image}
                alt={selectedEntry.term}
                fill
                style={{ objectFit: "contain" }}
              />
            )}
          </Box>

          <Button
            onClick={handleCloseEntryDrawer}
            sx={{ right: 50, bottom: 50, position: "fixed" }}
          >
            Schließen
          </Button>
        </Stack>
      </Drawer>
    </Box>
  );
};
