import { CBGlossaryEntry } from "../CBGlossaryEntry";

export interface CBGlossarySearchBarProps {
  onSearch: (searchTerm: string) => void;
  glossaryEntries: CBGlossaryEntry[];
}
