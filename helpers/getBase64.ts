/**
 * Converts an image URL to a base64 string.
 */
export const getBase64 = async (
  imageUrl: string,
): Promise<string | ArrayBuffer | null> => {
  const res = await fetch(imageUrl);
  const blob = await res.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(blob);
  });
};
