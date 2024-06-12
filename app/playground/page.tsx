"use client";

import { CBContentWrapper } from "@/components/CBContentWrapper/CBContentWrapper";
import { CBInfoCard } from "@/components/CBInfoCard/CBInfoCard";
import { CBPageHeader } from "@/components/CBPageHeader/CBPageHeader";
import { CBStudentDataTable } from "@/components/CBStudentDataTable/CBStudentDataTable";
import { Grid2Props, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const commonGridItemProps: Grid2Props = {
  xs: 6,
  lg: 6,
};
export default function Playground() {
  return (
    <CBContentWrapper bgcolor={(t) => t.palette.background.default}>
      <CBPageHeader title="Playground" />

      <Stack spacing={3}>
        <CBStudentDataTable />

        <Grid container spacing={3}>
          <Grid {...commonGridItemProps}>
            <CBInfoCard image="/avatar/avatar-class.png" text="Klasse 11b" />
          </Grid>
        </Grid>
      </Stack>
    </CBContentWrapper>
  );
}
