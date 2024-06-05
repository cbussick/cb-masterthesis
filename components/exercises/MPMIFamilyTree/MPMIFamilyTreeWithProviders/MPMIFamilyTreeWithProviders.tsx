"use client";

import { ReactFlowProvider } from "reactflow";
import { FamilyTreeProvider } from "../FamilyTreeProvider";
import { MPMIFamilyTree } from "../MPMIFamilyTree";
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
