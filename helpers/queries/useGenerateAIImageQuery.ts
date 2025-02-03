import { CBTopic } from "@/data/topics";
import { useUser } from "@/firebase-client/useUser";
import { useQuery } from "@tanstack/react-query";
import { CBAPIRoute } from "../apiRoutes";
import { getOpenAILabelImageExercise } from "../openai/getOpenAILabelImageExercise";

export const useGenerateAILabelImageExerciseQuery = (
  topic: CBTopic,
  enabled: boolean,
  isVariation: boolean,
) => {
  const { user } = useUser();

  const queryGenerateAILabelImageExercise = useQuery({
    queryKey: [isVariation ? CBAPIRoute.ImageVariation : CBAPIRoute.Image],
    queryFn: () => getOpenAILabelImageExercise(user.uid, topic, isVariation),
    enabled,
    // Allows clearing the cache on unmount (e.g. when the user switches the page)
    gcTime: 0,
  });

  return queryGenerateAILabelImageExercise;
};
