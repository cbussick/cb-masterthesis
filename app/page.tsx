"use client";

import { CBContentWrapper } from "@/components/CBContentWrapper/CBContentWrapper";
import { CBDashboardAdmin } from "@/components/dashboards/CBDashboardAdmin";
import { CBDashboardStudent } from "@/components/dashboards/CBDashboardStudent";
import { CBDashboardTeacher } from "@/components/dashboards/CBDashboardTeacher";
import { useUser } from "@/firebase-client/useUser";
import { CBUserRole } from "@/firebase-client/userRole";
import { CircularProgress } from "@mui/material";

export default function Home() {
  const user = useUser();

  let dashboard;
  const userRole = user.customData.role;

  if (userRole === CBUserRole.Student) {
    dashboard = <CBDashboardStudent />;
  } else if (userRole === CBUserRole.Teacher) {
    dashboard = <CBDashboardTeacher />;
  } else if (userRole === CBUserRole.Admin) {
    dashboard = <CBDashboardAdmin />;
  } else {
    dashboard = <CircularProgress />;
  }

  return (
    <CBContentWrapper bgcolor={(t) => t.palette.background.default}>
      {dashboard}
    </CBContentWrapper>
  );
}
