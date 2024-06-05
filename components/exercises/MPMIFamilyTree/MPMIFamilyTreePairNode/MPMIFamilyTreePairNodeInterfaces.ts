import { BoxProps } from "@mui/material";
import { Node, NodeProps } from "reactflow";
import { MPMIFamilyTreeNodeData } from "../MPMIFamilyTreeNode/MPMIFamilyTreeNodeInterfaces";

export type MPMIFamilyTreePairNodeData = {
  nodeSize: number;
  lineColor?: string;
  lineWidth: BoxProps["height"];
  textFieldHeightPlusStackSpacing: number;
  nodeLeft: MPMIFamilyTreeNodeData;
  nodeRight: MPMIFamilyTreeNodeData;
};

export type MPMIFamilyTreePairNodeType = Node<MPMIFamilyTreePairNodeData>;

export type MPMIFamilyTreePairNodeProps = NodeProps<MPMIFamilyTreePairNodeData>;
