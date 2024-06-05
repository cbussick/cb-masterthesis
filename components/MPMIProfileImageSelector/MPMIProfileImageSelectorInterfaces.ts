export interface MPMIProfileImageSelectorProps {
  onSelect: (selectedImage: string) => void;
}

export interface MPMIProfilePicture {
  src: string;
  srcLocked: string;
  alt: string;
  unlockLevel: number;
}
