export enum MPMIMatchingGameHighlightComponentSide {
  Left = "left",
  Right = "right",
}

export interface MPMIMatchingGameHighlightComponent {
  id: number;
  name: string;
  // `x` is either the offset to the left or right, depending on `side`
  pointer: { x: number; y: number };
  side: MPMIMatchingGameHighlightComponentSide;
}
