export const formatTime = (seconds: number): string => {
  const [x, y] = [Math.floor(seconds / 60), seconds % 60];
  const second = y.toString().length === 1 ? "0" + y : y;

  return `${x}:${second}`;
};
