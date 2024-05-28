import { MPMIImgWithAlt } from "@/helpers/MPMIImgWithAlt";

export enum MPMITopic {
  Zelle = "zelle",
  MitoseMeiose = "mitose-meiose",
  AufbauDNA = "aufbau-dna",
  DNAReplikation = "dna-replikation",
  Proteinbiosynthese = "proteinbiosynthese",
  Mutation = "mutationen",
}

export interface MPMITopicData {
  name: string;
  icon: MPMIImgWithAlt;
}

export const topics: Record<MPMITopic, MPMITopicData> = {
  [MPMITopic.Zelle]: {
    name: "Tierische und pflanzliche Zelle",
    icon: { src: "/topic-world/zelle-bildicon.png", alt: "Zelle" },
  },
  [MPMITopic.MitoseMeiose]: {
    name: "Mitose und Meiose",
    icon: {
      src: "/topic-world/mitose-meiose-bildicon.png",
      alt: "Mitose und Meiose",
    },
  },
  [MPMITopic.AufbauDNA]: {
    name: "Aufbau der DNA",
    icon: { src: "/topic-world/dna-bildicon.png", alt: "DNA" },
  },
  [MPMITopic.DNAReplikation]: {
    name: "DNA-Replikation",
    icon: { src: "emoji-svgs/2753.svg", alt: "DNA-Replikation" },
  },
  [MPMITopic.Proteinbiosynthese]: {
    name: "Proteinbiosynthese",
    icon: { src: "emoji-svgs/2753.svg", alt: "Proteinbiosynthese" },
  },
  [MPMITopic.Mutation]: {
    name: "(Gen-)Mutationen",
    icon: { src: "emoji-svgs/2753.svg", alt: "(Gen-)Mutationen" },
  },
};
