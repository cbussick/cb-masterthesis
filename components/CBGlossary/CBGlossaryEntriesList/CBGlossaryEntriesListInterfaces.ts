import { CBGlossaryEntry } from "../CBGlossaryEntries";

export interface CBGlossaryEntriesListProps {
  filteredEntries: CBGlossaryEntry[];
  isSearching: boolean;
  filteredLetters: string[];
}
