/**
 * Takes a total number of seconds and returns an object with the corresponding hours, minutes and seconds.
 *
 * @example
 * calculateHoursAndMinutesAndSeconds(3661); // { hours: 1, minutes: 1, seconds: 1 }
 */
export const calculateHoursAndMinutesAndSeconds = (
  totalSeconds: number,
): { hours: number; minutes: number; seconds: number } => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  const seconds = totalSeconds - hours * 3600 - minutes * 60;

  return { hours, minutes, seconds };
};
