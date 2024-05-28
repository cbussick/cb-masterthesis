import { useContext } from "react";
import { SnackbarContext } from "./SnackbarProvider";

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  return context;
};
