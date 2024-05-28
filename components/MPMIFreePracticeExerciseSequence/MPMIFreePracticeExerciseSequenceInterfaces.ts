import { MPMIExerciseWithMetaData } from "@/data/exercises/MPMIExercise";
import { MPMIExerciseType } from "@/data/exercises/MPMIExerciseType";
import { MPMITopic } from "@/data/topics";
import { MPMIMistakeExercise } from "@/firebase/UserCustomDataConverter";
import { Dispatch, SetStateAction } from "react";
import { MPMITime } from "../MPMIExerciseTimer/MPMIExerciseTimerInterfaces";

export interface MPMIFreePracticeExerciseSequenceProps {
  exercises: MPMIExerciseWithMetaData[];
  topic: MPMITopic;
  exerciseType: MPMIExerciseType | null;
  onMistake: (exercise: MPMIMistakeExercise) => void;
  onCompleteExercise: (params: any) => void;
  onSequenceComplete: (params: any) => void;
  setCompletionTime: Dispatch<SetStateAction<MPMITime>>;
}
