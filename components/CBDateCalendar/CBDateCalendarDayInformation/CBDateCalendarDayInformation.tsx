import { SchoolRounded } from "@mui/icons-material";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  Stack,
} from "@mui/material";
import React from "react";
import { CBDateCalendarDayInformationProps } from "./CBDateCalendarDayInformationInterfaces";

export const CBDateCalendarDayInformation = ({
  id,
  anchorEl,
  isOpen,
  onClose,
  events,
}: CBDateCalendarDayInformationProps): JSX.Element => {
  return (
    <Popover
      id={id}
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Stack
        spacing={1}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <List sx={{ overflowY: "auto" }}>
          {events.map((e, index) => {
            const getMinutesInCorrectFormat =
              e.date.minute() < 10 ? `0${e.date.minute()}` : e.date.minute();

            return (
              // eslint-disable-next-line react/no-array-index-key
              <React.Fragment key={index}>
                {index !== 0 && <Divider />}

                <ListItem>
                  <ListItemIcon>{e.icon || <SchoolRounded />}</ListItemIcon>

                  <ListItemText
                    primary={e.title}
                    secondary={`${e.date.hour()}:${getMinutesInCorrectFormat} Uhr`}
                  />
                </ListItem>
              </React.Fragment>
            );
          })}
        </List>
      </Stack>
    </Popover>
  );
};
