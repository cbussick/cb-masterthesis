import { Card, Divider, Stack, Typography } from "@mui/material";
import { CBStudentOverviewGraphCardProps } from "./CBStudentOverviewGraphCardInterfaces";

export const CBStudentOverviewGraphCard = ({
  graph,
  title,
  topBar,
}: CBStudentOverviewGraphCardProps): JSX.Element => {
  return (
    <Card sx={{ p: 4 }}>
      <Stack
        spacing={2}
        sx={{
          justifyContent: "center",
        }}
      >
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
