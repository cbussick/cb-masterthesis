const apiBaseUrl = "/api/";

export enum CBAPIRoute {
  EvaluateFreeformQuestion = "EvaluateFreeformQuestion",
  DiNAsHint = "DiNAsHint",
  Image = "Image",
  TextToSpeech = "TextToSpeech",
  GenerateQuizExercise = "GenerateQuizExercise",
}

export const apiRouteMap: Record<CBAPIRoute, string> = {
  [CBAPIRoute.EvaluateFreeformQuestion]: `${apiBaseUrl}evaluate-freeform-question`,
  [CBAPIRoute.DiNAsHint]: `${apiBaseUrl}dinas-hint`,
  [CBAPIRoute.GenerateQuizExercise]: `${apiBaseUrl}generate-quiz-exercise`,
  [CBAPIRoute.Image]: `${apiBaseUrl}image`,
  [CBAPIRoute.TextToSpeech]: `${apiBaseUrl}text-to-speech`,
};
