"use client";

import { CBContentWrapper } from "@/components/CBContentWrapper/CBContentWrapper";
import { CBPageHeader } from "@/components/CBPageHeader/CBPageHeader";
import { CBRoute } from "@/helpers/routes";
import { useRouteData } from "@/helpers/useRouteData";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export default function WithPageHeaderLayout({
  children,
}: {
  children: ReactNode;
}) {
  const routeData = useRouteData();

  if (!routeData) {
    notFound();
  }

  return (
    <CBContentWrapper bgcolor={(t) => t.palette.background.default}>
      {routeData.route !== CBRoute.Pruefungssimulator && (
        <CBPageHeader title={routeData.title} subTitle={routeData.subtitle} />
      )}

      {children}
    </CBContentWrapper>
  );
}
