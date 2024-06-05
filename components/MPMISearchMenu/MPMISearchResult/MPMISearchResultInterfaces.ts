import { MPMIRouteData } from "@/helpers/routes";
import { MPMIDialogProps } from "../../MPMIDialog/MPMIDialogInterfaces";

export interface MPMISearchResultProps {
  routeData: MPMIRouteData;
  onClose: MPMIDialogProps["onClose"];
}
