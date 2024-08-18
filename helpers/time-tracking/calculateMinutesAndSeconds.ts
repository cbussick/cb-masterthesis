/**
 * Takes a total number of seconds and returns an object with the corresponding minutes and seconds.
 *
 * @example
 * calculateMinutesAndSeconds(61); // { minutes: 1, seconds: 1 }
 */
export const calculateMinutesAndSeconds = (
  totalSeconds: number,
): { minutes: number; seconds: number } => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;

  return { minutes, seconds };
};
