import { CBGlossaryEntry } from "../CBGlossaryEntry";

export interface CBGlossaryEntriesListProps {
  filteredEntries: CBGlossaryEntry[];
  isSearching: boolean;
  filteredLetters: string[];
}
