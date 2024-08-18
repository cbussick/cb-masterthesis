import { CBImgWithAlt } from "@/helpers/CBImgWithAlt";
import { CBExercise } from "./exercises/CBExercise";
import { CBExerciseDifficulty } from "./exercises/CBExerciseDifficulty";
import { quizExercises } from "./exercises/CBQuizExercise";
import { swiperExercises } from "./exercises/CBSwiperExercise";
import { CBTopic, CBTopicData, topics } from "./topics";

/**
 * Represents a single unit of a topic.
 * E.g.: Topic: "Tierische und pflanzliche Zellen" -> TopicUnit: "Grundlagen".
 */
export interface CBTopicWorldUnit {
  id: string;
  name: string;
  difficulty: CBExerciseDifficulty;
  exercises: CBExercise[];
  icon: CBImgWithAlt;
}

/**
 * Represents the data of a topic.
 * E.g.: "Tierische und pflanzliche Zellen".
 */
export interface CBTopicWorldTopicData {
  topicData: CBTopicData;
  units: CBTopicWorldUnit[];
}

export const zelleUnits: CBTopicWorldUnit[] = [
  {
    id: "zelle-grundlagen",
    name: "Grundlagen",
    difficulty: CBExerciseDifficulty.Easy,
    exercises: quizExercises
      .filter((exercise) => exercise.topic === CBTopic.Zelle)
      .slice(0, 10),
    icon: {
      src: "/topic-world/small-plant.png",
      alt: "Grundlagen, pflanze klein",
    },
  },
  {
    id: "zelle-weiterfuehrendes",
    name: "Weiterführendes",
    difficulty: CBExerciseDifficulty.Medium,
    exercises: swiperExercises.slice(0, 12),
    icon: {
      src: "/topic-world/medium-plant.png",
      alt: "Weiterführendes, Pflanze mittel groß",
    },
  },
  {
    id: "zelle-expertise",
    name: "Expertise",
    difficulty: CBExerciseDifficulty.Hard,
    exercises: quizExercises
      .filter((exercise) => exercise.topic === CBTopic.Zelle)
      .slice(11, 22),
    icon: { src: "/topic-world/big-plant.png", alt: "Expertise, Pflanze groß" },
  },
];
export const mitoseUnits: CBTopicWorldUnit[] = [
  {
    id: "mitose-grundlagen",
    name: "Grundlagen",
    difficulty: CBExerciseDifficulty.Easy,
    exercises: quizExercises
      .filter((exercise) => exercise.topic === CBTopic.MitoseMeiose)
      .slice(0, 3),
    icon: {
      src: "/topic-world/small-plant.png",
      alt: "Grundlagen, pflanze klein",
    },
  },
  {
    id: "mitose-weiterfuehrendes",
    name: "Weiterführendes",
    difficulty: CBExerciseDifficulty.Medium,
    exercises: quizExercises
      .filter((exercise) => exercise.topic === CBTopic.MitoseMeiose)
      .slice(4, 7),
    icon: {
      src: "/topic-world/medium-plant.png",
      alt: "Weiterführendes, Pflanze mittel groß",
    },
  },
  {
    id: "mitose-expertise",
    name: "Expertise",
    difficulty: CBExerciseDifficulty.Hard,
    exercises: quizExercises
      .filter((exercise) => exercise.topic === CBTopic.MitoseMeiose)
      .slice(8, 10),
    icon: { src: "/topic-world/big-plant.png", alt: "Expertise, Pflanze groß" },
  },
];

export const aufbauDNAUnits: CBTopicWorldUnit[] = [
  {
    id: "aufbau-dna-grundlagen",
    name: "Grundlagen",
    difficulty: CBExerciseDifficulty.Easy,
    exercises: quizExercises
      .filter((exercise) => exercise.topic === CBTopic.AufbauDNA)
      .slice(0, 8),
    icon: {
      src: "/topic-world/small-plant.png",
      alt: "Grundlagen, Pflanze klein",
    },
  },
  {
    id: "aufbau-dna-weiterfuehrendes",
    name: "Weiterführendes",
    difficulty: CBExerciseDifficulty.Medium,
    exercises: quizExercises
      .filter((exercise) => exercise.topic === CBTopic.AufbauDNA)
      .slice(9, 17),
    icon: {
      src: "/topic-world/medium-plant.png",
      alt: "Weiterführendes, Pflanze mittel groß",
    },
  },
  {
    id: "aufbau-dna-expertise",
    name: "Expertise",
    difficulty: CBExerciseDifficulty.Hard,
    exercises: quizExercises
      .filter((exercise) => exercise.topic === CBTopic.AufbauDNA)
      .slice(18, 24),
    icon: { src: "/topic-world/big-plant.png", alt: "Expertise, Pflanze groß" },
  },
];
export const dnaReplikationUnits: CBTopicWorldUnit[] = [];
export const proteinbiosyntheseUnits: CBTopicWorldUnit[] = [];
export const mutationUnits: CBTopicWorldUnit[] = [];

export const topicWorldTopics: Record<CBTopic, CBTopicWorldTopicData> = {
  [CBTopic.Zelle]: {
    topicData: topics[CBTopic.Zelle],
    units: zelleUnits,
  },
  [CBTopic.MitoseMeiose]: {
    topicData: topics[CBTopic.MitoseMeiose],
    units: mitoseUnits,
  },
  [CBTopic.AufbauDNA]: {
    topicData: topics[CBTopic.AufbauDNA],
    units: aufbauDNAUnits,
  },
  [CBTopic.DNAReplikation]: {
    topicData: topics[CBTopic.DNAReplikation],
    units: dnaReplikationUnits,
  },
  [CBTopic.Proteinbiosynthese]: {
    topicData: topics[CBTopic.Proteinbiosynthese],
    units: proteinbiosyntheseUnits,
  },
  [CBTopic.Mutation]: {
    topicData: topics[CBTopic.Mutation],
    units: mutationUnits,
  },
};
