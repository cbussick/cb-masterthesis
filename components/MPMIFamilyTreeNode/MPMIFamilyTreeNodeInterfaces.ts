import { Node, NodeProps } from "reactflow";

export enum MPMIFamilyTreePairGender {
  Female = "female",
  Male = "male",
}

export type MPMIFamilyTreeNodeData = {
  nodeId: string;
  size: number;
  gender: MPMIFamilyTreePairGender;
  choices: string[];
  color?: string;
  isMistake?: boolean;
};

export type MPMIFamilyTreeNodeType = Node<MPMIFamilyTreeNodeData>;

export type MPMIFamilyTreeNodeProps = NodeProps<MPMIFamilyTreeNodeData>;
