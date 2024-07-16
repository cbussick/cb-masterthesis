import { Button, buttonClasses, CircularProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { CBLoadingButtonProps } from "./CBLoadingButtonInterfaces";

export const CBLoadingButton = ({
  isLoading,
  children,
  ...props
}: CBLoadingButtonProps): JSX.Element => {
  const ref = useRef<HTMLButtonElement>(null);

  const [width, setWidth] = useState<number>();

  useEffect(() => {
    // Probably only works like this, when the button starts with `isLoading` set to `true
    setWidth(ref.current?.offsetWidth);
  }, []);

  return (
    <Button
      disabled={isLoading}
      {...props}
      ref={ref}
      sx={{
        width,
        [`& .${buttonClasses.endIcon}`]: {
          // To keep the endIcon on the right side of the button while loading
          marginLeft: isLoading ? "auto" : undefined,
        },
      }}
    >
      {isLoading ? (
        <CircularProgress
          size={24.5}
          sx={{
            // To center the Spinner while loading
            marginLeft: "auto",
          }}
        />
      ) : (
        children
      )}
    </Button>
  );
};
