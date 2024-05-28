"use client";

import { Button, CircularProgress } from "@mui/material";
import { MPMILoadingButtonProps } from "./MPMILoadingButtonInterfaces";

export const MPMILoadingButton = ({
  isLoading,
  children,
  ...props
}: MPMILoadingButtonProps): JSX.Element => {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading ? <CircularProgress size={24.5} /> : children}
    </Button>
  );
};
