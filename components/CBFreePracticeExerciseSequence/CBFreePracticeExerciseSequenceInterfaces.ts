import { CBExerciseWithMetaData } from "@/data/exercises/CBExercise";
import { CBExerciseType } from "@/data/exercises/CBExerciseType";
import { CBTopic } from "@/data/topics";
import { CBAPIRequestState } from "@/helpers/CBAPIRequestState";
import { Dispatch, SetStateAction } from "react";
import { CBTime } from "../CBExerciseTimer/CBExerciseTimerInterfaces";

export interface CBFreePracticeExerciseSequenceProps {
  exercises: CBExerciseWithMetaData[];
  topic: CBTopic;
  exerciseType: CBExerciseType | null;
  onMistake: (exercise: CBExerciseWithMetaData) => void;
  onCompleteExercise: (params: any) => void;
  onSequenceComplete: (params: any) => void;
  setCompletionTime: Dispatch<SetStateAction<CBTime>>;
  apiRequestState?: CBAPIRequestState;
}
