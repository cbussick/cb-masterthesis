import { ReactFlowProvider } from "reactflow";
import { CBFamilyTree } from "../CBFamilyTree";
import { FamilyTreeProvider } from "../FamilyTreeProvider";
import { CBFamilyTreeWithProvidersProps } from "./CBFamilyTreeWithProvidersInterfaces";

export const CBFamilyTreeWithProviders = ({
  exercise,
  componentRef,
}: CBFamilyTreeWithProvidersProps): JSX.Element => {
  return (
    <FamilyTreeProvider>
      <ReactFlowProvider>
        <CBFamilyTree exercise={exercise} ref={componentRef} />
      </ReactFlowProvider>
    </FamilyTreeProvider>
  );
};
