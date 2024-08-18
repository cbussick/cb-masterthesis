import { Dayjs } from "dayjs";

export interface CBClassEvent {
  date: Dayjs;
  title: string;
  icon?: JSX.Element;
}

export const events: CBClassEvent[] = [
  // {
  //   date: dayjsLocalized(new Date(2024, 7, 31, 11, 30)),
  //   title: "Test am Berufskolleg",
  //   icon: <BiotechRounded />,
  // },
];
