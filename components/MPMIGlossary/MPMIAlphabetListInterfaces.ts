import { MPMIGlossaryEntry } from "./MPMIGlossaryEntries";

export interface MPMIAlphabetListProps {
  // Die freigeschalteten Glossar-Einträge eines Users
  filteredEntries: MPMIGlossaryEntry[];
  isSearching: boolean;
  filteredLetters: string[];
}
