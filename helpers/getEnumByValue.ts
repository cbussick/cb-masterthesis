export const getEnumKeyByValue = (enumeration: {}, value: any) => {
  return Object.keys(enumeration)[Object.values(enumeration).indexOf(value)];
};
