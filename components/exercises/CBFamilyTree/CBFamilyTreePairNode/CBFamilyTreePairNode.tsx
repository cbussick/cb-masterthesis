"use client";

import { Box, Stack } from "@mui/material";
import { Handle, Position } from "reactflow";
import { commonHandleProps } from "../CBFamilyTreeNode/CBFamilyTreeNode";
import {
  CBFamilyTreeNodeRaw,
  selectHeight,
} from "../CBFamilyTreeNodeRaw/CBFamilyTreeNodeRaw";
import { CBFamilyTreePairNodeProps } from "./CBFamilyTreePairNodeInterfaces";

export const selectHeightPlusStackSpacing = selectHeight + 8;

export const CBFamilyTreePairNode = ({
  data,
}: CBFamilyTreePairNodeProps): JSX.Element => {
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Handle
          id={Position.Left}
          type="source"
          position={Position.Top}
          {...commonHandleProps}
          style={{ top: 0, ...commonHandleProps.style }}
        />

        <CBFamilyTreeNodeRaw {...data.nodeLeft} />
      </Box>

      <Stack
        sx={{
          alignItems: "center",
          pt: 3,
          height: data.nodeSize + selectHeightPlusStackSpacing,
        }}
      >
        <Box
          sx={{
            width: data.nodeSize,
            height: data.lineWidth,
            bgcolor: (t) => data.lineColor || t.palette.grey[600],
          }}
        />

        <Box
          sx={{
            width: data.lineWidth,
            height: 200,
            bgcolor: (t) => data.lineColor || t.palette.grey[600],
          }}
        />

        <Handle
          id={Position.Bottom}
          type="source"
          position={Position.Bottom}
          {...commonHandleProps}
          style={{
            ...commonHandleProps.style,
            bottom: 20,
          }}
        />
      </Stack>

      <Box
        sx={{
          position: "relative",
        }}
      >
        <Handle
          id={Position.Right}
          type="source"
          position={Position.Top}
          {...commonHandleProps}
          style={{ top: 0, ...commonHandleProps.style }}
        />

        <CBFamilyTreeNodeRaw {...data.nodeRight} />
      </Box>
    </Stack>
  );
};
