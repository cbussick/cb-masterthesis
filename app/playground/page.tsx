"use client";

import { MPMIContentWrapper } from "@/components/MPMIContentWrapper/MPMIContentWrapper";
import { MPMIInfoCard } from "@/components/MPMIInfoCard/MPMIInfoCard";
import { MPMIPageHeader } from "@/components/MPMIPageHeader/MPMIPageHeader";
import { MPMIStudentDataTable } from "@/components/MPMIStudentDataTable/MPMIStudentDataTable";
import { Grid2Props, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const commonGridItemProps: Grid2Props = {
  xs: 6,
  lg: 6,
};
export default function Playground() {
  return (
    <MPMIContentWrapper bgcolor={(t) => t.palette.background.default}>
      <MPMIPageHeader title="Playground" />

      <Stack spacing={3}>
        <MPMIStudentDataTable />

        <Grid container spacing={3}>
          <Grid {...commonGridItemProps}>
            <MPMIInfoCard image="/avatar/avatar-class.png" text="Klasse 11b" />
          </Grid>
        </Grid>
      </Stack>
    </MPMIContentWrapper>
  );
}
