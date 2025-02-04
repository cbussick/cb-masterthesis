import { CBImgWithAlt } from "@/helpers/CBImgWithAlt";
import { CBExerciseType } from "./CBExerciseType";
import { CBExerciseWithIDAndTypeAndTopic } from "./CBExerciseWithType";

export interface CBLabelImageExercise extends CBExerciseWithIDAndTypeAndTopic {
  image: CBImgWithAlt;
  type: CBExerciseType.LabelImage;
}

export type CBLabelImageExerciseWithMetaData = CBLabelImageExercise & {
  isCompleted: boolean;
};
