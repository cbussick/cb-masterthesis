import { MPMIGlossaryEntry } from "./MPMIGlossaryEntries";

export interface MPMIGlossaryEntriesListProps {
  // Die freigeschalteten Glossar-Einträge eines Users
  filteredEntries: MPMIGlossaryEntry[];
  isSearching: boolean;
  filteredLetters: string[];
}
