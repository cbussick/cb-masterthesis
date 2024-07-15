const apiBaseUrl = "/api/";

export enum CBAPIRoute {
  FreeformQuestion = "FreeformQuestion",
  DiNAsHint = "DiNAsHint",
  Image = "Image",
}

export const apiRouteMap: Record<CBAPIRoute, string> = {
  [CBAPIRoute.FreeformQuestion]: `${apiBaseUrl}freeform-question`,
  [CBAPIRoute.DiNAsHint]: `${apiBaseUrl}dinas-hint`,
  [CBAPIRoute.Image]: `${apiBaseUrl}image`,
};
