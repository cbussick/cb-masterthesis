import { Dayjs } from "dayjs";

export interface MPMIClassEvent {
  date: Dayjs;
  title: string;
  icon?: JSX.Element;
}

export const events: MPMIClassEvent[] = [
  // {
  //   date: dayjs(new Date(2024, 2, 20, 11, 30)),
  //   title: "Test am Berufskolleg",
  //   icon: <BiotechRounded />,
  // },
];
