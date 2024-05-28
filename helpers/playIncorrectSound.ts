export const playIncorrectSound = () => {
  const audio = new Audio("/sounds/false.wav");

  audio.play();
};
