/**
 * Takes a record where the keys are enum values and the values are objects as well as a string value which should
 * correspond to a key in the enum record. Returns the object value or undefined if the provided string value
 * is not a key in the enum record.
 */
export const getEnumRecordObjectValueByStringKey = <T>(
  enumRecord: Record<any, T>,
  stringValue: string,
): T | undefined => {
  const stringCastToObject = stringValue as T;

  const objectValue =
    enumRecord[stringCastToObject] === undefined
      ? undefined
      : enumRecord[stringCastToObject];

  return objectValue;
};
