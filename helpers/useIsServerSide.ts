import { useEffect, useState } from "react";

/**
 * Checks if the code is running on the server.
 */
export const useIsServerSide = () => {
  const [isServerSide, setServerSide] = useState(true);

  useEffect(() => {
    setServerSide(false);
  }, [setServerSide]);

  return isServerSide;
};
