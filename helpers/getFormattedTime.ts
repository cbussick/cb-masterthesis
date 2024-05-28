export const getFormattedTimeFromSeconds = (
  totalSeconds: number,
): { h: number; min: number } => {
  const totalHours = Math.floor(totalSeconds / (60 * 60));

  const totalMinutes = Math.floor((totalSeconds - totalHours * 60 * 60) / 60);
  return { h: totalHours, min: totalMinutes };
};
