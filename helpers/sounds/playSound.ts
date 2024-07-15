export const playSound = (sound: string) => {
  const audio = new Audio(`/sounds/${sound}`);
  audio.play();
};
