import { CBTopic } from "@/data/topics";

export interface CBGlossaryEntry {
  id: string;
  term: string;
  definition: string;
  image?: string;
  image1x1?: string;
  unlockLevel: number;
  topic: CBTopic;
}
