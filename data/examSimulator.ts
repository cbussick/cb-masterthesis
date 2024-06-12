import { CBExercise } from "./exercises/CBExercise";
import { familyTreeExercises } from "./exercises/CBFamilyTreeExercise";
import { matchingGameExercises } from "./exercises/CBMatchingGameExercise";
import { quizExercises } from "./exercises/CBQuizExercise";
import { swiperExercises } from "./exercises/CBSwiperExercise";

export interface CBExam {
  id: string;
  exercises: CBExercise[];
}

export const exams: CBExam[] = [
  {
    id: "exam-1",
    exercises: [
      quizExercises[2],
      quizExercises[3],
      matchingGameExercises[1],
      matchingGameExercises[7],
      swiperExercises[0],
      swiperExercises[6],
      quizExercises[24],
      matchingGameExercises[10],
      quizExercises[51],
      quizExercises[47],
      familyTreeExercises[0],
    ],
  },
  {
    id: "exam-2",
    exercises: [
      quizExercises[4],
      quizExercises[5],
      matchingGameExercises[1],
      swiperExercises[1],
      swiperExercises[7],
      quizExercises[30],
      quizExercises[32],
      matchingGameExercises[11],
      quizExercises[42],
      quizExercises[49],
      matchingGameExercises[0],
      familyTreeExercises[1],
    ],
  },
  {
    id: "exam-3",
    exercises: [
      quizExercises[6],
      quizExercises[10],
      matchingGameExercises[2],
      swiperExercises[2],
      swiperExercises[8],
      quizExercises[27],
      quizExercises[29],
      quizExercises[50],
      quizExercises[54],
      familyTreeExercises[2],
    ],
  },
  {
    id: "exam-4",
    exercises: [
      quizExercises[14],
      quizExercises[19],
      matchingGameExercises[3],
      matchingGameExercises[4],
      swiperExercises[3],
      swiperExercises[9],
      quizExercises[26],
      quizExercises[28],
      matchingGameExercises[12],
      quizExercises[49],
      quizExercises[53],
      familyTreeExercises[3],
    ],
  },
  {
    id: "exam-5",
    exercises: [
      quizExercises[16],
      quizExercises[18],
      matchingGameExercises[5],
      matchingGameExercises[6],
      swiperExercises[4],
      swiperExercises[10],
      quizExercises[30],
      quizExercises[23],
      matchingGameExercises[16],
      quizExercises[50],
      quizExercises[57],
      familyTreeExercises[0],
    ],
  },
];
