const apiBaseUrl = "/api/";

export enum CBAPIRoute {
  FreeformQuestion = "FreeformQuestion",
  DiNAsHint = "DiNAsHint",
}

export const apiRouteMap: Record<CBAPIRoute, string> = {
  [CBAPIRoute.FreeformQuestion]: `${apiBaseUrl}freeform-question`,
  [CBAPIRoute.DiNAsHint]: `${apiBaseUrl}dinas-hint`,
};
