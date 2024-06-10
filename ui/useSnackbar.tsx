import { useContext } from "react";
import { SnackbarContext } from "./SnackbarProvider";

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};
