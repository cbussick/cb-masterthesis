import { BoxProps } from "@mui/material";
import { Node, NodeProps } from "reactflow";
import { CBFamilyTreeNodeData } from "../CBFamilyTreeNode/CBFamilyTreeNodeInterfaces";

export type CBFamilyTreePairNodeData = {
  nodeSize: number;
  lineColor?: string;
  lineWidth: BoxProps["height"];
  textFieldHeightPlusStackSpacing: number;
  nodeLeft: CBFamilyTreeNodeData;
  nodeRight: CBFamilyTreeNodeData;
};

export type CBFamilyTreePairNodeType = Node<CBFamilyTreePairNodeData>;

export type CBFamilyTreePairNodeProps = NodeProps<CBFamilyTreePairNodeData>;
