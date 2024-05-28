import { MPMIGlossaryEntry } from "./MPMIGlossaryEntries";

export interface MPMIGlossarySearchBarProps {
  onSearch: (searchTerm: string) => void;
  glossaryEntries: MPMIGlossaryEntry[];
}
