import { ReactFlowProvider } from "reactflow";
import { CBFamilyTree } from "../CBFamilyTree";
import { FamilyTreeProvider } from "../FamilyTreeProvider";
import { CBFamilyTreeWithProvidersProps } from "./CBFamilyTreeWithProvidersInterfaces";

export const CBFamilyTreeWithProviders = ({
  exercise,
  onCompleteExercise,
  onMistake,
  componentRef,
}: CBFamilyTreeWithProvidersProps): JSX.Element => {
  return (
    <FamilyTreeProvider>
      <ReactFlowProvider>
        <CBFamilyTree
          exercise={exercise}
          onCompleteExercise={onCompleteExercise}
          onMistake={onMistake}
          ref={componentRef}
        />
      </ReactFlowProvider>
    </FamilyTreeProvider>
  );
};
