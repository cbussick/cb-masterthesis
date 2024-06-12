// Todo: Ich glaube alle Y-Werte Minus 30 wenn ich es so lasse?

import {
  CBMatchingGameHighlightComponent,
  CBMatchingGameHighlightComponentSide,
} from "@/components/exercises/CBMatchingGame/CBMatchingGameHighlightComponent";
import { CBMatchingGameOption } from "@/components/exercises/CBMatchingGame/CBMatchingGameOption";
import { CBImgWithAlt } from "@/helpers/CBImgWithAlt";
import { CBTopic } from "../topics";
import { CBExerciseType } from "./CBExerciseType";
import { CBExerciseWithTypeAndTopic } from "./CBExerciseWithType";

export interface CBMatchingGameExercise extends CBExerciseWithTypeAndTopic {
  id: string;
  image: CBImgWithAlt;
  options: CBMatchingGameOption[];
  correctSelection: number[];
  highlightedComponents: CBMatchingGameHighlightComponent[];
  title: string;
  hint: string;
}

export const matchingGameExercises: CBMatchingGameExercise[] = [
  {
    id: "matching-game-1",
    type: CBExerciseType.MatchingGame,
    topic: CBTopic.AufbauDNA,
    image: {
      src: "/dna/basen.png",
      alt: "DNA Basen",
    },
    options: [
      { id: "1", name: "Cytosin" },
      { id: "2", name: "Adenin" },
      { id: "3", name: "Guanin" },
      { id: "4", name: "Thymin" },
    ],
    correctSelection: [3, 4, 1, 2],
    highlightedComponents: [
      {
        id: 0,
        name: "Guanin",
        pointer: { x: 250, y: 205 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
      {
        id: 1,
        name: "Thymin",
        pointer: { x: 250, y: 5 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
      {
        id: 2,
        name: "Cytosin",
        pointer: { x: 250, y: 188 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
      {
        id: 3,
        name: "Adenin",
        pointer: { x: 250, y: 20 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
    ],
    title: "Welche Basen sind hier gesucht?",
    hint: "Schaue dir die Basen genau an.",
  },
  {
    id: "matching-game-2",
    type: CBExerciseType.MatchingGame,
    topic: CBTopic.Zelle,
    image: {
      src: "/cell-organelles/Pflanzliche-Zelle-3.png",
      alt: "Zellorganellen: Endoplasmatisches Retikulum, Peroxisome, Mitochondrium, Vakuole",
    },
    options: [
      { id: "1", name: "Endoplasmatisches Retikulum" },
      { id: "2", name: "Peroxisome" },
      { id: "3", name: "Mitochondrium" },
      { id: "4", name: "Vakuole" },
    ],
    correctSelection: [4, 2, 1, 3],
    highlightedComponents: [
      {
        id: 0,
        name: "Vakuole",
        pointer: { x: 40, y: 15 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
      {
        id: 1,
        name: "Peroxisome",
        pointer: { x: 140, y: 90 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
      {
        id: 2,
        name: "Endoplasmatisches Retikulum",
        pointer: { x: 110, y: 52 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
      {
        id: 3,
        name: "Mitochondrium",
        pointer: { x: 80, y: 75 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
    ],
    title: "Ordne die Begriffe den entsprechenden Zellorganellen zu.",
    hint: "Benenne die einzelnen Bestandteile der gezeigten Zellen, in der angezeigten Reihenfolge.",
  },
  {
    id: "matching-game-3",
    type: CBExerciseType.MatchingGame,
    topic: CBTopic.Zelle,
    image: {
      src: "/cell-organelles/Pflanzliche-Zelle-3.png",
      alt: "Zellorganellen: Mitochrondrium, Lysosomen, Zellkern, Golgi-Apparat",
    },
    options: [
      { id: "1", name: "Mitochrondrium" },
      { id: "2", name: "Lysosomen" },
      { id: "3", name: "Zellkern" },
      { id: "4", name: "Golgi-Apparat" },
    ],
    correctSelection: [4, 1, 3, 2],
    highlightedComponents: [
      {
        id: 0,
        name: "Golgi-Apparat",
        pointer: { x: 10, y: 80 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
      {
        id: 1,
        name: "Mitochrondrium",
        pointer: { x: 80, y: 83 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
      {
        id: 2,
        name: "Zellkern",
        pointer: { x: 60, y: 40 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
      {
        id: 3,
        name: "Lysosomen",
        pointer: { x: 105, y: 49 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
    ],
    title: "Ordne die Begriffe den entsprechenden Zellorganellen zu.",
    hint: "Benenne die einzelnen Bestandteile der gezeigten Zellen, in der angezeigten Reihenfolge.",
  },
  {
    id: "matching-game-4",
    type: CBExerciseType.MatchingGame,
    topic: CBTopic.Zelle,
    image: {
      src: "/cell-organelles/Tierische-Zelle-2.png",
      alt: "Zellorganellen: Zellkern, Centriolen, Lysosomen, Golgi-Apparat",
    },
    options: [
      { id: "1", name: "Zellkern" },
      { id: "2", name: "Centriolen" },
      { id: "3", name: "Lysosomen" },
      { id: "4", name: "Golgi-Apparat" },
    ],
    correctSelection: [4, 3, 2, 1],
    highlightedComponents: [
      {
        id: 0,
        name: "Golgi-Apparat",
        pointer: { x: 100, y: 85 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
      {
        id: 1,
        name: "Lysosomen",
        pointer: { x: 25, y: 135 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
      {
        id: 2,
        name: "Centriolen",
        pointer: { x: 10, y: 140 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
      {
        id: 3,
        name: "Zellkern",
        pointer: { x: 40, y: 60 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
    ],
    title: "Ordne die Begriffe den entsprechenden Zellorganellen zu.",
    hint: "Benenne die einzelnen Bestandteile der gezeigten Zellen, in der angezeigten Reihenfolge.",
  },
  {
    id: "matching-game-5",
    type: CBExerciseType.MatchingGame,
    topic: CBTopic.Zelle,
    image: {
      src: "/cell-organelles/Tierische-Zelle-2.png",
      alt: "Zellorganellen: Mitochondrium, Endoplasmatisches Retikulum, Mikrotubuli, Peroxisome",
    },
    options: [
      { id: "1", name: "Mitochondrium" },
      { id: "2", name: "Endoplasmatisches Retikulum" },
      { id: "3", name: "Mikrotubuli" },
      { id: "4", name: "Peroxisome" },
    ],
    correctSelection: [2, 3, 4, 1],
    highlightedComponents: [
      {
        id: 0,
        name: "Endoplasmatisches Retikulum",
        pointer: { x: 70, y: 38 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
      {
        id: 1,
        name: "Mikrotubuli",
        pointer: { x: 70, y: 141 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
      {
        id: 2,
        name: "Peroxisome",
        pointer: { x: 135, y: 88 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
      {
        id: 3,
        name: "Mitochondrium",
        pointer: { x: 80, y: 133 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
    ],
    title: "Ordne die Begriffe den entsprechenden Zellorganellen zu.",
    hint: "Benenne die einzelnen Bestandteile der gezeigten Zellen, in der angezeigten Reihenfolge.",
  },
  {
    id: "matching-game-6",
    type: CBExerciseType.MatchingGame,
    topic: CBTopic.Zelle,
    image: {
      src: "/cell-organelles/Tierische-Zelle.png",
      alt: "Zellorganellen: Golgi-Apparat, Centriolen, Lysosomen, Mikrotubuli",
    },
    options: [
      { id: "1", name: "Golgi-Apparat" },
      { id: "2", name: "Centriolen" },
      { id: "3", name: "Lysosomen" },
      { id: "4", name: "Mikrotubuli" },
    ],
    correctSelection: [1, 3, 4, 2],
    highlightedComponents: [
      {
        id: 0,
        name: "Golgi-Apparat",
        pointer: { x: 90, y: 108 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
      {
        id: 1,
        name: "Lysosomen",
        pointer: { x: 90, y: 8 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
      {
        id: 2,
        name: "Mikrotubuli",
        pointer: { x: 100, y: 48 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
      {
        id: 3,
        name: "Centriolen",
        pointer: { x: 55, y: 133 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
    ],
    title: "Ordne die Begriffe den entsprechenden Zellorganellen zu.",
    hint: "Benenne die einzelnen Bestandteile der gezeigten Zellen, in der angezeigten Reihenfolge.",
  },
  {
    id: "matching-game-7",
    type: CBExerciseType.MatchingGame,
    topic: CBTopic.Zelle,
    image: {
      src: "/cell-organelles/Tierische-Zelle.png",
      alt: "Zellorganellen: Zellkern, Endoplasmatische Retikulum, Lysosomen, Mitochondrium",
    },
    options: [
      { id: "1", name: "Zellkern" },
      { id: "2", name: "Endoplasmatisches Retikulum" },
      { id: "3", name: "Lysosomen" },
      { id: "4", name: "Mitochondrium" },
    ],
    correctSelection: [4, 3, 1, 2],
    highlightedComponents: [
      {
        id: 0,
        name: "Mitochondirum",
        pointer: { x: 120, y: 98 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
      {
        id: 1,
        name: "Lysosomen",
        pointer: { x: 90, y: 8 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
      {
        id: 2,
        name: "Zellkern",
        pointer: { x: 0, y: 28 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
      {
        id: 3,
        name: "Endoplasmatisches Retikulum",
        pointer: { x: -8, y: 103 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
    ],
    title: "Ordne die Begriffe den entsprechenden Zellorganellen zu.",
    hint: "Benenne die einzelnen Bestandteile der gezeigten Zellen, in der angezeigten Reihenfolge.",
  },
  {
    id: "matching-game-8",
    type: CBExerciseType.MatchingGame,
    topic: CBTopic.Zelle,
    image: {
      src: "/cell-organelles/pflanzliche-zelle.png",
      alt: "Zellorganellen: Centriolen, Mitochondrium, Peroxisome, Chloroplast",
    },
    options: [
      { id: "1", name: "Centriolen" },
      { id: "2", name: "Mitochondrium" },
      { id: "3", name: "Peroxisome" },
      { id: "4", name: "Chloroplast" },
    ],
    correctSelection: [2, 3, 4, 1],
    highlightedComponents: [
      {
        id: 0,
        name: "Mitochondirum",
        pointer: { x: 130, y: 98 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
      {
        id: 1,
        name: "Peroxisome",
        pointer: { x: 90, y: 33 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
      {
        id: 2,
        name: "Chloroplast",
        pointer: { x: 180, y: 63 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
      {
        id: 3,
        name: "Centriolen",
        pointer: { x: -8, y: 103 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
    ],
    title: "Ordne die Begriffe den entsprechenden Zellorganellen zu.",
    hint: "Benenne die einzelnen Bestandteile der gezeigten Zellen, in der angezeigten Reihenfolge.",
  },
  {
    id: "matching-game-9",
    type: CBExerciseType.MatchingGame,
    topic: CBTopic.Zelle,
    image: {
      src: "/cell-organelles/pflanzliche-zelle.png",
      alt: "Zellorganellen: Endoplasmatisches Retikulum, Peroxisome, Centriolen, Mikrotubuli",
    },
    options: [
      { id: "1", name: "Endoplasmatisches Retikulum" },
      { id: "2", name: "Peroxisome" },
      { id: "3", name: "Centriolen" },
      { id: "4", name: "Mikrotubuli" },
    ],
    correctSelection: [2, 3, 1, 4],
    highlightedComponents: [
      {
        id: 0,
        name: "Peroxisome",
        pointer: { x: 90, y: 33 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
      {
        id: 1,
        name: "Centriolen",
        pointer: { x: -8, y: 103 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
      {
        id: 2,
        name: "Endoplasmatisches Retikulum",
        pointer: { x: 140, y: 43 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
      {
        id: 3,
        name: "Mikrotubuli",
        pointer: { x: 65, y: 103 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
    ],
    title: "Ordne die Begriffe den entsprechenden Zellorganellen zu.",
    hint: "Benenne die einzelnen Bestandteile der gezeigten Zellen, in der angezeigten Reihenfolge.",
  },
  {
    id: "matching-game-10",
    type: CBExerciseType.MatchingGame,
    topic: CBTopic.Zelle,
    image: {
      src: "/cell-organelles/pflanzliche-zelle.png",
      alt: "Zellorganellen: Mitochondrium, Lysosomen, Zellkern, Golgi-Apparat",
    },
    options: [
      { id: "1", name: "Mitochondrium" },
      { id: "2", name: "Lysosomen" },
      { id: "3", name: "Zellkern" },
      { id: "4", name: "Golgi-Apparat" },
    ],
    correctSelection: [4, 3, 1, 2],
    highlightedComponents: [
      {
        id: 0,
        name: "Golgi-Apparat",
        pointer: { x: 150, y: 48 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
      {
        id: 1,
        name: "Zellkern",
        pointer: { x: 80, y: 8 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
      {
        id: 2,
        name: "Mitochondirum",
        pointer: { x: 130, y: 98 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
      {
        id: 3,
        name: "Lysosomen",
        pointer: { x: 40, y: 103 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
    ],
    title: "Ordne die Begriffe den entsprechenden Zellorganellen zu.",
    hint: "Benenne die einzelnen Bestandteile der gezeigten Zellen, in der angezeigten Reihenfolge.",
  },
  {
    id: "matching-game-11",
    type: CBExerciseType.MatchingGame,
    topic: CBTopic.MitoseMeiose,
    image: {
      src: "/cell-division/mitosis/mitose.png",
      alt: "Mitosephasen: Interphase, Telophase, Metaphase, Anaphase",
    },
    options: [
      { id: "1", name: "Interphase" },
      { id: "2", name: "Telophase" },
      { id: "3", name: "Metaphase" },
      { id: "4", name: "Anaphase" },
    ],
    correctSelection: [2, 4, 3, 1],
    highlightedComponents: [
      {
        id: 0,
        name: "Telophase",
        pointer: { x: 100, y: 178 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
      {
        id: 1,
        name: "Anaphase",
        pointer: { x: 150, y: 46 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
      {
        id: 2,
        name: "Metaphase",
        pointer: { x: 20, y: 73 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
      {
        id: 3,
        name: "Interphase",
        pointer: { x: 120, y: 178 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
    ],
    title: "Welche Phase der Mitose ist hier gesucht?",
    hint: "Ordne die verschiedenen Phasen der Mitose in der korrekten Reihenfolge an.",
  },
  {
    id: "matching-game-12",
    type: CBExerciseType.MatchingGame,
    topic: CBTopic.MitoseMeiose,
    image: {
      src: "/cell-division/mitosis/mitose.png",
      alt: "Mitosephasen: Interphase, Telophase, Prophase, Anaphase",
    },
    options: [
      { id: "1", name: "Interphase" },
      { id: "2", name: "Telophase" },
      { id: "3", name: "Prophase" },
      { id: "4", name: "Anaphase" },
    ],
    correctSelection: [4, 3, 1, 2],
    highlightedComponents: [
      {
        id: 0,
        name: "Anaphase",
        pointer: { x: 150, y: 46 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
      {
        id: 1,
        name: "Prophase",
        pointer: { x: 170, y: 18 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
      {
        id: 2,
        name: "Interphase",
        pointer: { x: 120, y: 178 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
      {
        id: 3,
        name: "Telophase",
        pointer: { x: 100, y: 178 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
    ],
    title: "Welche Phase der Mitose ist hier gesucht?",
    hint: "Ordne die verschiedenen Phasen der Mitose in der korrekten Reihenfolge an.",
  },
  {
    id: "matching-game-13",
    type: CBExerciseType.MatchingGame,
    topic: CBTopic.MitoseMeiose,
    image: {
      src: "/cell-division/mitosis/mitose.png",
      alt: "Mitosephasen: Interphase, Telophase, Metaphase, Prophase",
    },
    options: [
      { id: "1", name: "Interphase" },
      { id: "2", name: "Telophase" },
      { id: "3", name: "Metaphase" },
      { id: "4", name: "Prophase" },
    ],
    correctSelection: [1, 3, 2, 4],
    highlightedComponents: [
      {
        id: 4,
        name: "Interphase",
        pointer: { x: 120, y: 178 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
      {
        id: 1,
        name: "Metaphase",
        pointer: { x: 0, y: 28 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
      {
        id: 3,
        name: "Telophase",
        pointer: { x: 100, y: 178 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
      {
        id: 0,
        name: "Prophase",
        pointer: { x: 170, y: 28 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
    ],
    title: "Welche Phase der Mitose ist hier gesucht?",
    hint: "Ordne die verschiedenen Phasen der Mitose in der korrekten Reihenfolge an.",
  },
  {
    id: "matching-game-14",
    type: CBExerciseType.MatchingGame,
    topic: CBTopic.MitoseMeiose,
    image: {
      src: "/cell-division/meiosis/Meiose-unbeschriftet.png",
      alt: "Meiosephasen: Anaphase I, Prophase I, Metaphase I, Telophase I",
    },
    options: [
      { id: "1", name: "Anaphase I" },
      { id: "2", name: "Prophase I" },
      { id: "3", name: "Metaphase I" },
      { id: "4", name: "Telophase I" },
    ],
    correctSelection: [2, 3, 1, 4],
    highlightedComponents: [
      {
        id: 0,
        name: "Prophase I",
        pointer: { x: 190, y: 46 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
      {
        id: 2,
        name: "Metaphase I",
        pointer: { x: 120, y: 82 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
      {
        id: 2,
        name: "Anaphase I",
        pointer: { x: -20, y: 46 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
      {
        id: 1,
        name: "Telophase I",
        pointer: { x: 72, y: 82 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
    ],
    title: "Welche Phase der Meiose ist hier gesucht?",
    hint: "Ordne die verschiedenen Phasen der Meiose in der korrekten Reihenfolge an.",
  },
  {
    id: "matching-game-15",
    type: CBExerciseType.MatchingGame,
    topic: CBTopic.MitoseMeiose,
    image: {
      src: "/cell-division/meiosis/Meiose-unbeschriftet.png",
      alt: "Meiosephasen: Anaphase I, Prophase I, Interphase, Telophase I",
    },
    options: [
      { id: "1", name: "Anaphase I" },
      { id: "2", name: "Prophase I" },
      { id: "3", name: "Interphase" },
      { id: "4", name: "Telophase I" },
    ],
    correctSelection: [2, 4, 1, 3],
    highlightedComponents: [
      {
        id: 0,
        name: "Prophase I",
        pointer: { x: 190, y: 48 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
      {
        id: 1,
        name: "Telophase I",
        pointer: { x: 75, y: 82 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
      {
        id: 2,
        name: "Anaphase I",
        pointer: { x: -30, y: 46 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
      {
        id: 3,
        name: "Interphase",
        pointer: { x: 190, y: 5 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
    ],
    title: "Welche Phase der Meiose ist hier gesucht?",
    hint: "Ordne die verschiedenen Phasen der Meiose in der korrekten Reihenfolge an.",
  },
  {
    id: "matching-game-16",
    type: CBExerciseType.MatchingGame,
    topic: CBTopic.MitoseMeiose,
    image: {
      src: "/cell-division/meiosis/Meiose-unbeschriftet.png",
      alt: "Meiosephasen: Interphase, Metaphase II, Prophase I, Tochterzellen",
    },
    options: [
      { id: "1", name: "Interphase" },
      { id: "2", name: "Metaphase II" },
      { id: "3", name: "Prophase I" },
      { id: "4", name: "Tochterzellen" },
    ],
    correctSelection: [2, 3, 4, 1],
    highlightedComponents: [
      {
        id: 6,
        name: "Metaphase II",
        pointer: { x: 120, y: 188 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
      {
        id: 0,
        name: "Prophase I",
        pointer: { x: 190, y: 48 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
      {
        id: 2,
        name: "Tochterzellen",
        pointer: { x: 160, y: 203 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
      {
        id: 3,
        name: "Interphase",
        pointer: { x: 190, y: 5 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
    ],
    title: "Welche Phase der Meiose ist hier gesucht?",
    hint: "Ordne die verschiedenen Phasen der Meiose in der korrekten Reihenfolge an.",
  },
  {
    id: "matching-game-17",
    type: CBExerciseType.MatchingGame,
    topic: CBTopic.MitoseMeiose,
    image: {
      src: "/cell-division/meiosis/Meiose-unbeschriftet.png",
      alt: "Meiosephasen: Anaphase II, Telophase II, Prophase II, Tochterzellen",
    },
    options: [
      { id: "1", name: "Anaphase II" },
      { id: "2", name: "Telophase II" },
      { id: "3", name: "Prophase II" },
      { id: "4", name: "Tochterzellen" },
    ],
    correctSelection: [1, 2, 4, 3],
    highlightedComponents: [
      {
        id: 0,
        name: "Anaphase II",
        pointer: { x: 60, y: 223 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
      {
        id: 1,
        name: "Telophase II",
        pointer: { x: 70, y: 138 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
      {
        id: 2,
        name: "Tochterzellen",
        pointer: { x: 160, y: 203 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
      {
        id: 3,
        name: "Prophase II",
        pointer: { x: 200, y: 138 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
    ],
    title: "Welche Phase der Meiose ist hier gesucht?",
    hint: "Ordne die verschiedenen Phasen der Meiose in der korrekten Reihenfolge an.",
  },
  {
    id: "matching-game-18",
    type: CBExerciseType.MatchingGame,
    topic: CBTopic.MitoseMeiose,
    image: {
      src: "/cell-division/meiosis/Meiose-unbeschriftet.png",
      alt: "Meiosephasen: Anaphase II, Metaphase II, Telophase II, Metaphase II",
    },
    options: [
      { id: "1", name: "Anaphase II" },
      { id: "2", name: "Metaphase I" },
      { id: "3", name: "Telophase II" },
      { id: "4", name: "Metaphase II" },
    ],
    correctSelection: [1, 2, 4, 3],
    highlightedComponents: [
      {
        id: 0,
        name: "Anaphase II",
        pointer: { x: -7, y: 223 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
      {
        id: 1,
        name: "Metaphase I",
        pointer: { x: 120, y: 78 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
      {
        id: 2,
        name: "Metaphase II",
        pointer: { x: 120, y: 188 },
        side: CBMatchingGameHighlightComponentSide.Left,
      },
      {
        id: 3,
        name: "Telophase II",
        pointer: { x: 70, y: 138 },
        side: CBMatchingGameHighlightComponentSide.Right,
      },
    ],
    title: "Welche Phase der Meiose ist hier gesucht?",
    hint: "Ordne die verschiedenen Phasen der Meiose in der korrekten Reihenfolge an.",
  },
];
