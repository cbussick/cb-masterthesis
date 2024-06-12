import { MPMIGlossaryEntry } from "../MPMIGlossaryEntries";

export interface CBGlossaryDrawerProps {
  selectedEntry: MPMIGlossaryEntry | null;
  handleCloseEntryDrawer: () => void;
}
