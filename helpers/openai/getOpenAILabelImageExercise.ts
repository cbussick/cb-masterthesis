import { CBExerciseType } from "@/data/exercises/CBExerciseType";
import { CBLabelImageExercise } from "@/data/exercises/CBLabelImageExercise";
import { glossaryEntries } from "@/data/glossaryEntries";
import { CBTopic } from "@/data/topics";
import { base64AddMimeType } from "../base64AddMimeType";
import { getOpenAIImage } from "./getOpenAIImage";

export const getOpenAILabelImageExercise = async (
  userId: string,
  topic: CBTopic,
) => {
  const filteredEntries = glossaryEntries.filter((e) => e.topic === topic);
  const randomEntry =
    filteredEntries[Math.floor(Math.random() * filteredEntries.length)];

  const prompt = `Erstelle ein Bild von ${randomEntry.term}.`;

  const image = await getOpenAIImage(prompt);

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
