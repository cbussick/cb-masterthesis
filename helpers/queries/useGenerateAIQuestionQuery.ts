import { CBTopic } from "@/data/topics";
import { useUser } from "@/firebase-client/useUser";
import { useQuery } from "@tanstack/react-query";
import { CBAPIRoute } from "../apiRoutes";
import { getOpenAIQuestionExercise } from "../openai/getOpenAIGenerateQuestionExercise";

export const useGenerateAIQuestionQuery = (
  topic: CBTopic,
  definitions: string[],
  enabled: boolean,
) => {
  const { user } = useUser();
  const queryGenerateAIQuestion = useQuery({
    queryKey: [CBAPIRoute.GenerateQuestionExercise],
    queryFn: () => getOpenAIQuestionExercise(user.uid, topic, definitions),
    enabled,
    // Allows clearing the cache on unmount (e.g. when the user switches the page)
    gcTime: 0,
  });

  return queryGenerateAIQuestion;
};
