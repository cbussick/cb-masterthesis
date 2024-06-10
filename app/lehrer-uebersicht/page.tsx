"use client";

import { MPMIContentWrapper } from "@/components/MPMIContentWrapper/MPMIContentWrapper";
import { MPMIPageHeader } from "@/components/MPMIPageHeader/MPMIPageHeader";
import { MPMIStudentDataTable } from "@/components/MPMIStudentDataTable/MPMIStudentDataTable";
import { MPMIStudentOverviewGraphCard } from "@/components/MPMIStudentOverviewGraphCard/MPMIStudentOverviewGraphCard";
import { mitoseUnits, zelleUnits } from "@/data/topicWorld";
import { topics } from "@/data/topics";
import { themeWithResponsiveFontSizes as theme } from "@/theme/theme";
import { Grid2Props, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { LineChart, PieChart } from "@mui/x-charts";

const commonGridItemProps: Grid2Props = {
  xs: 6,
  lg: 4,
};
const xAxisId = "x";
const yAxisId = "y";

export default function LehrerUebersicht() {
  return (
    <MPMIContentWrapper bgcolor="white">
      <MPMIPageHeader title="Lehrer Übersicht" />

      <Stack spacing={3}>
        <MPMIStudentDataTable />

        <Grid container spacing={3}>
          <Grid {...commonGridItemProps}>
            <MPMIStudentOverviewGraphCard
              topBar={
                <Typography sx={{ color: theme.palette.grey[500] }}>
                  Themenwelt
                </Typography>
              }
              title="Stand der Schüler"
              graph={
                <PieChart
                  margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: 6,
                          label: `Thema: ${topics.zelle.name}, Einheit: ${zelleUnits[0].name}`,
                        },
                        {
                          id: 1,
                          value: 8,
                          label: `Thema: ${topics.zelle.name}, Einheit: ${zelleUnits[1].name}`,
                        },
                        {
                          id: 2,
                          value: 6,
                          label: `Thema: ${topics.zelle.name}, Einheit: ${zelleUnits[2].name}`,
                        },
                        {
                          id: 3,
                          value: 2,
                          label: `Thema: ${topics["mitose-meiose"].name}, Einheit: ${mitoseUnits[0].name}`,
                        },
                      ],
                    },
                  ]}
                  slotProps={{
                    legend: {
                      hidden: true,
                    },
                  }}
                  height={200}
                  colors={[
                    theme.palette.primary.dark,
                    theme.palette.secondary.dark,
                    theme.palette.primary.light,
                    theme.palette.secondary.light,
                  ]}
                />
              }
            />
          </Grid>

          <Grid {...commonGridItemProps}>
            <MPMIStudentOverviewGraphCard
              topBar={
                <Stack direction="row" justifyContent="space-between">
                  <Typography sx={{ color: theme.palette.grey[500] }}>
                    Freie Übung
                  </Typography>

                  <Typography sx={{ color: theme.palette.grey[500] }}>
                    Diese Woche
                  </Typography>
                </Stack>
              }
              title="Übungen"
              graph={
                <PieChart
                  margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                  series={[
                    {
                      data: [
                        { id: 0, value: 10, label: topics.zelle.name },
                        { id: 1, value: 15, label: topics["aufbau-dna"].name },
                        {
                          id: 2,
                          value: 20,
                          label: topics["mitose-meiose"].name,
                        },
                      ],
                    },
                  ]}
                  slotProps={{
                    legend: {
                      hidden: true,
                    },
                  }}
                  height={200}
                  colors={[
                    theme.palette.primary.dark,
                    theme.palette.secondary.main,
                    theme.palette.primary.light,
                  ]}
                />
              }
            />
          </Grid>

          <Grid {...commonGridItemProps}>
            <MPMIStudentOverviewGraphCard
              topBar={
                <Stack direction="row" justifyContent="space-between">
                  <Typography sx={{ color: theme.palette.grey[500] }}>
                    Allgemein
                  </Typography>

                  <Typography sx={{ color: theme.palette.grey[500] }}>
                    Diese Woche
                  </Typography>
                </Stack>
              }
              title="Verbrachte Zeit"
              graph={
                <LineChart
                  xAxis={[
                    {
                      id: xAxisId,
                      data: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
                      scaleType: "band",
                    },
                  ]}
                  yAxis={[
                    {
                      id: yAxisId,
                      label: "Minuten",
                      scaleType: "linear",
                      tickMinStep: 1,
                    },
                  ]}
                  leftAxis={{
                    axisId: yAxisId,
                    tickSize: 11,
                  }}
                  bottomAxis={{
                    axisId: xAxisId,
                    tickSize: 11,
                  }}
                  series={[{ data: [100, 50, 300] }]}
                  colors={[theme.palette.primary.main]}
                  height={200}
                  sx={{
                    marginLeft: 2,
                    overflow: "visible",
                    ".MuiChartsAxis-label": {
                      transform: "translateX(-10px) !important",
                    },
                  }}
                />
              }
            />
          </Grid>
        </Grid>
      </Stack>
    </MPMIContentWrapper>
  );
}
