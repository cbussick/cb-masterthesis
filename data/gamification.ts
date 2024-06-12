import { CBExerciseDifficulty } from "./exercises/CBExerciseDifficulty";

export const pointsToAddForSequenceCompletion: Record<
  CBExerciseDifficulty,
  number
> = {
  [CBExerciseDifficulty.Easy]: 10,
  [CBExerciseDifficulty.Medium]: 20,
  [CBExerciseDifficulty.Hard]: 30,
};

export interface CBLevel {
  level: number;
  description: string;
  // Should be there for all levels except the last one
  pointsToNextLevel?: number;
}

export const levels: CBLevel[] = [
  {
    level: 1,
    description: "Du bist auf dem Weg Zellenexperte zu werden",
    pointsToNextLevel: 2,
  },
  {
    level: 2,
    description: "Du bist Zellenexperte",
    pointsToNextLevel: 100,
  },
  {
    level: 3,
    description: "Du bist Zellteilungsexperte",
    pointsToNextLevel: 200,
  },
  {
    level: 4,
    description: "Du bist DNA-Struktur-Experte",
  },
];
