export const getEnumRecordKeyByValue = <T extends string, U>(
  enumRecord: Record<T, U>,
  value: U,
): T | undefined => {
  const enumKey =
    Object.keys(enumRecord)[Object.values(enumRecord).indexOf(value)];

  return enumKey ? (enumKey as T) : undefined;
};
