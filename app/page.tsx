"use client";

import { MPMIContentWrapper } from "@/components/MPMIContentWrapper/MPMIContentWrapper";
import { MPMIDashboardAdmin } from "@/components/dashboards/MPMIDashboardAdmin";
import { MPMIDashboardStudent } from "@/components/dashboards/MPMIDashboardStudent";
import { MPMIDashboardTeacher } from "@/components/dashboards/MPMIDashboardTeacher";
import { useUser } from "@/firebase/useUser";
import { MPMIUserRole } from "@/firebase/userRole";
import { CircularProgress } from "@mui/material";

export default function Home() {
  const user = useUser();

  let dashboard;
  const userRole = user?.customData.role;

  if (userRole === MPMIUserRole.Student) {
    dashboard = <MPMIDashboardStudent />;
  } else if (userRole === MPMIUserRole.Teacher) {
    dashboard = <MPMIDashboardTeacher />;
  } else if (userRole === MPMIUserRole.Admin) {
    dashboard = <MPMIDashboardAdmin />;
  } else {
    dashboard = <CircularProgress />;
  }

  return (
    <MPMIContentWrapper bgcolor={(t) => t.palette.background.default}>
      {dashboard}
    </MPMIContentWrapper>
  );
}
