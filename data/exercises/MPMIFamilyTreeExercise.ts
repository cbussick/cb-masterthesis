import { MPMIFamilyTreePairGender } from "@/components/MPMIFamilyTree/MPMIFamilyTreeNode/MPMIFamilyTreeNodeInterfaces";
import { MPMITopic } from "../topics";
import { MPMIExerciseDifficulty } from "./MPMIExerciseDifficulty";
import { MPMIExerciseType } from "./MPMIExerciseType";
import { MPMIExerciseWithTypeAndTopic } from "./MPMIExerciseWithType";

export enum MPMIErbgang {
  AutosomalRezessiv = "autosomal-rezessiv",
  AutosomalDominant = "autosomal-dominant",
  XChromosomalRezessiv = "x-chromosomal-rezessiv",
  XChromosomalDominant = "x-chromosomal-dominant",
}

export const MPMIErbgangRules: Record<MPMIErbgang, (text: string) => boolean> =
  {
    [MPMIErbgang.AutosomalRezessiv]: (text) => text === "aa",
    [MPMIErbgang.AutosomalDominant]: (text) => text.includes("A"),
    [MPMIErbgang.XChromosomalRezessiv]: (text) => text === "aa",
    [MPMIErbgang.XChromosomalDominant]: (text) => text.includes("A"),
  };

export interface MPMIFamilyTreeExerciseNode {
  id: number;
  gender: MPMIFamilyTreePairGender;
  spouse?: Pick<MPMIFamilyTreeExerciseNode, "id" | "gender" | "solution">;
  children?: number[];
  solution: string;
}

export interface MPMIFamilyTreeExercise extends MPMIExerciseWithTypeAndTopic {
  id: string;
  affectedRule: MPMIErbgang;
  choices: string[];
  nodes: MPMIFamilyTreeExerciseNode[];
  hint: string;
  difficulty: MPMIExerciseDifficulty;
  description: string;
}

export const familyTreeExercises: MPMIFamilyTreeExercise[] = [
  {
    id: "family-tree-1",
    difficulty: MPMIExerciseDifficulty.Easy,
    type: MPMIExerciseType.FamilyTree,
    topic: MPMITopic.AufbauDNA,
    affectedRule: MPMIErbgang.AutosomalRezessiv,
    choices: ["AA", "Aa", "aa", "XaXa", "XAXa", "XaXA", "XAXA"],
    description:
      "Das ist der Stammbaum einer Familie mit einer autosomal-rezessiv vererbten Erkrankung. Bestimme die Genotypen aller Individuen.",
    hint:
      'Dominante Vererbung: Ein Merkmal ist dominant vererbt, wenn eine Kopie des dominanten Gens ausreicht, um das Merkmal auszudrücken, z. B. "A" für dominant und "a" für rezessiv.\n\n' +
      "Rezessive Vererbung: Ein Merkmal ist rezessiv vererbt, wenn zwei Kopien des rezessiven Gens notwendig sind, damit das Merkmal zum Ausdruck kommt.\n\n" +
      "Geschlechtsgebundene Vererbung: Ein Merkmal ist geschlechtsgebunden, wenn es auf einem Geschlechtschromosom (X oder Y) lokalisiert ist und seine Expression von der Geschlechtszugehörigkeit abhängt.\n\n" +
      'Genotypen: "AA" zeigt einen homozygot dominanten Genotypen, "Aa" zeigt einen heterozygoten Genotypen und "aa" zeigt einen homozygot rezessiven Genotypen.',
    nodes: [
      {
        id: 1,
        gender: MPMIFamilyTreePairGender.Male,
        spouse: {
          id: 2,
          gender: MPMIFamilyTreePairGender.Female,
          solution: "Aa",
        },
        children: [3, 4, 5],
        solution: "AA",
      },
      { id: 3, gender: MPMIFamilyTreePairGender.Male, solution: "Aa" },
      { id: 4, gender: MPMIFamilyTreePairGender.Female, solution: "Aa" },
      {
        id: 5,
        gender: MPMIFamilyTreePairGender.Female,
        spouse: {
          id: 6,
          gender: MPMIFamilyTreePairGender.Male,
          solution: "aa",
        },
        children: [9],
        solution: "AA",
      },
      // {
      //   id: 7,
      //   gender: MPMIFamilyTreePairGender.Male,
      //   spouse: {
      //     id: 8,
      //     gender: MPMIFamilyTreePairGender.Female,
      //     solution: "Aa",
      //   },
      //   children: [10],
      //   solution: "Aa",
      // },
      {
        id: 9,
        gender: MPMIFamilyTreePairGender.Male,
        // spouse: {
        //   id: 10,
        //   gender: MPMIFamilyTreePairGender.Female,
        //   solution: "aa",
        // },
        // children: [11],
        solution: "Aa",
      },
      // {
      //   id: 11,
      //   gender: MPMIFamilyTreePairGender.Female,
      //   solution: "aa",
      // },
    ],
  },
  {
    id: "family-tree-2",
    difficulty: MPMIExerciseDifficulty.Easy,
    type: MPMIExerciseType.FamilyTree,
    topic: MPMITopic.AufbauDNA,
    affectedRule: MPMIErbgang.AutosomalDominant,
    choices: ["AA", "Aa", "aa", "AA/Aa", "XaXa", "XAXa", "XaXA", "XAXA"],
    description:
      "Das ist der Stammbaum einer Familie mit einer autosomal-dominant vererbten Erkrankung. Bestimme die Genotypen aller Individuen.",
    hint:
      'Dominante Vererbung: Ein Merkmal ist dominant vererbt, wenn eine Kopie des dominanten Gens ausreicht, um das Merkmal auszudrücken, z. B. "A" für dominant und "a" für rezessiv.\n\n' +
      "Rezessive Vererbung: Ein Merkmal ist rezessiv vererbt, wenn zwei Kopien des rezessiven Gens notwendig sind, damit das Merkmal zum Ausdruck kommt.\n\n" +
      "Geschlechtsgebundene Vererbung: Ein Merkmal ist geschlechtsgebunden, wenn es auf einem Geschlechtschromosom (X oder Y) lokalisiert ist und seine Expression von der Geschlechtszugehörigkeit abhängt.\n\n" +
      'Genotypen: "AA" zeigt einen homozygot dominanten Genotypen, "Aa" zeigt einen heterozygoten Genotypen und "aa" zeigt einen homozygot rezessiven Genotypen.',
    nodes: [
      {
        id: 1,
        gender: MPMIFamilyTreePairGender.Male,
        spouse: {
          id: 2,
          gender: MPMIFamilyTreePairGender.Female,
          solution: "Aa",
        },
        children: [4, 5, 6],
        solution: "Aa",
      },
      {
        id: 3,
        gender: MPMIFamilyTreePairGender.Female,
        spouse: {
          id: 4,
          gender: MPMIFamilyTreePairGender.Male,
          solution: "Aa",
        },
        children: [8],
        solution: "aa",
      },
      {
        id: 5,
        gender: MPMIFamilyTreePairGender.Male,
        solution: "aa",
      },
      {
        id: 6,
        gender: MPMIFamilyTreePairGender.Female,
        spouse: {
          id: 7,
          gender: MPMIFamilyTreePairGender.Male,
          solution: "aa",
        },
        children: [9, 10],
        solution: "AA/Aa",
      },
      {
        id: 8,
        gender: MPMIFamilyTreePairGender.Female,
        solution: "aa",
      },
      { id: 9, gender: MPMIFamilyTreePairGender.Male, solution: "Aa" },
      { id: 10, gender: MPMIFamilyTreePairGender.Male, solution: "Aa" },
    ],
  },
  {
    id: "family-tree-3",
    difficulty: MPMIExerciseDifficulty.Easy,
    type: MPMIExerciseType.FamilyTree,
    topic: MPMITopic.AufbauDNA,
    affectedRule: MPMIErbgang.AutosomalDominant,
    choices: ["AA", "Aa", "aa", "AA/Aa", "XaXa", "XAXa", "XaXA", "XAXA"],
    description:
      "Das ist der Stammbaum einer Familie mit einer autosomal-dominant vererbten Erkrankung. Bestimme die Genotypen aller Individuen.",
    hint:
      'Dominante Vererbung: Ein Merkmal ist dominant vererbt, wenn eine Kopie des dominanten Gens ausreicht, um das Merkmal auszudrücken, z. B. "A" für dominant und "a" für rezessiv.\n\n' +
      "Rezessive Vererbung: Ein Merkmal ist rezessiv vererbt, wenn zwei Kopien des rezessiven Gens notwendig sind, damit das Merkmal zum Ausdruck kommt.\n\n" +
      "Geschlechtsgebundene Vererbung: Ein Merkmal ist geschlechtsgebunden, wenn es auf einem Geschlechtschromosom (X oder Y) lokalisiert ist und seine Expression von der Geschlechtszugehörigkeit abhängt.\n\n" +
      'Genotypen: "AA" zeigt einen homozygot dominanten Genotypen, "Aa" zeigt einen heterozygoten Genotypen und "aa" zeigt einen homozygot rezessiven Genotypen.',
    nodes: [
      {
        id: 1,
        gender: MPMIFamilyTreePairGender.Male,
        spouse: {
          id: 2,
          gender: MPMIFamilyTreePairGender.Female,
          solution: "Aa",
        },
        children: [4, 5, 7],
        solution: "Aa",
      },
      {
        id: 3,
        gender: MPMIFamilyTreePairGender.Male,
        spouse: {
          id: 4,
          gender: MPMIFamilyTreePairGender.Female,
          solution: "Aa",
        },
        children: [9, 10, 11],
        solution: "aa",
      },
      {
        id: 5,
        gender: MPMIFamilyTreePairGender.Female,
        spouse: {
          id: 6,
          gender: MPMIFamilyTreePairGender.Male,
          solution: "aa",
        },
        children: [12],
        solution: "aa",
      },
      {
        id: 7,
        gender: MPMIFamilyTreePairGender.Male,
        spouse: {
          id: 8,
          gender: MPMIFamilyTreePairGender.Female,
          solution: "aa",
        },
        children: [13, 14],
        solution: "AA/Aa",
      },
      {
        id: 9,
        gender: MPMIFamilyTreePairGender.Female,
        solution: "aa",
      },
      { id: 10, gender: MPMIFamilyTreePairGender.Male, solution: "Aa" },
      { id: 11, gender: MPMIFamilyTreePairGender.Female, solution: "Aa" },
      { id: 12, gender: MPMIFamilyTreePairGender.Female, solution: "aa" },
      { id: 13, gender: MPMIFamilyTreePairGender.Female, solution: "Aa" },
      { id: 14, gender: MPMIFamilyTreePairGender.Male, solution: "Aa" },
    ],
  },
  {
    id: "family-tree-4",
    difficulty: MPMIExerciseDifficulty.Hard,
    type: MPMIExerciseType.FamilyTree,
    topic: MPMITopic.AufbauDNA,
    affectedRule: MPMIErbgang.AutosomalRezessiv,
    choices: ["AA", "Aa", "aa", "AA/Aa", "XaXa", "XAXa", "XaXA", "XAXA"],
    description:
      "Bestimme die Genotypen aller Personen in diesem Stammbaum und gebe den Erbgang an.",
    hint:
      'Dominante Vererbung: Ein Merkmal ist dominant vererbt, wenn eine Kopie des dominanten Gens ausreicht, um das Merkmal auszudrücken, z. B. "A" für dominant und "a" für rezessiv.\n\n' +
      "Rezessive Vererbung: Ein Merkmal ist rezessiv vererbt, wenn zwei Kopien des rezessiven Gens notwendig sind, damit das Merkmal zum Ausdruck kommt.\n\n" +
      "Geschlechtsgebundene Vererbung: Ein Merkmal ist geschlechtsgebunden, wenn es auf einem Geschlechtschromosom (X oder Y) lokalisiert ist und seine Expression von der Geschlechtszugehörigkeit abhängt.\n\n" +
      'Genotypen: "AA" zeigt einen homozygot dominanten Genotypen, "Aa" zeigt einen heterozygoten Genotypen und "aa" zeigt einen homozygot rezessiven Genotypen.',
    nodes: [
      {
        id: 1,
        gender: MPMIFamilyTreePairGender.Male,
        spouse: {
          id: 2,
          gender: MPMIFamilyTreePairGender.Female,
          solution: "aa",
        },
        children: [4, 5, 6],
        solution: "AA/Aa",
      },
      {
        id: 3,
        gender: MPMIFamilyTreePairGender.Male,
        spouse: {
          id: 4,
          gender: MPMIFamilyTreePairGender.Female,
          solution: "Aa",
        },
        children: [8, 9, 10],
        solution: "Aa",
      },
      {
        id: 5,
        gender: MPMIFamilyTreePairGender.Female,
        solution: "Aa",
      },
      {
        id: 6,
        gender: MPMIFamilyTreePairGender.Male,
        spouse: {
          id: 7,
          gender: MPMIFamilyTreePairGender.Female,
          solution: "AA",
        },
        children: [11, 12],
        solution: "Aa",
      },
      {
        id: 8,
        gender: MPMIFamilyTreePairGender.Female,
        solution: "AA/Aa",
      },
      { id: 9, gender: MPMIFamilyTreePairGender.Male, solution: "aa" },
      { id: 10, gender: MPMIFamilyTreePairGender.Female, solution: "AA/Aa" },
      { id: 11, gender: MPMIFamilyTreePairGender.Female, solution: "AA/Aa" },
      { id: 12, gender: MPMIFamilyTreePairGender.Female, solution: "AA/Aa" },
    ],
  },
];
