import { useCBExerciseSequenceSnackbar } from "@/ui/useCBExerciseSequenceSnackbar";
import { useQuery } from "@tanstack/react-query";
import { CBAPIRoute } from "../apiRoutes";
import { getOpenAIDiNAsHintForQuestion } from "../openai/getOpenAIDiNAsHintForQuestion";

export const useGenerateHintQuery = (question: string) => {
  const { showSnackbar } = useCBExerciseSequenceSnackbar();

  const queryGenerateHint = useQuery({
    queryKey: [CBAPIRoute.DiNAsHint],
    queryFn: () => getOpenAIDiNAsHintForQuestion(question),
    enabled: false,
    // Allows clearing the cache on unmount (e.g. when the user switches the page)
    gcTime: 0,
    meta: {
      onError: (errorMessage: string) => {
        showSnackbar(
          "Problem beim Erfragen eines Tipps",
          errorMessage,
          "error",
        );
      },
    },
  });

  return queryGenerateHint;
};
