const apiBaseUrl = "/api/";

export enum CBAPIRoute {
  EvaluateFreeformQuestion = "evaluate-freeform-question",
  DiNAsHint = "dinas-hint",
  Image = "image",
  TextToSpeech = "text-to-speech",
  GenerateQuizExercise = "generate-quiz-exercise",
  ImageLabelEvaluation = "image-label-evaluation",
}

export const apiRouteMap: Record<CBAPIRoute, string> = {
  [CBAPIRoute.EvaluateFreeformQuestion]: `${apiBaseUrl}${CBAPIRoute.EvaluateFreeformQuestion}`,
  [CBAPIRoute.DiNAsHint]: `${apiBaseUrl}${CBAPIRoute.DiNAsHint}`,
  [CBAPIRoute.GenerateQuizExercise]: `${apiBaseUrl}${CBAPIRoute.GenerateQuizExercise}`,
  [CBAPIRoute.Image]: `${apiBaseUrl}${CBAPIRoute.Image}`,
  [CBAPIRoute.TextToSpeech]: `${apiBaseUrl}${CBAPIRoute.TextToSpeech}`,
  [CBAPIRoute.ImageLabelEvaluation]: `${apiBaseUrl}${CBAPIRoute.ImageLabelEvaluation}`,
};
