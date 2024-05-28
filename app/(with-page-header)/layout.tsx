"use client";

import { MPMIContentWrapper } from "@/components/MPMIContentWrapper/MPMIContentWrapper";
import { MPMIPageHeader } from "@/components/MPMIPageHeader/MPMIPageHeader";
import { MPMIRoute, routeMap } from "@/helpers/routes";
import { usePathname } from "next/navigation";

export default function WithPageHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const routeData = routeMap[pathname as MPMIRoute];

  return (
    <MPMIContentWrapper bgcolor={(t) => t.palette.background.default}>
      {routeData.route !== MPMIRoute.Pruefungssimulator && (
        <MPMIPageHeader title={routeData.title} subTitle={routeData.subtitle} />
      )}

      {children}
    </MPMIContentWrapper>
  );
}
