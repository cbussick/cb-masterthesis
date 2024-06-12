"use client";

import { CBContentWrapper } from "@/components/CBContentWrapper/CBContentWrapper";
import { CBPageHeader } from "@/components/CBPageHeader/CBPageHeader";
import { CBRoute, routeMap } from "@/helpers/routes";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function WithPageHeaderLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const routeData = routeMap[pathname as CBRoute];

  return (
    <CBContentWrapper bgcolor={(t) => t.palette.background.default}>
      {routeData.route !== CBRoute.Pruefungssimulator && (
        <CBPageHeader title={routeData.title} subTitle={routeData.subtitle} />
      )}

      {children}
    </CBContentWrapper>
  );
}
