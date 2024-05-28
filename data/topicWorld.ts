import { MPMIImgWithAlt } from "@/helpers/MPMIImgWithAlt";
import { MPMIExercise } from "./exercises/MPMIExercise";
import { MPMIExerciseDifficulty } from "./exercises/MPMIExerciseDifficulty";
import { quizExercises } from "./exercises/MPMIQuizExercise";
import { swiperExercises } from "./exercises/MPMISwiperExercise";
import { MPMITopic, MPMITopicData, topics } from "./topics";

/**
 * Represents a single unit of a topic.
 * E.g.: Topic: "Tierische und pflanzliche Zellen" -> TopicUnit: "Grundlagen".
 */
export interface MPMITopicWorldUnit {
  id: string;
  name: string;
  difficulty: MPMIExerciseDifficulty;
  exercises: MPMIExercise[];
  icon: MPMIImgWithAlt;
}

/**
 * Represents the data of a topic.
 * E.g.: "Tierische und pflanzliche Zellen".
 */
export interface MPMITopicWorldTopicData {
  topicData: MPMITopicData;
  units: MPMITopicWorldUnit[];
}

export const zelleUnits: MPMITopicWorldUnit[] = [
  {
    id: "zelle-grundlagen",
    name: "Grundlagen",
    difficulty: MPMIExerciseDifficulty.Easy,
    exercises: quizExercises
      .filter((exercise) => exercise.topic === MPMITopic.Zelle)
      .slice(0, 10),
    icon: {
      src: "/topic-world/grundlagen.png",
      alt: "Grundlagen, pflanze klein",
    },
  },
  {
    id: "zelle-weiterfuehrendes",
    name: "Weiterführendes",
    difficulty: MPMIExerciseDifficulty.Medium,
    exercises: swiperExercises.slice(0, 12),
    icon: {
      src: "/topic-world/weiterfuehrendes.png",
      alt: "Weiterführendes, Pflanze mittel groß",
    },
  },
  {
    id: "zelle-expertise",
    name: "Expertise",
    difficulty: MPMIExerciseDifficulty.Hard,
    exercises: quizExercises
      .filter((exercise) => exercise.topic === MPMITopic.Zelle)
      .slice(11, 22),
    icon: { src: "/topic-world/expertise.png", alt: "Expertise, Pflanze groß" },
  },
];
export const mitoseUnits: MPMITopicWorldUnit[] = [
  {
    id: "mitose-grundlagen",
    name: "Grundlagen",
    difficulty: MPMIExerciseDifficulty.Easy,
    exercises: quizExercises
      .filter((exercise) => exercise.topic === MPMITopic.MitoseMeiose)
      .slice(0, 3),
    icon: {
      src: "/topic-world/grundlagen.png",
      alt: "Grundlagen, pflanze klein",
    },
  },
  {
    id: "mitose-weiterfuehrendes",
    name: "Weiterführendes",
    difficulty: MPMIExerciseDifficulty.Medium,
    exercises: quizExercises
      .filter((exercise) => exercise.topic === MPMITopic.MitoseMeiose)
      .slice(4, 7),
    icon: {
      src: "/topic-world/weiterfuehrendes.png",
      alt: "Weiterführendes, Pflanze mittel groß",
    },
  },
  {
    id: "mitose-expertise",
    name: "Expertise",
    difficulty: MPMIExerciseDifficulty.Hard,
    exercises: quizExercises
      .filter((exercise) => exercise.topic === MPMITopic.MitoseMeiose)
      .slice(8, 10),
    icon: { src: "/topic-world/expertise.png", alt: "Expertise, Pflanze groß" },
  },
];

export const aufbauDNAUnits: MPMITopicWorldUnit[] = [
  {
    id: "aufbau-dna-grundlagen",
    name: "Grundlagen",
    difficulty: MPMIExerciseDifficulty.Easy,
    exercises: quizExercises
      .filter((exercise) => exercise.topic === MPMITopic.AufbauDNA)
      .slice(0, 8),
    icon: {
      src: "/topic-world/grundlagen.png",
      alt: "Grundlagen, Pflanze klein",
    },
  },
  {
    id: "aufbau-dna-weiterfuehrendes",
    name: "Weiterführendes",
    difficulty: MPMIExerciseDifficulty.Medium,
    exercises: quizExercises
      .filter((exercise) => exercise.topic === MPMITopic.AufbauDNA)
      .slice(9, 17),
    icon: {
      src: "/topic-world/weiterfuehrendes.png",
      alt: "Weiterführendes, Pflanze mittel groß",
    },
  },
  {
    id: "aufbau-dna-expertise",
    name: "Expertise",
    difficulty: MPMIExerciseDifficulty.Hard,
    exercises: quizExercises
      .filter((exercise) => exercise.topic === MPMITopic.AufbauDNA)
      .slice(18, 24),
    icon: { src: "/topic-world/expertise.png", alt: "Expertise, Pflanze groß" },
  },
];
export const dnaReplikationUnits: MPMITopicWorldUnit[] = [];
export const proteinbiosyntheseUnits: MPMITopicWorldUnit[] = [];
export const mutationUnits: MPMITopicWorldUnit[] = [];

export const topicWorldTopics: Record<MPMITopic, MPMITopicWorldTopicData> = {
  [MPMITopic.Zelle]: { topicData: topics[MPMITopic.Zelle], units: zelleUnits },
  [MPMITopic.MitoseMeiose]: {
    topicData: topics[MPMITopic.MitoseMeiose],
    units: mitoseUnits,
  },
  [MPMITopic.AufbauDNA]: {
    topicData: topics[MPMITopic.AufbauDNA],
    units: aufbauDNAUnits,
  },
  [MPMITopic.DNAReplikation]: {
    topicData: topics[MPMITopic.DNAReplikation],
    units: dnaReplikationUnits,
  },
  [MPMITopic.Proteinbiosynthese]: {
    topicData: topics[MPMITopic.Proteinbiosynthese],
    units: proteinbiosyntheseUnits,
  },
  [MPMITopic.Mutation]: {
    topicData: topics[MPMITopic.Mutation],
    units: mutationUnits,
  },
};
