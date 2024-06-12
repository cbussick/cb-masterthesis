import { CBGlossaryEntry } from "../CBGlossaryEntries";

export interface CBGlossarySearchBarProps {
  onSearch: (searchTerm: string) => void;
  glossaryEntries: CBGlossaryEntry[];
}
