import { CBRouteData } from "@/helpers/routes";
import { CBDialogProps } from "../../CBDialog/CBDialogInterfaces";

export interface CBSearchResultProps {
  routeData: CBRouteData;
  onClose: CBDialogProps["onClose"];
}
