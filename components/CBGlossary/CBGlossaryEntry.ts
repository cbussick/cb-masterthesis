import { CBTopic } from "@/data/topics";

export interface CBGlossaryEntry {
  id: string;
  term: string;
  definition: string;
  image?: string;
  unlockLevel: number;
  topic: CBTopic;
}
