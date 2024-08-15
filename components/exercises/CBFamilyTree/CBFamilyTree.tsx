"use client";

import { CBExerciseDifficulty } from "@/data/exercises/CBExerciseDifficulty";
import {
  CBErbgang,
  CBErbgangRules,
  CBFamilyTreeExerciseNode,
} from "@/data/exercises/CBFamilyTreeExercise";
import { getFamilyTreePairNodeId } from "@/helpers/family-tree/getFamilyTreePairNodeId";
import { getRomanNumeralSequence } from "@/helpers/family-tree/getRomanNumeralSequence";
import { getTreeMaxDepth } from "@/helpers/family-tree/getTreeMaxDepth";
import { playCorrectSound } from "@/helpers/sounds/playCorrectSound";
import { playIncorrectSound } from "@/helpers/sounds/playIncorrectSound";
import { useCurrentMuiBreakpoint } from "@/helpers/useCurrentMuiBreakpoint";
import { themeSpacingFactor } from "@/theme/theme";
import { useCBExerciseSequenceSnackbar } from "@/ui/useCBExerciseSequenceSnackbar";
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
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
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
import { CBExerciseSequenceType } from "../../CBExerciseSequence/CBExerciseSequenceWrapperInterfaces";
import { useCBExerciseSequence } from "../../CBExerciseSequence/useCBExerciseSequenceProvider";
import { CBFamilyTreeProps, CBNodeType } from "./CBFamilyTreeInterfaces";
import { CBFamilyTreeNode } from "./CBFamilyTreeNode/CBFamilyTreeNode";
import {
  CBFamilyTreeNodeData,
  CBFamilyTreeNodeType,
  CBFamilyTreePairGender,
} from "./CBFamilyTreeNode/CBFamilyTreeNodeInterfaces";
import { selectWidth } from "./CBFamilyTreeNodeRaw/CBFamilyTreeNodeRaw";
import {
  CBFamilyTreePairNode,
  familyNodeSpacing,
  selectHeightPlusStackSpacing,
} from "./CBFamilyTreePairNode/CBFamilyTreePairNode";
import { CBFamilyTreePairNodeType } from "./CBFamilyTreePairNode/CBFamilyTreePairNodeInterfaces";
import { useFamilyTree } from "./useFamilyTree";

const graphBoxPadding = 2;
const ranksep = 50;

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

export const nodeTypes: Record<CBNodeType, (props: NodeProps) => JSX.Element> =
  {
    [CBNodeType.FamilyTreeNode]: CBFamilyTreeNode,
    [CBNodeType.FamilyTreePairNode]: CBFamilyTreePairNode,
  };

const commonNodeProps: Pick<
  CBFamilyTreeNodeType,
  "selectable" | "draggable" | "focusable" | "deletable" | "position"
> = {
  selectable: true,
  draggable: false,
  focusable: false,
  deletable: false,
  position: { x: 0, y: 0 },
};

const commonSingleNodeProps: Partial<CBFamilyTreeNodeType> &
  typeof commonNodeProps = {
  type: CBNodeType.FamilyTreeNode,
  ...commonNodeProps,
};

const commonPairNodeProps: Partial<CBFamilyTreePairNodeType> &
  typeof commonNodeProps = {
  type: CBNodeType.FamilyTreePairNode,
  ...commonNodeProps,
};

const commonParentToChildEdgeProps: Partial<Edge> = {
  sourceHandle: Position.Bottom,
  targetHandle: Position.Top,
};

export const CBFamilyTree = forwardRef(
  (
    { exercise, onCompleteExercise, onMistake }: CBFamilyTreeProps,
    ref,
  ): JSX.Element => {
    const theme = useTheme();
    const animationControls = useAnimationControls();
    const {
      setExercises,
      isCurrentExerciseFinished,
      setCurrentExerciseFinished,
      type,
    } = useCBExerciseSequence();
    const currentBreakpoint = useCurrentMuiBreakpoint();
    const { showSnackbar } = useCBExerciseSequenceSnackbar();
    const {
      nodeIdsWithText,
      flatArrayNodesAndSpouses,
      setFlatArrayNodesAndSpouses,
    } = useFamilyTree();

    const [inheritance, setInheritance] = useState("");
    const [isInheritanceMistake, setInheritanceMistake] =
      useState<boolean>(false);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);
    const [graphDimensions, setGraphDimensions] = useState<{
      width: number;
      height: number;
    }>({ width: 0, height: 0 });

    const showInheritance = exercise.difficulty === CBExerciseDifficulty.Hard;

    useEffect(() => {
      animationControls.start("show");
    }, [animationControls]);

    useEffect(() => {
      if (isInheritanceMistake) {
        animationControls.start("error");
      }
    }, [animationControls, isInheritanceMistake]);

    useEffect(() => {
      const commonNodeDataProps: Pick<CBFamilyTreeNodeData, "size"> = {
        size: nodeSizeMap[currentBreakpoint],
      };

      const commonSingleNodeDataProps: Pick<
        CBFamilyTreeNodeType["data"],
        "size" | "color"
      > &
        typeof commonNodeDataProps = {
        ...commonNodeDataProps,
      };

      const commonPairNodeDataProps: Pick<
        CBFamilyTreePairNodeType["data"],
        "nodeSize" | "lineWidth"
      > &
        typeof commonNodeDataProps = {
        nodeSize: nodeSizeMap[currentBreakpoint],
        lineWidth: "2px",
        ...commonNodeDataProps,
      };

      const singleNodes: CBFamilyTreeNodeType[] = exercise.nodes
        .filter((e) => e.spouse === undefined)
        .map((node) => {
          const nodeId = node.id.toString();

          return {
            id: nodeId,
            data: {
              nodeId,
              gender: node.gender,
              choices: exercise.choices,
              color: CBErbgangRules[exercise.affectedRule](node.solution)
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

      const pairNodes: CBFamilyTreePairNodeType[] = exercise.nodes
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

            let childData: CBFamilyTreeExerciseNode | undefined;
            let isSpouse;

            const childDataFromNodes = exercise.nodes.find(
              (n) => n.id === child,
            );
            // The partner of the child.
            // It can be either a spouse or a "normal" node.
            let childPartner: CBFamilyTreeExerciseNode | undefined;

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
                color: CBErbgangRules[exercise.affectedRule](node.solution)
                  ? affectedColor
                  : undefined,
                ...commonSingleNodeDataProps,
              },
              nodeRight: {
                nodeId: spouse?.id.toString() || "",
                gender: spouse?.gender || CBFamilyTreePairGender.Male,
                choices: exercise.choices,
                color: CBErbgangRules[exercise.affectedRule](
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
          ranksep,
        });

        rawNodes.forEach((node) => {
          dagreGraph.setNode(node.id, {
            width:
              node.type === CBNodeType.FamilyTreePairNode
                ? selectWidth * 2 + familyNodeSpacing
                : selectWidth,
            height:
              nodeSizeMap[currentBreakpoint] + selectHeightPlusStackSpacing,
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
          // eslint-disable-next-line no-param-reassign
          node.position = {
            x: nodeWithPosition.x - nodeWithPosition.width / 2,
            y: nodeWithPosition.y - nodeWithPosition.height / 2,
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

      // Makes it easier to iterate over all nodes
      const nodesAndSpousesAsFlatArray: Pick<
        CBFamilyTreeExerciseNode,
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

    useEffect(() => {
      let maxX = 0;
      let maxY = 0;
      nodes.forEach((node) => {
        if (node.width && node.height) {
          if (node.position.x + node.width > maxX) {
            maxX = node.position.x + node.width;
          }
          if (node.position.y + node.height > maxY) {
            maxY = node.position.y + node.height;
          }
        }
      });

      setGraphDimensions({ width: maxX, height: maxY });
    }, [nodes]);

    const showErrors = (
      mistakes: Pick<CBFamilyTreeExerciseNode, "id" | "solution">[],
      isInheritanceCorrect: boolean,
    ) => {
      const nodesWithHighlightedMistakes: Node[] = [];
      nodes.forEach((node) => {
        const isPairNode = node.type === CBNodeType.FamilyTreePairNode;

        if (isPairNode) {
          const nodeLeft = node.data?.nodeLeft as CBFamilyTreeNodeData;
          const nodeRight = node.data?.nodeRight as CBFamilyTreeNodeData;

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
      setInheritanceMistake(!isInheritanceCorrect);
    };

    const onConfirm: ButtonProps["onClick"] = () => {
      const mistakes = flatArrayNodesAndSpouses.filter((node) => {
        const nodeIdAndText = nodeIdsWithText.find(
          (n) => n.id === node.id.toString(),
        );

        const isCorrect = node.solution === nodeIdAndText?.text;

        return !isCorrect;
      });

      const isInheritanceCorrect = inheritance === exercise.affectedRule;

      const isCorrect =
        mistakes.length === 0 &&
        (showInheritance ? isInheritanceCorrect : true);

      const isFinished =
        isCorrect || type === CBExerciseSequenceType.ExamSimulator;

      if (isCorrect) {
        setCurrentExerciseFinished(true);

        onCompleteExercise({ exerciseId: exercise.id, isCorrect });

        setExercises((previousExercises) => {
          const newExercises = previousExercises.map((ex) => {
            if (ex.id === exercise.id) {
              return {
                ...ex,
                isCompleted: true,
              };
            }
            return ex;
          });

          return newExercises;
        });

        showSnackbar(
          "Alles richtig!",
          "Du hast die Übung erfolgreich abgeschlossen.",
          "success",
        );
        playCorrectSound();
      } else {
        if (isFinished) {
          setCurrentExerciseFinished(true);
          
          if (onMistake) {
            onMistake({
              id: exercise.id,
              topic: exercise.topic,
              type: exercise.type,
            });
          }
        } else {
          showSnackbar(
            "Fehler vorhanden",
            "Leider sind noch Fehler vorhanden. 😕 Überprüfe die rot umrandeten Textfelder.",
            "error",
          );
        }
        showErrors(mistakes, isInheritanceCorrect);
        playIncorrectSound();
      }
    };

    useImperativeHandle(ref, () => ({
      onConfirm,
    }));

    return (
      <Stack spacing={3}>
        <Stack
          direction="row"
          sx={{
            justifyContent: "center",
            columnGap: 14,
          }}
        >
          <Stack
            sx={{
              mt: graphBoxPadding,
              justifySelf: "flex-start !important",
            }}
          >
            {nodes.length > 0
              ? getRomanNumeralSequence(getTreeMaxDepth(exercise.nodes)).map(
                  (i, index) => {
                    return (
                      <Typography
                        key={i}
                        sx={{
                          height:
                            nodeSizeMap[currentBreakpoint] +
                            selectHeightPlusStackSpacing,
                          mt: index !== 0 ? `${ranksep}px` : undefined,
                          fontSize: `${romanNumeralFontSizeMap[currentBreakpoint]} !important`,
                          color: (t) => t.palette.grey[500],
                        }}
                      >
                        {i}
                      </Typography>
                    );
                  },
                )
              : null}
          </Stack>

          <Box
            sx={{
              // Add padding around the graph.
              // `* 2` to have padding on all sides, not just top and left.
              width:
                graphDimensions.width +
                graphBoxPadding * themeSpacingFactor * 2,
              height:
                graphDimensions.height +
                graphBoxPadding * themeSpacingFactor * 2,
              p: graphBoxPadding,
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
                pointerEvents: "none",
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
                [graphDimensions.width, graphDimensions.height],
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
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: "center",
            }}
          >
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
                  onChange={(event: SelectChangeEvent) => {
                    setInheritance(event.target.value);
                  }}
                  disabled={isCurrentExerciseFinished}
                  label="Erbgang"
                  error={isInheritanceMistake}
                  onFocus={() => setInheritanceMistake(false)}
                  sx={{
                    width: 300,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: (t) =>
                        // eslint-disable-next-line no-nested-ternary
                        type === CBExerciseSequenceType.ExamSimulator &&
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

                  <MenuItem value={CBErbgang.AutosomalDominant}>
                    {CBErbgang.AutosomalDominant}
                  </MenuItem>

                  <MenuItem value={CBErbgang.AutosomalRezessiv}>
                    {CBErbgang.AutosomalRezessiv}
                  </MenuItem>

                  <MenuItem value={CBErbgang.XChromosomalDominant}>
                    {CBErbgang.XChromosomalDominant}
                  </MenuItem>

                  <MenuItem value={CBErbgang.XChromosomalRezessiv}>
                    {CBErbgang.XChromosomalRezessiv}
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

CBFamilyTree.displayName = "CBFamilyTree";
