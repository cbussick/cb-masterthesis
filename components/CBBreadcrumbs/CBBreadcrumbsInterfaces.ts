export interface CBBreadcrumbLink {
  label: string;
  href: string;
}

export interface CBBreadcrumbsProps {
  previousLinks: CBBreadcrumbLink[];
  currentLabel?: string;
}
