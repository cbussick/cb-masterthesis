import { CBImgWithAlt } from "@/helpers/CBImgWithAlt";
import { CBExerciseType } from "./CBExerciseType";
import { CBExerciseWithIDAndTypeAndTopic } from "./CBExerciseWithType";

export interface CBLabelImageExercise extends CBExerciseWithIDAndTypeAndTopic {
  image: CBImgWithAlt;
  /**
   * The term that the image is supposed to represent.
   * Because the image is AI-generated, this term doesn't necessarilty reflect what is *actually* in the image.
   */
  term: string;
  type: CBExerciseType.LabelImage;
}

export type CBLabelImageExerciseWithMetaData = CBLabelImageExercise & {
  isCompleted: boolean;
};
