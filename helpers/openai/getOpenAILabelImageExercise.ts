import { CBExerciseType } from "@/data/exercises/CBExerciseType";
import { CBLabelImageExercise } from "@/data/exercises/CBLabelImageExercise";
import { glossaryEntries } from "@/data/glossaryEntries";
import { CBTopic } from "@/data/topics";
import { base64AddMimeType } from "../base64AddMimeType";
import { getOpenAIImage } from "./getOpenAIImage";
import { getOpenAIImageVariation } from "./getOpenAIImageVariation";

export const getOpenAILabelImageExercise = async (
  userId: string,
  topic: CBTopic,
  isVariation: boolean,
) => {
  const filteredEntries = isVariation
    ? glossaryEntries.filter((e) => e.topic === topic && e.image1x1)
    : glossaryEntries.filter((e) => e.topic === topic);
  const randomEntry =
    filteredEntries.length > 0
      ? filteredEntries[Math.floor(Math.random() * filteredEntries.length)]
      : undefined;

  let image = "";

  if (isVariation) {
    // `image1x1` should be available here, since we filter for that in the `filteredEntries` anyway, but just to make TS happy.
    if (randomEntry?.image1x1) {
      image = await getOpenAIImageVariation(randomEntry.image1x1);
    }
  } else {
    const generationPrompt = `Illustration of ${randomEntry?.term}, depicted in an educational style, perfect for a biology textbook. ONLY SHOW THE ILLUSTRATION, NOTHING ELSE. There should be no labels, no arrows, no text and no numbers ANYWHERE in the image, as the image is for an exercise where the student needs to describe the image on their own. Show the illustration in front of a neutral, white background.`;

    image = await getOpenAIImage(generationPrompt);
  }

  const labelImageExercise: CBLabelImageExercise = {
    id: `${userId}_${Date.now()}_label_image`,
    topic,
    type: CBExerciseType.LabelImage,
    image: {
      src: base64AddMimeType(image, "image/jpg"),
      alt: "",
    },
  };

  return labelImageExercise;
};
