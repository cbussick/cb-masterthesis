/**
 * Returns the id for the pair node of the given node and spouse.
 */
export const getFamilyTreePairNodeId = (nodeId: string, spouseId: string) =>
  `${nodeId}_${spouseId}-pair`;
