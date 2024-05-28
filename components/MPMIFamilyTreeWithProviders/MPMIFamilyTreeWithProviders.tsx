"use client";

import { ReactFlowProvider } from "reactflow";
import { FamilyTreeProvider } from "../MPMIFamilyTree/FamilyTreeProvider";
import { MPMIFamilyTree } from "../MPMIFamilyTree/MPMIFamilyTree";
import { MPMIFamilyTreeWithProvidersProps } from "./MPMIFamilyTreeWithProvidersInterfaces";

export const MPMIFamilyTreeWithProviders = ({
  exercise,
  sequenceType,
  componentRef,
}: MPMIFamilyTreeWithProvidersProps): JSX.Element => {
  return (
    <FamilyTreeProvider>
      <ReactFlowProvider>
        <MPMIFamilyTree
          exercise={exercise}
          sequenceType={sequenceType}
          ref={componentRef}
        />
      </ReactFlowProvider>
    </FamilyTreeProvider>
  );
};
