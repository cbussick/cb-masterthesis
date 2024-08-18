"use client";

import { calculateMinutesAndSeconds } from "@/helpers/time-tracking/calculateMinutesAndSeconds";
import { dayjsLocalized } from "@/helpers/time-tracking/dayjsLocalized";
import { getWeekdayIndex } from "@/helpers/time-tracking/getWeekdayIndex";
import { useTheme } from "@mui/material";
import { LineChart, LineChartProps } from "@mui/x-charts";
import { CBTrackedTimeGraphProps } from "./CBTrackedTimeGraphInterfaces";

const xAxisId = "x";
const yAxisId = "y";
const tickSize = 11;

export const CBTrackedTimeGraph = ({
  thisWeekTimes,
}: CBTrackedTimeGraphProps): JSX.Element => {
  const theme = useTheme();

  const today = dayjsLocalized();
  const todayIndex = getWeekdayIndex(today);

  const thisWeekData = [0, 0, 0, 0, 0, 0, 0].map((t, index) => {
    const existingTime = thisWeekTimes.find((time) => {
      const date = dayjsLocalized(new Date(time.date));
      const weekDayIndex = getWeekdayIndex(date);
      return weekDayIndex === index;
    });

    // If day is in the future, do not show any data point
    if (index > todayIndex) {
      return null;
    }
    if (existingTime) {
      // Transform time to minutes
      return existingTime.time >= 60 ? existingTime.time / 60 : 0;
    }
    return 0;
  });

  const hasNoTrackedTime = thisWeekData.every((t) => t === null || t === 0);

  // Necessary, so that the graph does not have the line in the middle when there is no tracked time.
  // Instead this will show the line at the bottom of the graph.
  const noTrackedTimeTickZeroFixData: LineChartProps["series"] = [
    // Can be ignored, because this allows hiding the tooltip for points in this series.
    // @ts-ignore
    { data: [1], valueFormatter: () => null, disableHighlight: true },
  ];

  const data: LineChartProps["series"] = [
    {
      data: thisWeekData,
      curve: "linear",
      valueFormatter: (v) => {
        if (v) {
          const totalSeconds = v * 60;
          const { minutes, seconds } = calculateMinutesAndSeconds(totalSeconds);

          const minutesStringPart =
            minutes === 0
              ? ""
              : `${minutes} ${minutes === 1 ? "Minute" : "Minuten"}`;

          const secondsStringPart =
            seconds === 0
              ? ""
              : `${seconds} ${seconds === 1 ? "Sekunde" : "Sekunden"}`;

          return `${minutesStringPart} ${secondsStringPart}`;
        }
        return "Keine Zeit erfasst";
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
        tickSize,
      }}
      bottomAxis={{
        axisId: xAxisId,
        tickSize,
      }}
      series={
        hasNoTrackedTime
          ? [...data, ...noTrackedTimeTickZeroFixData]
          : [...data]
      }
      colors={[theme.palette.primary.main]}
      // Leave `left: ...` here. Prevents the Y-Axis labels from being cut off.
      // The rest of the margin is specifiedto be as close to the edges of the container as possible
      // and not have any unnecessary space.
      margin={{ top: 7, right: 2, bottom: 25, left: 54 }}
      grid={{ horizontal: true }}
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
