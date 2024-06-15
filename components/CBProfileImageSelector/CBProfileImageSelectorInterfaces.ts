export interface CBProfileImageSelectorProps {
  onSelect: (selectedImage: string) => void;
}

export interface CBProfilePicture {
  src: string;
  alt: string;
  unlockLevel: number;
}
