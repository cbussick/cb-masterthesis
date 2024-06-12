import { CBExerciseWithMetaData } from "@/data/exercises/CBExercise";
import { CBExerciseType } from "@/data/exercises/CBExerciseType";
import { CBTopic } from "@/data/topics";
import { CBMistakeExercise } from "@/firebase/UserCustomDataConverter";
import { Dispatch, SetStateAction } from "react";
import { CBTime } from "../CBExerciseTimer/CBExerciseTimerInterfaces";

export interface CBFreePracticeExerciseSequenceProps {
  exercises: CBExerciseWithMetaData[];
  topic: CBTopic;
  exerciseType: CBExerciseType | null;
  onMistake: (exercise: CBMistakeExercise) => void;
  onCompleteExercise: (params: any) => void;
  onSequenceComplete: (params: any) => void;
  setCompletionTime: Dispatch<SetStateAction<CBTime>>;
}
