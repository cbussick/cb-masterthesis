/**
 * Returns the enum value by its string value or `undefined` if the string value does not exist in the enum.
 */
export const getEnumValueByStringValue = <T extends {}>(
  enumeration: T,
  stringValue: string,
) => {
  const enumValue = Object.values(enumeration).find(
    (value) => value === stringValue,
  );

  return enumValue ? (enumValue as T[keyof T]) : undefined;
};
