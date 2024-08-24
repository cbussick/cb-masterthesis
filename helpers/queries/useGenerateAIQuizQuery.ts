import { CBTopic } from "@/data/topics";
import { useUser } from "@/firebase-client/useUser";
import { useQuery } from "@tanstack/react-query";
import { CBAPIRoute } from "../apiRoutes";
import { getOpenAIQuizExercise } from "../openai/getOpenAIGenerateQuizExercise";

export const useGenerateAIQuizQuery = (
  topic: CBTopic,
  amount: number,
  enabled: boolean,
) => {
  const { user } = useUser();
  const queryGenerateAIQuiz = useQuery({
    queryKey: [CBAPIRoute.GenerateQuizExercise],
    queryFn: () => getOpenAIQuizExercise(user.uid, topic, amount),
    enabled,
    // Allows clearing the cache on unmount (e.g. when the user switches the page)
    gcTime: 0,
  });

  return queryGenerateAIQuiz;
};
