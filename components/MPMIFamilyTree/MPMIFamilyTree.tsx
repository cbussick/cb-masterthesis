/* eslint-disable no-nested-ternary */

"use client";

import { MPMIExerciseDifficulty } from "@/data/exercises/MPMIExerciseDifficulty";
import {
  MPMIErbgang,
  MPMIErbgangRules,
  MPMIFamilyTreeExerciseNode,
} from "@/data/exercises/MPMIFamilyTreeExercise";
import { getFamilyTreePairNodeId } from "@/helpers/getFamilyTreePairNodeId";
import { getRomanNumeralSequence } from "@/helpers/getRomanNumeralSequence";
import { getTreeMaxDepth } from "@/helpers/getTreeMaxDepth";
import { playCorrectSound } from "@/helpers/playCorrectSound";
import { playIncorrectSound } from "@/helpers/playIncorrectSound";
import { useCurrentMuiBreakpoint } from "@/helpers/useCurrentMuiBreakpoint";
import { useSnackbar } from "@/ui/useSnackbar";
import dagre from "@dagrejs/dagre";
import {
  Box,
  Breakpoint,
  ButtonProps,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { MotionProps, motion, useAnimationControls } from "framer-motion";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import ReactFlow, {
  ConnectionMode,
  Edge,
  Node,
  NodeProps,
  Position,
  ReactFlowProps,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { MPMIConfirmation } from "../MPMIExerciseSequence/MPMIExerciseSequenceBottomBar/MPMIConfirmation";
import { MPMIExerciseSequenceType } from "../MPMIExerciseSequence/MPMIExerciseSequenceWrapperInterfaces";
import { useMPMIExerciseSequence } from "../MPMIExerciseSequence/useMPMIExerciseSequenceProvider";
import { MPMIFamilyTreeProps, MPMINodeType } from "./MPMIFamilyTreeInterfaces";
import { MPMIFamilyTreeNode } from "./MPMIFamilyTreeNode/MPMIFamilyTreeNode";
import {
  MPMIFamilyTreeNodeData,
  MPMIFamilyTreeNodeType,
  MPMIFamilyTreePairGender,
} from "./MPMIFamilyTreeNode/MPMIFamilyTreeNodeInterfaces";
import { selectWidth } from "./MPMIFamilyTreeNodeRaw/MPMIFamilyTreeNodeRaw";
import { MPMIFamilyTreePairNode } from "./MPMIFamilyTreePairNode/MPMIFamilyTreePairNode";
import { MPMIFamilyTreePairNodeType } from "./MPMIFamilyTreePairNode/MPMIFamilyTreePairNodeInterfaces";
import { useFamilyTree } from "./useFamilyTree";

const textFieldHeightPlusStackSpacing = 48;

const animationVariants: MotionProps["variants"] = {
  show: {
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
  error: {
    x: [0, -3, 0, 3, 0],
    transition: { duration: 0.3 },
  },
};

const affectedColor = "#ad4545";
const position: Node["position"] = { x: 0, y: 0 };

const nodeSizeMap: Record<Breakpoint, number> = {
  xs: 25,
  sm: 30,
  md: 40,
  lg: 40,
  xl: 50,
};

const romanNumeralFontSizeMap: Record<Breakpoint, string> = {
  xs: "1.5rem",
  sm: "1.8rem",
  md: "2rem",
  lg: "3rem",
  xl: "3rem",
};

export const nodeTypes: Record<MPMINodeType, React.FC<NodeProps>> = {
  [MPMINodeType.FamilyTreeNode]: MPMIFamilyTreeNode,
  [MPMINodeType.FamilyTreePairNode]: MPMIFamilyTreePairNode,
};

const commonNodeProps: Pick<
  MPMIFamilyTreeNodeType,
  "selectable" | "draggable" | "focusable" | "deletable" | "position"
> = {
  selectable: true,
  draggable: false,
  focusable: false,
  deletable: false,
  position,
};

const commonSingleNodeProps: Partial<MPMIFamilyTreeNodeType> &
  typeof commonNodeProps = {
  type: MPMINodeType.FamilyTreeNode,
  ...commonNodeProps,
};

const commonPairNodeProps: Partial<MPMIFamilyTreePairNodeType> &
  typeof commonNodeProps = {
  type: MPMINodeType.FamilyTreePairNode,
  ...commonNodeProps,
};

const commonParentToChildEdgeProps: Partial<Edge> = {
  sourceHandle: Position.Bottom,
  targetHandle: Position.Top,
};

export const MPMIFamilyTree = forwardRef(
  ({ exercise, sequenceType }: MPMIFamilyTreeProps, ref): JSX.Element => {
    const theme = useTheme();
    const animationControls = useAnimationControls();
    const { isCurrentExerciseFinished } = useMPMIExerciseSequence();
    const [inheritance, setInheritance] = React.useState("");
    const [isInheritanceMistake, setIsInheritanceMistake] =
      React.useState<boolean>(false);
    const showInheritance = exercise.difficulty === MPMIExerciseDifficulty.Hard;

    const handleChange = (event: SelectChangeEvent) => {
      setInheritance(event.target.value);
    };

    const currentBreakpoint = useCurrentMuiBreakpoint();
    const {
      nodeIdsWithText,
      flatArrayNodesAndSpouses,
      setFlatArrayNodesAndSpouses,
    } = useFamilyTree();

    const { showSnackbar } = useSnackbar();

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);
    const [graphDimensions, setGraphDimensions] = useState<{
      width: number;
      height: number;
    }>({ width: 0, height: 0 });

    useEffect(() => {
      animationControls.start("show");
    }, [animationControls]);

    useEffect(() => {
      if (isInheritanceMistake) {
        animationControls.start("error");
      }
    }, [animationControls, isInheritanceMistake]);

    useEffect(() => {
      const commonNodeDataProps: Pick<MPMIFamilyTreeNodeData, "size"> = {
        size: nodeSizeMap[currentBreakpoint],
      };

      const commonSingleNodeDataProps: Pick<
        MPMIFamilyTreeNodeType["data"],
        "size" | "color"
      > &
        typeof commonNodeDataProps = {
        ...commonNodeDataProps,
      };

      const commonPairNodeDataProps: Pick<
        MPMIFamilyTreePairNodeType["data"],
        "nodeSize" | "lineWidth" | "textFieldHeightPlusStackSpacing"
      > &
        typeof commonNodeDataProps = {
        nodeSize: nodeSizeMap[currentBreakpoint],
        lineWidth: "2px",
        textFieldHeightPlusStackSpacing,
        ...commonNodeDataProps,
      };

      const singleNodes: MPMIFamilyTreeNodeType[] = exercise.nodes
        .filter((e) => e.spouse === undefined)
        .map((node) => {
          const nodeId = node.id.toString();

          return {
            id: nodeId,
            data: {
              nodeId,
              gender: node.gender,
              choices: exercise.choices,
              color: MPMIErbgangRules[exercise.affectedRule](node.solution)
                ? affectedColor
                : undefined,
              ...commonSingleNodeDataProps,
            },
            ...commonSingleNodeProps,
          };
        });

      const initialEdges: ReactFlowProps["edges"] = [];

      const spouses = exercise.nodes
        .filter((e) => e.spouse !== undefined)
        .map((e) => e.spouse);

      const pairNodes: MPMIFamilyTreePairNodeType[] = exercise.nodes
        .filter((e) => e.spouse !== undefined)
        .map((node) => {
          const nodeId = node.id.toString();

          const { spouse } = node;

          const pairId = getFamilyTreePairNodeId(
            nodeId,
            spouse?.id.toString() || "",
          );

          node.children?.forEach((child) => {
            const edgeId = `${pairId}->${child}`;

            let childData: MPMIFamilyTreeExerciseNode | undefined;
            let isSpouse;

            const childDataFromNodes = exercise.nodes.find(
              (n) => n.id === child,
            );
            // The partner of the child.
            // It can be either a spouse or a "normal" node.
            let childPartner: MPMIFamilyTreeExerciseNode | undefined;

            if (childDataFromNodes) {
              childData = childDataFromNodes;
              isSpouse = false;
              childPartner = spouses.find(
                (s) => s?.id === childData?.spouse?.id,
              );
            } else {
              // If the child is not in the nodes array, it must be in the spouses array and therefore a spouse
              const childDataFromSpouses = spouses.find((s) => s?.id === child);
              childData = childDataFromSpouses;
              isSpouse = true;
              childPartner = exercise.nodes.find(
                (n) =>
                  n.id ===
                  exercise.nodes.find(
                    (currentNode) => currentNode.spouse?.id === child,
                  )?.id,
              );
            }

            // Node with lower ID is always left, node with higher ID always right
            const sortedPairNodeIds = [child, childPartner?.id || 0].sort(
              (a, b) => a - b,
            );

            const target = childPartner
              ? getFamilyTreePairNodeId(
                  sortedPairNodeIds[0].toString(),
                  sortedPairNodeIds[1].toString(),
                )
              : child.toString();

            let targetHandle = Position.Top;
            if (isSpouse) {
              targetHandle = Position.Right;
            } else if (childPartner) {
              targetHandle = Position.Left;
            }

            initialEdges.push({
              id: edgeId,
              source: pairId,
              target,
              ...commonParentToChildEdgeProps,
              targetHandle,
            });
          });

          return {
            id: pairId,
            data: {
              ...commonPairNodeDataProps,
              nodeLeft: {
                nodeId,
                gender: node.gender,
                choices: exercise.choices,
                color: MPMIErbgangRules[exercise.affectedRule](node.solution)
                  ? affectedColor
                  : undefined,
                ...commonSingleNodeDataProps,
              },
              nodeRight: {
                nodeId: spouse?.id.toString() || "",
                gender: spouse?.gender || MPMIFamilyTreePairGender.Male,
                choices: exercise.choices,
                color: MPMIErbgangRules[exercise.affectedRule](
                  spouse?.solution || "",
                )
                  ? affectedColor
                  : undefined,
                ...commonSingleNodeDataProps,
              },
            },
            ...commonPairNodeProps,
          };
        });

      const initialNodes = (singleNodes as any[]).concat(pairNodes);
      // Sort nodes by id to ensure keyboard navigation via tab works as expected
      initialNodes.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));

      const dagreGraph = new dagre.graphlib.Graph();
      dagreGraph.setDefaultEdgeLabel(() => ({}));

      const getLayoutedElements = (
        rawNodes: Node[],
        rawEdges: Edge[],
      ): {
        layoutedNodes: Node[];
        layoutedEdges: Edge[];
      } => {
        dagreGraph.setGraph({
          ranksep: nodeSizeMap[currentBreakpoint],
          nodesep: nodeSizeMap[currentBreakpoint] * 1.5,

          // Remove some of the space at the top and bottom dagre.js adds around the canvas by default?
          marginy: -25,
        });

        rawNodes.forEach((node) => {
          dagreGraph.setNode(node.id, {
            width:
              node.type === MPMINodeType.FamilyTreePairNode
                ? (nodeSizeMap[currentBreakpoint] > selectWidth
                    ? nodeSizeMap[currentBreakpoint]
                    : selectWidth) * 3
                : nodeSizeMap[currentBreakpoint],
            height:
              node.type === MPMINodeType.FamilyTreePairNode
                ? nodeSizeMap[currentBreakpoint] +
                  nodeSizeMap[currentBreakpoint] / 2 +
                  textFieldHeightPlusStackSpacing // `+ nodeSizeMap[currentBreakpoint] / 2` Because the handle is positioned at the center of the node
                : nodeSizeMap[currentBreakpoint] +
                  textFieldHeightPlusStackSpacing,
          });
        });

        rawEdges.forEach((edge) => {
          dagreGraph.setEdge(edge.source, edge.target);
        });

        dagre.layout(dagreGraph);

        rawNodes.forEach((node) => {
          const nodeWithPosition = dagreGraph.node(node.id);

          // We are shifting the dagre node position (anchor=center center) to the top left
          // so it matches the ReactFlow node anchor point (top left).
          //
          // Disabling eslint rule here because this code is copied from the ReactFlow docs.
          // eslint-disable-next-line no-param-reassign
          node.position = {
            x: nodeWithPosition.x - nodeSizeMap[currentBreakpoint] / 2,
            y: nodeWithPosition.y - nodeSizeMap[currentBreakpoint] / 2,
          };
        });

        return {
          layoutedNodes: rawNodes,
          layoutedEdges: rawEdges,
        };
      };

      const { layoutedNodes, layoutedEdges } = getLayoutedElements(
        initialNodes,
        initialEdges,
      );

      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
      setGraphDimensions({
        width:
          (dagreGraph.graph()?.width || 0) + nodeSizeMap[currentBreakpoint],
        height:
          (dagreGraph.graph()?.height || 0) + textFieldHeightPlusStackSpacing,
      });

      // Makes it easier to iterate over all nodes
      const nodesAndSpousesAsFlatArray: Pick<
        MPMIFamilyTreeExerciseNode,
        "id" | "solution"
      >[] = (exercise.nodes as any).concat(spouses);

      setFlatArrayNodesAndSpouses(nodesAndSpousesAsFlatArray);
    }, [
      currentBreakpoint,
      exercise.affectedRule,
      exercise.choices,
      exercise.nodes,
      setEdges,
      setFlatArrayNodesAndSpouses,
      setNodes,
    ]);

    // Make fields with incorrect text red
    const showErrors = (
      mistakes: Pick<MPMIFamilyTreeExerciseNode, "id" | "solution">[],
      isInheritanceCorrect: boolean,
    ) => {
      const nodesWithHighlightedMistakes: Node[] = [];
      nodes.forEach((node) => {
        const isPairNode = node.type === MPMINodeType.FamilyTreePairNode;

        if (isPairNode) {
          const nodeLeft = node.data?.nodeLeft as MPMIFamilyTreeNodeData;
          const nodeRight = node.data?.nodeRight as MPMIFamilyTreeNodeData;

          const isMistakeLeft = mistakes.find(
            (mistake) => mistake.id.toString() === nodeLeft.nodeId,
          );
          const isMistakeRight = mistakes.find(
            (mistake) => mistake.id.toString() === nodeRight.nodeId,
          );

          let updatedNode = node;

          updatedNode = {
            ...node,
            data: {
              ...node.data,
              nodeLeft: {
                ...nodeLeft,
                isMistake: isMistakeLeft,
              },
              nodeRight: {
                ...nodeRight,
                isMistake: isMistakeRight,
              },
            },
          };

          nodesWithHighlightedMistakes.push(updatedNode);
        } else {
          const isMistake = mistakes.find(
            (mistake) => mistake.id.toString() === node.id,
          );

          nodesWithHighlightedMistakes.push({
            ...node,
            data: { ...node.data, isMistake },
          });
        }
      });
      setNodes(nodesWithHighlightedMistakes);
      setIsInheritanceMistake(!isInheritanceCorrect);
    };

    const onSuccess = () => {
      showSnackbar(
        "Alles richtig!",
        "Du hast die Übung erfolgreich abgeschlossen.",
        "success",
      );
      playCorrectSound();
    };

    const onError = (
      mistakes: Pick<MPMIFamilyTreeExerciseNode, "id" | "solution">[],
      isInheritanceCorrect: boolean,
    ) => {
      showErrors(mistakes, isInheritanceCorrect);

      if (sequenceType !== MPMIExerciseSequenceType.ExamSimulator) {
        showSnackbar(
          "Fehler vorhanden",
          "Leider sind noch Fehler vorhanden. 😕 Überprüfe die rot umrandeten Textfelder.",
          "error",
        );
      }
      playIncorrectSound();
    };

    const onConfirm: ButtonProps["onClick"] = (): MPMIConfirmation => {
      const mistakes = flatArrayNodesAndSpouses.filter((node) => {
        const nodeIdAndText = nodeIdsWithText.find(
          (n) => n.id === node.id.toString(),
        );

        const isCorrect = node.solution === nodeIdAndText?.text;

        return !isCorrect;
      });

      const isInheritanceCorrect = inheritance === exercise.affectedRule;

      if (
        mistakes.length === 0 &&
        (showInheritance ? isInheritanceCorrect : true)
      ) {
        onSuccess();
        return { isCorrect: true, isFinished: true };
      }
      onError(mistakes, isInheritanceCorrect);

      return {
        isCorrect: false,
        isFinished: sequenceType === MPMIExerciseSequenceType.ExamSimulator,
      };
    };

    useImperativeHandle(ref, () => ({
      onConfirm,
    }));

    return (
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="center" columnGap={14}>
          <Stack mt={4} justifySelf="flex-start !important">
            {nodes.length > 0
              ? getRomanNumeralSequence(getTreeMaxDepth(exercise.nodes)).map(
                  (i, index) => {
                    return (
                      <Typography
                        key={i}
                        height={
                          nodeSizeMap[currentBreakpoint] +
                          nodeSizeMap[currentBreakpoint] / 2 +
                          textFieldHeightPlusStackSpacing
                        }
                        mt={
                          index !== 0
                            ? `${nodeSizeMap[currentBreakpoint] - 20}px`
                            : undefined
                        }
                        fontSize={`${romanNumeralFontSizeMap[currentBreakpoint]} !important`}
                        color={theme.palette.grey[500]}
                      >
                        {i}
                      </Typography>
                    );
                  },
                )
              : null}
          </Stack>

          <Box
            width={(graphDimensions?.width || 0) + 100} // `+ 100` to have space for moving nodes when animating
            height={graphDimensions?.height || 0}
            sx={{
              ".react-flow": {
                overflow: "visible !important",
              },
              ".react-flow__pane": {
                cursor: "initial",
              },
              // Disable cursor change on nodes
              // We can not set the node to `selectable: false`because we want to be able to select the TextField,
              // so we change the cursor here instead
              ".react-flow__node": {
                cursor: "initial",
              },
              // Disable cursor change on edges
              // In V12 of ReactFlow it should be possible to make edges not selectable with the selectable prop
              ".react-flow__edge": {
                cursor: "initial",
              },
            }}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              nodeTypes={nodeTypes}
              connectionMode={ConnectionMode.Loose}
              preventScrolling={false}
              zoomOnDoubleClick={false}
              zoomOnPinch={false}
              zoomOnScroll={false}
              panOnDrag={false}
              panOnScroll={false}
              proOptions={{ hideAttribution: true }}
              defaultViewport={{ x: 0, y: 0, zoom: 1 }}
              translateExtent={[
                [0, 0],
                [graphDimensions?.width, graphDimensions?.height],
              ]}
              defaultEdgeOptions={{
                type: "step",
                style: {
                  stroke: theme.palette.grey[600],
                  strokeWidth: "2px",
                },
              }}
            />
          </Box>
        </Stack>

        {showInheritance && (
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Welcher Erbgang ist das?</Typography>

            <FormControl
              sx={{
                m: 1,
              }}
            >
              <InputLabel>Erbgang</InputLabel>

              <motion.div
                initial={{ scale: 0 }}
                animate={animationControls}
                variants={animationVariants}
              >
                <Select
                  id="inheritance"
                  value={inheritance}
                  onChange={handleChange}
                  disabled={isCurrentExerciseFinished}
                  label="Erbgang"
                  error={isInheritanceMistake}
                  onFocus={() => setIsInheritanceMistake(false)}
                  sx={{
                    width: 300,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: (t) =>
                        sequenceType ===
                          MPMIExerciseSequenceType.ExamSimulator &&
                        isCurrentExerciseFinished
                          ? isInheritanceMistake
                            ? `${t.palette.error.main} !important`
                            : `${t.palette.success.main} !important`
                          : undefined,
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>Bitte wähle einen Erbgang aus</em>
                  </MenuItem>

                  <MenuItem value={MPMIErbgang.AutosomalDominant}>
                    {MPMIErbgang.AutosomalDominant}
                  </MenuItem>

                  <MenuItem value={MPMIErbgang.AutosomalRezessiv}>
                    {MPMIErbgang.AutosomalRezessiv}
                  </MenuItem>

                  <MenuItem value={MPMIErbgang.XChromosomalDominant}>
                    {MPMIErbgang.XChromosomalDominant}
                  </MenuItem>

                  <MenuItem value={MPMIErbgang.XChromosomalRezessiv}>
                    {MPMIErbgang.XChromosomalRezessiv}
                  </MenuItem>
                </Select>
              </motion.div>
            </FormControl>
          </Stack>
        )}
      </Stack>
    );
  },
);

MPMIFamilyTree.displayName = "MPMIFamilyTree";
