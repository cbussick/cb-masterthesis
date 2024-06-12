import { CBGlossaryEntry } from "../CBGlossaryEntries";

export interface CBGlossaryDrawerProps {
  selectedEntry: CBGlossaryEntry | null;
  handleCloseEntryDrawer: () => void;
}
