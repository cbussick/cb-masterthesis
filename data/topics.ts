import { CBImgWithAlt } from "@/helpers/CBImgWithAlt";

export enum CBTopic {
  Zelle = "zelle",
  MitoseMeiose = "mitose-meiose",
  AufbauDNA = "aufbau-dna",
  DNAReplikation = "dna-replikation",
  Proteinbiosynthese = "proteinbiosynthese",
  Mutation = "mutationen",
}

export interface CBTopicData {
  name: string;
  icon: CBImgWithAlt;
}

export const topics: Record<CBTopic, CBTopicData> = {
  [CBTopic.Zelle]: {
    name: "Tierische und pflanzliche Zelle",
    icon: { src: "/topic-world/zelle-transparent.png", alt: "Zelle" },
  },
  [CBTopic.MitoseMeiose]: {
    name: "Mitose und Meiose",
    icon: {
      src: "/topic-world/mitose-meiose-transparent.png",
      alt: "Mitose und Meiose",
    },
  },
  [CBTopic.AufbauDNA]: {
    name: "Aufbau der DNA",
    icon: { src: "/topic-world/dna-transparent.png", alt: "DNA" },
  },
  [CBTopic.DNAReplikation]: {
    name: "DNA-Replikation",
    icon: { src: "emoji-svgs/2753.svg", alt: "DNA-Replikation" },
  },
  [CBTopic.Proteinbiosynthese]: {
    name: "Proteinbiosynthese",
    icon: { src: "emoji-svgs/2753.svg", alt: "Proteinbiosynthese" },
  },
  [CBTopic.Mutation]: {
    name: "(Gen-)Mutationen",
    icon: { src: "emoji-svgs/2753.svg", alt: "(Gen-)Mutationen" },
  },
};
