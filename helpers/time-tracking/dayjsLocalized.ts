import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import isoWeek from "dayjs/plugin/isoWeek";

import de from "dayjs/locale/de";

const dayjsLocalized = dayjs;
dayjs.extend(duration);
dayjs.extend(isoWeek);

dayjsLocalized.locale({
  ...de,
  weekStart: 1,
});

export { dayjsLocalized };
