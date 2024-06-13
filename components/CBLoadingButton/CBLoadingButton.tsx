import { Button, CircularProgress } from "@mui/material";
import { CBLoadingButtonProps } from "./CBLoadingButtonInterfaces";

export const CBLoadingButton = ({
  isLoading,
  children,
  ...props
}: CBLoadingButtonProps): JSX.Element => {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading ? <CircularProgress size={24.5} /> : children}
    </Button>
  );
};
