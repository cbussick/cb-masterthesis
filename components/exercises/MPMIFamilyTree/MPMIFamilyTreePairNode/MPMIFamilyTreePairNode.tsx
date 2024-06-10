"use client";

import { Box, Stack, useTheme } from "@mui/material";
import { Handle, Position } from "reactflow";
import { commonHandleProps } from "../MPMIFamilyTreeNode/MPMIFamilyTreeNode";
import { MPMIFamilyTreeNodeRaw } from "../MPMIFamilyTreeNodeRaw/MPMIFamilyTreeNodeRaw";
import { MPMIFamilyTreePairNodeProps } from "./MPMIFamilyTreePairNodeInterfaces";

export const MPMIFamilyTreePairNode = ({
  data,
}: MPMIFamilyTreePairNodeProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Stack direction="row" justifyContent="center">
      <Box position="relative">
        <Handle
          id={Position.Left}
          type="source"
          position={Position.Top}
          {...commonHandleProps}
          style={{ top: 0, ...commonHandleProps.style }}
        />

        <MPMIFamilyTreeNodeRaw {...data.nodeLeft} />
      </Box>

      <Stack
        alignItems="center"
        height={data.nodeSize + data.textFieldHeightPlusStackSpacing}
        pt={3}
      >
        <Box
          width={data.nodeSize}
          height={data.lineWidth}
          bgcolor={data.lineColor || theme.palette.grey[600]}
        />

        <Box
          width={data.lineWidth}
          height={200}
          bgcolor={data.lineColor || theme.palette.grey[600]}
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

      <Box position="relative">
        <Handle
          id={Position.Right}
          type="source"
          position={Position.Top}
          {...commonHandleProps}
          style={{ top: 0, ...commonHandleProps.style }}
        />

        <MPMIFamilyTreeNodeRaw {...data.nodeRight} />
      </Box>
    </Stack>
  );
};
