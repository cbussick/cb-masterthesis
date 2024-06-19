import { CBFamilyTreePairGender } from "@/components/exercises/CBFamilyTree/CBFamilyTreeNode/CBFamilyTreeNodeInterfaces";
import { CBTopic } from "../topics";
import { CBExerciseDifficulty } from "./CBExerciseDifficulty";
import { CBExerciseType } from "./CBExerciseType";
import { CBExerciseWithTypeAndTopic } from "./CBExerciseWithType";

const familyTreeHint =
  'Dominante Vererbung: Ein Merkmal ist dominant vererbt, wenn eine Kopie des dominanten Gens ausreicht, um das Merkmal auszudrücken, z. B. "A" für dominant und "a" für rezessiv.\n\n' +
  "Rezessive Vererbung: Ein Merkmal ist rezessiv vererbt, wenn zwei Kopien des rezessiven Gens notwendig sind, damit das Merkmal zum Ausdruck kommt.\n\n" +
  "Geschlechtsgebundene Vererbung: Ein Merkmal ist geschlechtsgebunden, wenn es auf einem Geschlechtschromosom (X oder Y) lokalisiert ist und seine Expression von der Geschlechtszugehörigkeit abhängt.\n\n" +
  'Genotypen: "AA" zeigt einen homozygot dominanten Genotypen, "Aa" zeigt einen heterozygoten Genotypen und "aa" zeigt einen homozygot rezessiven Genotypen.';

export enum CBErbgang {
  AutosomalRezessiv = "autosomal-rezessiv",
  AutosomalDominant = "autosomal-dominant",
  XChromosomalRezessiv = "x-chromosomal-rezessiv",
  XChromosomalDominant = "x-chromosomal-dominant",
}

export const CBErbgangRules: Record<CBErbgang, (text: string) => boolean> = {
  [CBErbgang.AutosomalRezessiv]: (text) => text === "aa",
  [CBErbgang.AutosomalDominant]: (text) => text.includes("A"),
  [CBErbgang.XChromosomalRezessiv]: (text) => text === "aa",
  [CBErbgang.XChromosomalDominant]: (text) => text.includes("A"),
};

export interface CBFamilyTreeExerciseNode {
  id: number;
  gender: CBFamilyTreePairGender;
  spouse?: Pick<CBFamilyTreeExerciseNode, "id" | "gender" | "solution">;
  children?: number[];
  solution: string;
}

export interface CBFamilyTreeExercise extends CBExerciseWithTypeAndTopic {
  id: string;
  affectedRule: CBErbgang;
  choices: string[];
  nodes: CBFamilyTreeExerciseNode[];
  hint: string;
  difficulty: CBExerciseDifficulty;
  description: string;
}

export const familyTreeExercises: CBFamilyTreeExercise[] = [
  {
    id: "family-tree-1",
    difficulty: CBExerciseDifficulty.Easy,
    type: CBExerciseType.FamilyTree,
    topic: CBTopic.AufbauDNA,
    affectedRule: CBErbgang.AutosomalRezessiv,
    choices: ["AA", "Aa", "aa", "XaXa", "XAXa", "XaXA", "XAXA"],
    description:
      "Das ist der Stammbaum einer Familie mit einer autosomal-rezessiv vererbten Erkrankung. Bestimme die Genotypen aller Individuen.",
    hint: familyTreeHint,
    nodes: [
      {
        id: 1,
        gender: CBFamilyTreePairGender.Male,
        spouse: {
          id: 2,
          gender: CBFamilyTreePairGender.Female,
          solution: "Aa",
        },
        children: [3, 4, 5],
        solution: "AA",
      },
      { id: 3, gender: CBFamilyTreePairGender.Male, solution: "Aa" },
      { id: 4, gender: CBFamilyTreePairGender.Female, solution: "Aa" },
      {
        id: 5,
        gender: CBFamilyTreePairGender.Female,
        spouse: {
          id: 6,
          gender: CBFamilyTreePairGender.Male,
          solution: "aa",
        },
        children: [9],
        solution: "AA",
      },
      // {
      //   id: 7,
      //   gender: CBFamilyTreePairGender.Male,
      //   spouse: {
      //     id: 8,
      //     gender: CBFamilyTreePairGender.Female,
      //     solution: "Aa",
      //   },
      //   children: [10],
      //   solution: "Aa",
      // },
      {
        id: 9,
        gender: CBFamilyTreePairGender.Male,
        // spouse: {
        //   id: 10,
        //   gender: CBFamilyTreePairGender.Female,
        //   solution: "aa",
        // },
        // children: [11],
        solution: "Aa",
      },
      // {
      //   id: 11,
      //   gender: CBFamilyTreePairGender.Female,
      //   solution: "aa",
      // },
    ],
  },
  {
    id: "family-tree-2",
    difficulty: CBExerciseDifficulty.Easy,
    type: CBExerciseType.FamilyTree,
    topic: CBTopic.AufbauDNA,
    affectedRule: CBErbgang.AutosomalDominant,
    choices: ["AA", "Aa", "aa", "AA/Aa", "XaXa", "XAXa", "XaXA", "XAXA"],
    description:
      "Das ist der Stammbaum einer Familie mit einer autosomal-dominant vererbten Erkrankung. Bestimme die Genotypen aller Individuen.",
    hint: familyTreeHint,
    nodes: [
      {
        id: 1,
        gender: CBFamilyTreePairGender.Male,
        spouse: {
          id: 2,
          gender: CBFamilyTreePairGender.Female,
          solution: "Aa",
        },
        children: [4, 5, 6],
        solution: "Aa",
      },
      {
        id: 3,
        gender: CBFamilyTreePairGender.Female,
        spouse: {
          id: 4,
          gender: CBFamilyTreePairGender.Male,
          solution: "Aa",
        },
        children: [8],
        solution: "aa",
      },
      {
        id: 5,
        gender: CBFamilyTreePairGender.Male,
        solution: "aa",
      },
      {
        id: 6,
        gender: CBFamilyTreePairGender.Female,
        spouse: {
          id: 7,
          gender: CBFamilyTreePairGender.Male,
          solution: "aa",
        },
        children: [9, 10],
        solution: "AA/Aa",
      },
      {
        id: 8,
        gender: CBFamilyTreePairGender.Female,
        solution: "aa",
      },
      { id: 9, gender: CBFamilyTreePairGender.Male, solution: "Aa" },
      { id: 10, gender: CBFamilyTreePairGender.Male, solution: "Aa" },
    ],
  },
  {
    id: "family-tree-3",
    difficulty: CBExerciseDifficulty.Easy,
    type: CBExerciseType.FamilyTree,
    topic: CBTopic.AufbauDNA,
    affectedRule: CBErbgang.AutosomalDominant,
    choices: ["AA", "Aa", "aa", "AA/Aa", "XaXa", "XAXa", "XaXA", "XAXA"],
    description:
      "Das ist der Stammbaum einer Familie mit einer autosomal-dominant vererbten Erkrankung. Bestimme die Genotypen aller Individuen.",
    hint: familyTreeHint,
    nodes: [
      {
        id: 1,
        gender: CBFamilyTreePairGender.Male,
        spouse: {
          id: 2,
          gender: CBFamilyTreePairGender.Female,
          solution: "Aa",
        },
        children: [4, 5, 7],
        solution: "Aa",
      },
      {
        id: 3,
        gender: CBFamilyTreePairGender.Male,
        spouse: {
          id: 4,
          gender: CBFamilyTreePairGender.Female,
          solution: "Aa",
        },
        children: [9, 10, 11],
        solution: "aa",
      },
      {
        id: 5,
        gender: CBFamilyTreePairGender.Female,
        spouse: {
          id: 6,
          gender: CBFamilyTreePairGender.Male,
          solution: "aa",
        },
        children: [12],
        solution: "aa",
      },
      {
        id: 7,
        gender: CBFamilyTreePairGender.Male,
        spouse: {
          id: 8,
          gender: CBFamilyTreePairGender.Female,
          solution: "aa",
        },
        children: [13, 14],
        solution: "AA/Aa",
      },
      {
        id: 9,
        gender: CBFamilyTreePairGender.Female,
        solution: "aa",
      },
      { id: 10, gender: CBFamilyTreePairGender.Male, solution: "Aa" },
      { id: 11, gender: CBFamilyTreePairGender.Female, solution: "Aa" },
      { id: 12, gender: CBFamilyTreePairGender.Female, solution: "aa" },
      { id: 13, gender: CBFamilyTreePairGender.Female, solution: "Aa" },
      { id: 14, gender: CBFamilyTreePairGender.Male, solution: "Aa" },
    ],
  },
  {
    id: "family-tree-4",
    difficulty: CBExerciseDifficulty.Hard,
    type: CBExerciseType.FamilyTree,
    topic: CBTopic.AufbauDNA,
    affectedRule: CBErbgang.AutosomalRezessiv,
    choices: ["AA", "Aa", "aa", "AA/Aa", "XaXa", "XAXa", "XaXA", "XAXA"],
    description:
      "Bestimme die Genotypen aller Personen in diesem Stammbaum und gebe den Erbgang an.",
    hint: familyTreeHint,
    nodes: [
      {
        id: 1,
        gender: CBFamilyTreePairGender.Male,
        spouse: {
          id: 2,
          gender: CBFamilyTreePairGender.Female,
          solution: "aa",
        },
        children: [4, 5, 6],
        solution: "AA/Aa",
      },
      {
        id: 3,
        gender: CBFamilyTreePairGender.Male,
        spouse: {
          id: 4,
          gender: CBFamilyTreePairGender.Female,
          solution: "Aa",
        },
        children: [8, 9, 10],
        solution: "Aa",
      },
      {
        id: 5,
        gender: CBFamilyTreePairGender.Female,
        solution: "Aa",
      },
      {
        id: 6,
        gender: CBFamilyTreePairGender.Male,
        spouse: {
          id: 7,
          gender: CBFamilyTreePairGender.Female,
          solution: "AA",
        },
        children: [11, 12],
        solution: "Aa",
      },
      {
        id: 8,
        gender: CBFamilyTreePairGender.Female,
        solution: "AA/Aa",
      },
      { id: 9, gender: CBFamilyTreePairGender.Male, solution: "aa" },
      { id: 10, gender: CBFamilyTreePairGender.Female, solution: "AA/Aa" },
      { id: 11, gender: CBFamilyTreePairGender.Female, solution: "AA/Aa" },
      { id: 12, gender: CBFamilyTreePairGender.Female, solution: "AA/Aa" },
    ],
  },
];
