export interface MPMIBreadcrumbLink {
  label: string;
  href: string;
}

export interface MPMIBreadcrumbsProps {
  previousLinks: MPMIBreadcrumbLink[];
  currentLabel?: string;
}
