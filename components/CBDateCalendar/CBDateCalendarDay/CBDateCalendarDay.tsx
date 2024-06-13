"use client";

import { CBClassEvent } from "@/data/events";
import { Theme, Typography, useTheme } from "@mui/material";
import { PickersDay } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState } from "react";
import { CBDateCalendarDayInformation } from "../CBDateCalendarDayInformation/CBDateCalendarDayInformation";
import { CBDateCalendarDayProps } from "./CBDateCalendarDayInterfaces";

const highlightedDayColor = "#FFFF00";
const informationPopoverIdRaw = "information";

const getFontColor = (
  theme: Theme,
  selectedColor: string,
  selected: boolean,
  isHighlighted: boolean,
) => {
  if (selected) {
    if (isHighlighted) {
      return theme.palette.getContrastText(highlightedDayColor);
    }
    return theme.palette.getContrastText(selectedColor);
  }

  return isHighlighted
    ? theme.palette.getContrastText(highlightedDayColor)
    : "inherit";
};

export const CBDateCalendarDay = ({
  events = [],
  day,
  outsideCurrentMonth,
  selected,
  ...other
}: CBDateCalendarDayProps) => {
  const [informationAnchorEl, setInformationAnchorEl] =
    useState<HTMLElement | null>(null);

  const theme = useTheme();

  const selectedColor = theme.palette.primary.main;

  const isInPast = day.isBefore(dayjs());

  const highlightedDayEvents: CBClassEvent[] = events.filter(
    (event) => event.date.date() === day.date(),
  );

  const isHighlighted = highlightedDayEvents.length > 0;

  const isShowingInformation = Boolean(informationAnchorEl);
  const informationPopoverId = isShowingInformation
    ? informationPopoverIdRaw
    : undefined;

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setInformationAnchorEl(event.currentTarget);
  };

  return (
    <>
      <PickersDay
        {...other}
        day={day}
        outsideCurrentMonth={outsideCurrentMonth}
        selected={selected}
        onClick={onClick}
        sx={{
          color:
            // eslint-disable-next-line no-nested-ternary
            selected || (isHighlighted && !isInPast)
              ? (t) =>
                  `${getFontColor(
                    t,
                    selectedColor,
                    selected || false,
                    isHighlighted,
                  )} !important`
              : undefined,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            bgcolor: isHighlighted ? highlightedDayColor : undefined,
            py: 0.5,
            px: 0.75,
            borderRadius: 1,
          }}
        >
          {day.date()}
        </Typography>
      </PickersDay>

      {highlightedDayEvents.length > 0 && (
        <CBDateCalendarDayInformation
          id={informationPopoverId}
          anchorEl={informationAnchorEl}
          isOpen={isShowingInformation}
          onClose={() => setInformationAnchorEl(null)}
          events={highlightedDayEvents}
        />
      )}
    </>
  );
};
