const romanNumerals = [
  { numeral: "M", value: 1000 },
  { numeral: "CM", value: 900 },
  { numeral: "D", value: 500 },
  { numeral: "CD", value: 400 },
  { numeral: "C", value: 100 },
  { numeral: "XC", value: 90 },
  { numeral: "L", value: 50 },
  { numeral: "XL", value: 40 },
  { numeral: "X", value: 10 },
  { numeral: "IX", value: 9 },
  { numeral: "V", value: 5 },
  { numeral: "IV", value: 4 },
  { numeral: "I", value: 1 },
];

/**
 * Gets the roman numeral equivalent for the given number.
 * @example
 * 1 -> "I"
 */
export const getRomanNumeral = (num: number): string => {
  let result = "";
  let rawNumber = num;

  romanNumerals.forEach((romanNumeral) => {
    while (rawNumber >= romanNumeral.value) {
      result += romanNumeral.numeral;
      rawNumber -= romanNumeral.value;
    }
  });

  return result;
};

/**
 * Gets the roman numeral equivalents for the given numbers.
 * @example
 * [1, 2, 3, 4, 5] -> ["I", "II", "III", "IV", "V"]
 */
export const getRomanNumerals = (nums: number[]): string[] => {
  return nums.map((num) => getRomanNumeral(num));
};
