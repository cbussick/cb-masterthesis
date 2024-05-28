import { MPMIExerciseDifficulty } from "./exercises/MPMIExerciseDifficulty";

export const pointsToAddForSequenceCompletion: Record<
  MPMIExerciseDifficulty,
  number
> = {
  [MPMIExerciseDifficulty.Easy]: 10,
  [MPMIExerciseDifficulty.Medium]: 20,
  [MPMIExerciseDifficulty.Hard]: 30,
};

export interface MPMILevel {
  level: number;
  description: string;
  pointsToNextLevel?: number;
}

export const levels: MPMILevel[] = [
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
    // pointsToNextLevel: 500,
  },
];
