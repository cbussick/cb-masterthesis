const apiBaseUrl = "/api/";

export enum CBAPIRoute {
  EvaluateFreeformQuestion = "evaluate-freeform-question",
  EvaluateFreeformQuestionWithCorrectAnswer = "evaluate-freeform-question-with-correct-answer",
  EvaluateProtegeChat = "evaluate-protege-chat",
  EvaluateProtegeChatTeaching = "evaluate-protege-chat-teaching",
  DiNAsHint = "dinas-hint",
  Image = "image",
  ImageVariation = "image-variation",
  TextToSpeech = "text-to-speech",
  GenerateQuestionExercise = "generate-question-exercise",
  GenerateQuizExercise = "generate-quiz-exercise",
  ImageLabelEvaluation = "image-label-evaluation",
  ImageDescription = "image-description",
  ProtegeChat = "protege-chat",
}

export const apiRouteMap: Record<CBAPIRoute, string> = {
  [CBAPIRoute.EvaluateFreeformQuestion]: `${apiBaseUrl}${CBAPIRoute.EvaluateFreeformQuestion}`,
  [CBAPIRoute.EvaluateFreeformQuestionWithCorrectAnswer]: `${apiBaseUrl}${CBAPIRoute.EvaluateFreeformQuestionWithCorrectAnswer}`,
  [CBAPIRoute.EvaluateProtegeChat]: `${apiBaseUrl}${CBAPIRoute.EvaluateProtegeChat}`,
  [CBAPIRoute.EvaluateProtegeChatTeaching]: `${apiBaseUrl}${CBAPIRoute.EvaluateProtegeChatTeaching}`,
  [CBAPIRoute.DiNAsHint]: `${apiBaseUrl}${CBAPIRoute.DiNAsHint}`,
  [CBAPIRoute.GenerateQuestionExercise]: `${apiBaseUrl}${CBAPIRoute.GenerateQuestionExercise}`,
  [CBAPIRoute.GenerateQuizExercise]: `${apiBaseUrl}${CBAPIRoute.GenerateQuizExercise}`,
  [CBAPIRoute.Image]: `${apiBaseUrl}${CBAPIRoute.Image}`,
  [CBAPIRoute.ImageVariation]: `${apiBaseUrl}${CBAPIRoute.ImageVariation}`,
  [CBAPIRoute.TextToSpeech]: `${apiBaseUrl}${CBAPIRoute.TextToSpeech}`,
  [CBAPIRoute.ImageLabelEvaluation]: `${apiBaseUrl}${CBAPIRoute.ImageLabelEvaluation}`,
  [CBAPIRoute.ImageDescription]: `${apiBaseUrl}${CBAPIRoute.ImageDescription}`,
  [CBAPIRoute.ProtegeChat]: `${apiBaseUrl}${CBAPIRoute.ProtegeChat}`,
};
