import { CBImgWithAlt } from "@/helpers/CBImgWithAlt";

export interface CBAchievement {
  id: string;
  name: string;
  description: string;
  img: CBImgWithAlt;
  progressGoal: number;
  achievementType: CBAchievementType;
}

export enum CBAchievementType {
  Exercise = "exercise",
  TopicWorld = "topic-world",
  Glossary = "glossary",
  Exam = "exam",
  CellSwiper = "cell-swiper",
}

export enum CBTopicWorldAchievement {
  Zelle = "achievement-zelle",
  MitoseMeiose = "achievement-mitose-meiose",
  DNA = "achievement-dna",
}

export const achievements: CBAchievement[] = [
  {
    id: CBTopicWorldAchievement.Zelle,
    name: "Zellenexperte",
    description: "Schließe Themenwelt “Pflanzliche & tierische Zellen” ab.",
    img: { src: "/achievement/badge-5.png", alt: "Badge - Zellenexperte" },
    progressGoal: 1,
    achievementType: CBAchievementType.TopicWorld,
  },
  {
    id: CBTopicWorldAchievement.MitoseMeiose,
    name: "Zellteilungsexperte",
    description: "Schließe Themenwelt “Mitose & Meiose” ab.",
    img: {
      src: "/achievement/badge-6.png",
      alt: "Badge - Zellteilungsexperte",
    },
    progressGoal: 1,
    achievementType: CBAchievementType.TopicWorld,
  },
  {
    id: CBTopicWorldAchievement.DNA,
    name: "DNA-Struktur-Experte",
    description: "Schließe Themenwelt “Aufbau der DNA” ab.",
    img: {
      src: "/achievement/badge-7.png",
      alt: "Badge - DNA-Struktur-Experte",
    },
    progressGoal: 1,
    achievementType: CBAchievementType.TopicWorld,
  },
  {
    id: "exercise-1",
    name: "Willkommen im Labor",
    description: "Schließe deine erste freie Übung ab.",
    img: { src: "/achievement/badge-1.png", alt: "Badge - Willkommen" },
    progressGoal: 1,
    achievementType: CBAchievementType.Exercise,
  },
  {
    id: "exercise-2",
    name: "Labor-Assistent",
    description: "Schließe 10 freie Übungen ab.",
    img: { src: "/achievement/badge-2.png", alt: "Badge - Labor Assistent" },
    progressGoal: 10,
    achievementType: CBAchievementType.Exercise,
  },
  {
    id: "exercise-3",
    name: "Labor-Profi",
    description: "Schließe 25 freie Übungen ab.",
    img: { src: "/achievement/badge-3.png", alt: "Badge - Labor Profi" },
    progressGoal: 25,
    achievementType: CBAchievementType.Exercise,
  },
  {
    id: "exercise-4",
    name: "Labor-Experte",
    description: "Schließe 50 freie Übungen ab.",
    img: { src: "/achievement/badge-4.png", alt: "Badge - Labor Experte" },
    progressGoal: 50,
    achievementType: CBAchievementType.Exercise,
  },
  {
    id: "exam-1",
    name: "Eifriger Lerner",
    description: "Schließe deine erste Prüfungssimulation ab.",
    img: { src: "/achievement/badge-9.png", alt: "Badge - Eifriger Lerner" },
    progressGoal: 1,
    achievementType: CBAchievementType.Exam,
  },
  {
    id: "exam-2",
    name: "Lern-Profi",
    description: "Schließe 5 Prüfungssimulationen ab.",
    img: { src: "/achievement/badge-10.png", alt: "Badge - Lern Profi" },
    progressGoal: 5,
    achievementType: CBAchievementType.Exam,
  },
  {
    id: "exam-3",
    name: "Lernexperte",
    description: "Schließe 10 Prüfungssimulationen ab.",
    img: { src: "/achievement/badge-11.png", alt: "Badge - Lernexperte" },
    progressGoal: 10,
    achievementType: CBAchievementType.Exam,
  },
  {
    id: "glossary",
    name: "Laufendes Lexikon",
    description: "Schalte alle Begriffe im Glossar frei.",
    img: { src: "/achievement/badge-8.png", alt: "Badge - Laufendes Lexikon" },
    progressGoal: 67,
    achievementType: CBAchievementType.Glossary,
  },
];
