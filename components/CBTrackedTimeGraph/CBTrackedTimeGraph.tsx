"use client";

import { getFormattedTimeFromSeconds } from "@/helpers/getFormattedTime";
import { getWeekdayIndex } from "@/helpers/getWeekdayIndex";
import { useTheme } from "@mui/material";
import { LineChart, LineChartProps } from "@mui/x-charts";
import dayjs from "dayjs";
import { CBTrackedTimeGraphProps } from "./CBTrackedTimeGraphInterfaces";

const xAxisId = "x";
const yAxisId = "y";

export const CBTrackedTimeGraph = ({
  lastWeekTimes,
}: CBTrackedTimeGraphProps): JSX.Element => {
  const theme = useTheme();

  const today = dayjs();
  const todayIndex = getWeekdayIndex(today);

  const lastWeekData = [0, 0, 0, 0, 0, 0, 0].map((t, index) => {
    const existingTime = lastWeekTimes.find((time) => {
      const date = new Date(time.date);
      const dateAsDayJs = dayjs(date);
      const weekDayIndex = getWeekdayIndex(dateAsDayJs);
      return weekDayIndex === index;
    });

    if (index > todayIndex) {
      return null;
    }
    if (existingTime) {
      return existingTime.time >= 60 ? existingTime.time / 60 : 0;
    }
    return 0;
  });

  const hasNoTrackedTime = lastWeekData.every((t) => t === null || t === 0);

  // Necessary, so that the graph does not have the line in the middle when there is no tracked time.
  // Instead, this will show the line at the bottom of the graph.
  const noTrackedTimeTickZeroFixData: LineChartProps["series"] = [
    // Can be ignored, because this allows hiding the tooltip for points in this series.
    // @ts-ignore
    { data: [1], valueFormatter: () => null, disableHighlight: true },
  ];

  const data: LineChartProps["series"] = [
    {
      data: lastWeekData,
      curve: "linear",
      valueFormatter: (v) => {
        if (v) {
          const formatted = getFormattedTimeFromSeconds(v * 60);
          const totalMinutes = formatted.h * 60 + formatted.min;

          return `${totalMinutes} ${totalMinutes === 1 ? "Minute" : "Minuten"}`;
        }
        return "0 Minuten";
      },
    },
  ];

  return (
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
      series={
        hasNoTrackedTime
          ? [...data, ...noTrackedTimeTickZeroFixData]
          : [...data]
      }
      colors={[theme.palette.primary.main]}
      // Leave `left: ...` here. Prevents the Y-Axis labels from being cut off.
      margin={{ top: 42, left: 68 }}
      sx={{
        ".MuiChartsAxis-label": {
          transform: "translateX(-10px) !important",
        },
        ".MuiMarkElement-series-auto-generated-id-1": {
          display: "none",
        },
      }}
    />
  );
};
