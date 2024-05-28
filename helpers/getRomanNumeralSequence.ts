import { getRomanNumerals } from "./getRomanNumerals";

/**
 * Returns a sequence of roman numerals from 1 to the given number.
 * @example
 * 5 -> ["I", "II", "III", "IV", "V"]
 */
export const getRomanNumeralSequence = (num: number): string[] => {
  const arrayOfNumbers = Array.from(Array(num + 1).keys()).slice(1);

  return getRomanNumerals(arrayOfNumbers);
};
