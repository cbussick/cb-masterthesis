import { CBFamilyTreeExerciseNode } from "@/data/exercises/CBFamilyTreeExercise";

/**
 * Returns the max depth of the given family tree.
 */
export const getTreeMaxDepth = (nodes: CBFamilyTreeExerciseNode[]) => {
  let maxDepth = 0;

  const depthFirstSearch = (node: CBFamilyTreeExerciseNode, depth: number) => {
    if (!node) {
      return;
    }

    maxDepth = Math.max(maxDepth, depth);

    if (node.children) {
      node.children.forEach((childId) => {
        const childNode = nodes.find((n) => n.id === childId);
        if (childNode) {
          depthFirstSearch(childNode, depth + 1);
        }
      });
    }
  };

  nodes.forEach((node) => {
    depthFirstSearch(node, 1);
  });

  return maxDepth;
};
