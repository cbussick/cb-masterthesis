import { CBExerciseWithMetaData } from "@/data/exercises/CBExercise";
import { CBExerciseType } from "@/data/exercises/CBExerciseType";
import { CBTopic } from "@/data/topics";
import { QueryStatus } from "@tanstack/react-query";
import { Dayjs } from "dayjs";

export interface CBFreePracticeExerciseSequenceProps {
  exercises: CBExerciseWithMetaData[];
  topic: CBTopic;
  exerciseType: CBExerciseType | null;
  onMistake: (exercise: CBExerciseWithMetaData) => void;
  onCompleteExercise: (params: any) => void;
  onSequenceComplete: (params: any) => void;
  beginTime: Dayjs;
  requestStatus?: QueryStatus;
  errorMessage?: string;
}
