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
    ? glossaryEntries.filter((e) => e.topic === topic && e.image)
    : glossaryEntries.filter((e) => e.topic === topic);
  const randomEntry =
    filteredEntries[Math.floor(Math.random() * filteredEntries.length)];

  let image = "";
  if (isVariation) {
    // `image` should be available here, since we filter for that in the `filteredEntries` anyway, but just to make TS happy.
    if (randomEntry.image) {
      image = await getOpenAIImageVariation(randomEntry.image);
    }
  } else {
    const generationPrompt = `Erstelle ein Bild von ${randomEntry.term}.`;

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
