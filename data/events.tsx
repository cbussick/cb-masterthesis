import { Dayjs } from "dayjs";

export interface CBClassEvent {
  date: Dayjs;
  title: string;
  icon?: JSX.Element;
}

export const events: CBClassEvent[] = [
  // {
  //   date: dayjs(new Date(2024, 2, 20, 11, 30)),
  //   title: "Test am Berufskolleg",
  //   icon: <BiotechRounded />,
  // },
];
