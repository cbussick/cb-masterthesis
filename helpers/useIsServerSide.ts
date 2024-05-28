import { useEffect, useState } from "react";

/**
 * Checks if the code is running on the server side.
 */
export const useIsServerSide = () => {
  const [isServerSide, setIsServerSide] = useState(true);

  useEffect(() => {
    setIsServerSide(false);
  }, [setIsServerSide]);

  return isServerSide;
};
