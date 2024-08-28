import { CBGlossaryEntry } from "../CBGlossaryEntry";

export interface CBGlossaryDrawerProps {
  selectedEntry: CBGlossaryEntry | null;
  handleCloseEntryDrawer: () => void;
}
