/* eslint-disable no-nested-ternary */

"use client";

import { CBExerciseSequenceType } from "@/components/CBExerciseSequence/CBExerciseSequenceWrapperInterfaces";
import { useCBExerciseSequence } from "@/components/CBExerciseSequence/useCBExerciseSequenceProvider";
import { Box, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import { MotionProps, motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { useReactFlow } from "reactflow";
import {
  CBFamilyTreeNodeData,
  CBFamilyTreePairGender,
} from "../CBFamilyTreeNode/CBFamilyTreeNodeInterfaces";
import { useFamilyTree } from "../useFamilyTree";

export const selectWidth = 100;
export const selectHeight = 44;

const animationVariants: MotionProps["variants"] = {
  show: {
    rotate: 360,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
  error: {
    rotate: [0, -5, 0, 5, 0],
    x: [0, -3, 0, 3, 0],
    transition: { duration: 0.3 },
  },
};

export const CBFamilyTreeNodeRaw = ({
  nodeId,
  size,
  gender,
  choices,
  color,
  isMistake,
}: CBFamilyTreeNodeData): JSX.Element => {
  const animationControls = useAnimationControls();
  const { nodeIdsWithText, setNodeIdsWithText, flatArrayNodesAndSpouses } =
    useFamilyTree();
  const { isCurrentExerciseFinished, type } = useCBExerciseSequence();
  const { setNodes } = useReactFlow();

  const [value, setValue] = useState<string>("");

  const onChangeValue = (newText: string) => {
    const oldElement = nodeIdsWithText.find((element) => element.id === nodeId);
    const newElement = { id: nodeId, text: newText };

    if (oldElement) {
      const oldElementIndex = nodeIdsWithText.findIndex(
        (element) => element.id === nodeId,
      );
      const newElementArray = [...nodeIdsWithText];
      newElementArray[oldElementIndex] = newElement;

      setNodeIdsWithText(newElementArray);
    } else {
      const newArray = [...nodeIdsWithText];
      newArray.push(newElement);
      setNodeIdsWithText(newArray);
    }
  };

  useEffect(() => {
    animationControls.start("show");
  }, [animationControls]);

  useEffect(() => {
    if (isMistake) {
      animationControls.start("error");
    }
  }, [animationControls, isMistake]);

  const onChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value;

    setValue(newValue);
    onChangeValue(newValue);
  };

  return (
    <Stack
      spacing={1}
      sx={{
        alignItems: "center",
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={animationControls}
        variants={animationVariants}
      >
        <Box
          sx={{
            width: size,
            height: size,
            bgcolor: color || ((t) => t.palette.grey[300]),
            borderRadius:
              gender === CBFamilyTreePairGender.Female ? "50%" : undefined,
          }}
        />
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={animationControls}
        variants={animationVariants}
      >
        <Select
          id={nodeId}
          size="small"
          sx={{
            width: selectWidth,
            height: selectHeight,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: (t) =>
                type === CBExerciseSequenceType.ExamSimulator &&
                isCurrentExerciseFinished
                  ? isMistake
                    ? `${t.palette.error.main} !important`
                    : `${t.palette.success.main} !important`
                  : undefined,
            },
          }}
          value={value}
          error={isMistake}
          disabled={isCurrentExerciseFinished}
          onFocus={() => {
            setNodes((prevNodes) => {
              // Pair nodes will always have an ID in the form of "1_2-pair".
              // That means that we can get a nodes pair id by looking for "1_" or "2-" in the id.
              const regex = new RegExp(`${nodeId}[_-]`);
              const pairNodeData = prevNodes.find((pv) => regex.test(pv.id));

              const isSpouseOrSingle =
                (
                  flatArrayNodesAndSpouses.find(
                    (n) => n.id.toString() === nodeId,
                  ) as any
                )?.spouse === undefined;

              const nodeData =
                pairNodeData || prevNodes.find((pv) => pv.id === nodeId);

              const index = prevNodes.findIndex((pv) => pv.id === nodeData?.id);

              const newNodes = [...prevNodes];

              if (pairNodeData) {
                if (isSpouseOrSingle) {
                  // @ts-ignore
                  newNodes[index] = {
                    ...nodeData,
                    data: {
                      ...nodeData?.data,
                      nodeRight: {
                        ...nodeData?.data.nodeRight,
                        isMistake: false,
                      },
                    },
                  };
                } else {
                  // @ts-ignore
                  newNodes[index] = {
                    ...nodeData,
                    data: {
                      ...nodeData?.data,
                      nodeLeft: {
                        ...nodeData?.data.nodeLeft,
                        isMistake: false,
                      },
                    },
                  };
                }
              } else {
                // @ts-ignore
                newNodes[index] = {
                  ...nodeData,
                  data: { ...nodeData?.data, isMistake: false },
                };
              }

              return newNodes;
            });
          }}
          onChange={onChange}
        >
          {choices.map((choice) => (
            <MenuItem key={choice} value={choice}>
              {choice}
            </MenuItem>
          ))}
        </Select>
      </motion.div>
    </Stack>
  );
};
