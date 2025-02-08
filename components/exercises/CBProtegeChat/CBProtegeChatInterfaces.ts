import { CBProtegeChatExerciseWithMetaData } from "@/data/exercises/CBProtegeChatExercise";

export interface CBProtegeChatProps {
  exercise: CBProtegeChatExerciseWithMetaData;
  onCompleteHref: string;
}
