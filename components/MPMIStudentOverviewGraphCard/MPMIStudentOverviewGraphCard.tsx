"use client";

import { Card, Divider, Stack, Typography } from "@mui/material";
import { MPMIStudentOverviewGraphCardProps } from "./MPMIStudentOverviewGraphCardInterfaces";

export const MPMIStudentOverviewGraphCard = ({
  graph,
  title,
  topBar,
}: MPMIStudentOverviewGraphCardProps): JSX.Element => {
  return (
    <Card sx={{ borderRadius: 3, padding: 4 }}>
      <Stack spacing={2} justifyContent="center">
        <Stack>
          {topBar}

          <Typography variant="h3">{title}</Typography>
        </Stack>

        <Divider />

        {graph}
      </Stack>
    </Card>
  );
};
