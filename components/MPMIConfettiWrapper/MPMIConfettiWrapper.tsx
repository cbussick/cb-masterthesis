"use client";

import { useIsServerSide } from "@/helpers/useIsServerSide";
import { useConfetti } from "@/ui/useConfetti";
import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";
import { MPMIConfettiWrapperProps } from "./MPMIConfettiWrapperInterfaces";

export const MPMIConfettiWrapper = ({
  children,
}: MPMIConfettiWrapperProps): JSX.Element => {
  const isServerSide = useIsServerSide();
  const { isConfettiComplete, setIsConfettiComplete } = useConfetti();
  const { width, height } = useWindowSize();
  const [usableWindowSize, setUsableWindowSize] =
    useState<ReturnType<typeof useWindowSize>>();

  useEffect(() => {
    if (!isServerSide) {
      setUsableWindowSize({ width, height });
    }
  }, [height, isServerSide, width]);

  return (
    <>
      {children}

      <ReactConfetti
        width={usableWindowSize ? usableWindowSize?.width : 0}
        height={usableWindowSize ? usableWindowSize?.height : 0}
        numberOfPieces={isConfettiComplete ? 0 : 1000}
        recycle={false}
        onConfettiComplete={(instance) => {
          setIsConfettiComplete(true);
          instance?.reset();
        }}
        initialVelocityY={{ min: 5, max: 20 }}
        style={{ zIndex: 9999 }}
      />
    </>
  );
};
