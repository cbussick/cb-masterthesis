"use client";

import { CBClassEvent, events } from "@/data/events";
import { dayjsLocalized } from "@/helpers/time-tracking/dayjsLocalized";
import {
  DateCalendar,
  dayCalendarClasses,
  pickersCalendarHeaderClasses,
  pickersDayClasses,
} from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
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
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjsLocalized());
  const [calendarEvents, setCalendarEvents] = useState<CBClassEvent[]>(
    getEventsInCurrentMonth(currentDate),
  );

  const handleMonthChange = (date: Dayjs) => {
    const eventsInCurrentMonth = getEventsInCurrentMonth(date);

    setCalendarEvents(eventsInCurrentMonth);
  };

  return (
    <DateCalendar
      readOnly
      value={currentDate}
      onChange={(value) => setCurrentDate(value)}
      onMonthChange={handleMonthChange}
      dayOfWeekFormatter={(date) => {
        return date.format("dd");
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
        [`& .${pickersCalendarHeaderClasses.root}`]: {
          pl: 1.5,
          mt: 0,
        },
        [`& .${pickersCalendarHeaderClasses.labelContainer}`]: {
          pointerEvents: "none",
        },
        [`& .${pickersCalendarHeaderClasses.label}`]: {
          fontSize: (t) => t.typography.h3.fontSize,
        },
        [`& .${dayCalendarClasses.weekDayLabel}`]: {
          fontSize: (t) => t.typography.body2.fontSize,
          fontWeight: (t) => t.typography.fontWeightMedium,
          color: (t) => t.palette.text.primary,
          m: spacing,
        },
        [`& .${pickersDayClasses.root}`]: {
          m: spacing,
        },
      }}
    />
  );
};
