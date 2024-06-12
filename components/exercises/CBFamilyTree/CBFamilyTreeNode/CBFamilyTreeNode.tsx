"use client";

import { Stack } from "@mui/material";
import { CSSProperties } from "react";
import { Handle, HandleProps, Position } from "reactflow";
import { CBFamilyTreeNodeRaw } from "../CBFamilyTreeNodeRaw/CBFamilyTreeNodeRaw";
import { CBFamilyTreeNodeProps } from "./CBFamilyTreeNodeInterfaces";

export const commonHandleProps: Partial<HandleProps> & {
  style?: CSSProperties;
} = {
  isConnectable: false,
  style: { visibility: "hidden" },
};

export const CBFamilyTreeNode = ({
  data,
}: CBFamilyTreeNodeProps): JSX.Element => {
  return (
    <>
      <Handle
        id={Position.Top}
        type="target"
        position={Position.Top}
        {...commonHandleProps}
        style={{
          ...commonHandleProps.style,
          top: 0,
        }}
      />

      <Stack direction="row">
        <Handle
          id={Position.Left}
          type="target"
          position={Position.Left}
          {...commonHandleProps}
          style={{
            ...commonHandleProps.style,
            left: 0,
          }}
        />

        <CBFamilyTreeNodeRaw {...data} />

        <Handle
          id={Position.Right}
          type="source"
          position={Position.Right}
          {...commonHandleProps}
          style={{
            ...commonHandleProps.style,
            right: 0,
          }}
        />
      </Stack>

      <Handle
        id={Position.Bottom}
        type="source"
        position={Position.Bottom}
        {...commonHandleProps}
        style={{
          ...commonHandleProps.style,
          bottom: 0,
        }}
      />
    </>
  );
};
