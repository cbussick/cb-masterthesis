import { useContext } from "react";
import { FamilyTreeContext } from "./FamilyTreeProvider";

export const useFamilyTree = () => {
  const context = useContext(FamilyTreeContext);

  return context;
};
