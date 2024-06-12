"use client";

import { CBFamilyTreeExerciseNode } from "@/data/exercises/CBFamilyTreeExercise";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";

interface NodeIdWithText {
  id: string;
  text: string;
}

interface FamilyTreeProviderProps {
  children: ReactNode;
}

interface FamilyTree {
  nodeIdsWithText: NodeIdWithText[];
  setNodeIdsWithText: Dispatch<SetStateAction<NodeIdWithText[]>>;
  flatArrayNodesAndSpouses: Pick<CBFamilyTreeExerciseNode, "id" | "solution">[];
  setFlatArrayNodesAndSpouses: Dispatch<
    SetStateAction<FamilyTree["flatArrayNodesAndSpouses"]>
  >;
}

const defaultFamilyTree: FamilyTree = {
  nodeIdsWithText: [],
  setNodeIdsWithText: () => {},
  flatArrayNodesAndSpouses: [],
  setFlatArrayNodesAndSpouses: () => {},
};

export const FamilyTreeContext = createContext<FamilyTree>(defaultFamilyTree);

export const FamilyTreeProvider = ({ children }: FamilyTreeProviderProps) => {
  // Stores the text of the TextField for each node
  const [nodeIdsWithText, setNodeIdsWithText] = useState<NodeIdWithText[]>(
    defaultFamilyTree.nodeIdsWithText,
  );

  const [flatArrayNodesAndSpouses, setFlatArrayNodesAndSpouses] = useState<
    FamilyTree["flatArrayNodesAndSpouses"]
  >(defaultFamilyTree.flatArrayNodesAndSpouses);

  return useMemo(
    () => (
      <FamilyTreeContext.Provider
        value={{
          nodeIdsWithText,
          setNodeIdsWithText,
          flatArrayNodesAndSpouses,
          setFlatArrayNodesAndSpouses,
        }}
      >
        {children}
      </FamilyTreeContext.Provider>
    ),
    [children, flatArrayNodesAndSpouses, nodeIdsWithText],
  );
};
