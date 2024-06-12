"use client";

import { CBClassEvent, events } from "@/data/events";
import { useIsServerSide } from "@/helpers/useIsServerSide";
import { CircularProgress } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/de";
import { useState } from "react";
import { CBDateCalendarDay } from "./CBDateCalendarDay/CBDateCalendarDay";

const spacing = 0.5;

const getEventsInCurrentMonth = (date: Dayjs) => {
  const currentMonth = date.month();
  const eventsInCurrentMonth = events.filter(
    (e) => e.date.month() === currentMonth,
  );
  return eventsInCurrentMonth;
};

export const CBDateCalendar = (): JSX.Element => {
  const currentDate = dayjs();
  const [calendarEvents, setCalendarEvents] = useState<CBClassEvent[]>(
    getEventsInCurrentMonth(currentDate),
  );

  const handleMonthChange = (date: Dayjs) => {
    const eventsInCurrentMonth = getEventsInCurrentMonth(date);

    setCalendarEvents(eventsInCurrentMonth);
  };

  const isServerSide = useIsServerSide();
  if (isServerSide) {
    return <CircularProgress />;
  }

  return (
    <DateCalendar
      readOnly
      defaultValue={currentDate}
      onMonthChange={handleMonthChange}
      // Leave this here. For whatever reason, it changes the day of the week format from e.g. "M" to "Mo".
      dayOfWeekFormatter={(date) => {
        return date;
      }}
      disablePast
      views={["day"]}
      slots={{
        day: CBDateCalendarDay,
      }}
      slotProps={{
        // @ts-ignore
        day: { events: calendarEvents },
      }}
      sx={{
        overflow: "visible",
        "& .MuiPickersCalendarHeader-root": {
          pl: 2,
          mt: 0,
        },
        "& .MuiPickersCalendarHeader-labelContainer": {
          pointerEvents: "none",
        },
        "& .MuiPickersCalendarHeader-label": {
          fontSize: (t) => t.typography.h3.fontSize,
        },
        "& .MuiDayCalendar-weekDayLabel": {
          fontSize: (t) => t.typography.body2.fontSize,
          fontWeight: (t) => t.typography.fontWeightMedium,
          color: (t) => t.palette.text.primary,
          m: spacing,
        },
        "& .MuiPickersDay-root": {
          m: spacing,
        },
      }}
    />
  );
};
