export interface CBProfileImageSelectorProps {
  onSelect: (selectedImage: string) => void;
}

export interface CBProfilePicture {
  src: string;
  srcLocked: string;
  alt: string;
  unlockLevel: number;
}
