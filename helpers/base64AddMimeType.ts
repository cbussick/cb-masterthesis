export const base64AddMimeType = (base64: string, mimeType: string): string => {
  return `data:${mimeType};base64,${base64}`;
};
