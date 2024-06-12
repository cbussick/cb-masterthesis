import { Node, NodeProps } from "reactflow";

export enum CBFamilyTreePairGender {
  Female = "female",
  Male = "male",
}

export type CBFamilyTreeNodeData = {
  nodeId: string;
  size: number;
  gender: CBFamilyTreePairGender;
  choices: string[];
  color?: string;
  isMistake?: boolean;
};

export type CBFamilyTreeNodeType = Node<CBFamilyTreeNodeData>;

export type CBFamilyTreeNodeProps = NodeProps<CBFamilyTreeNodeData>;
