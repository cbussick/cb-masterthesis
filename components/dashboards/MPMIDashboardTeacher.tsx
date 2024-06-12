"use client";

import { familyTreeExercises } from "@/data/exercises/MPMIFamilyTreeExercise";
import { freeformQuestionExercises } from "@/data/exercises/MPMIFreeformQuestionExercise";
import { matchingGameExercises } from "@/data/exercises/MPMIMatchingGameExercise";
import { quizExercises } from "@/data/exercises/MPMIQuizExercise";
import { swiperExercises } from "@/data/exercises/MPMISwiperExercise";
import { Divider } from "@mui/material";
import Grid, { Grid2Props } from "@mui/material/Unstable_Grid2";
import { Stack } from "@mui/system";
import { MPMIDateCalendar } from "../MPMIDateCalendar/MPMIDateCalendar";
import { glossaryEntries } from "../MPMIGlossary/CBGlossaryEntries";
import { MPMIInfoCard } from "../MPMIInfoCard/MPMIInfoCard";
import { MPMIPageHeader } from "../MPMIPageHeader/MPMIPageHeader";
import { MPMISimpleInfoCard } from "../MPMISimpleInfoCard/MPMISimpleInfoCard";

const commonGridItemProps: Grid2Props = {
  xs: 6,
  lg: 3,
};
export const MPMIDashboardTeacher = (): JSX.Element => {
  return (
    <Stack spacing={3}>
      <MPMIPageHeader
        title="Dashboard"
        subTitle="Erhalte einen Überblick über deine Klassen, bearbeite das Glossar und
          die Übungen oder erstelle einen Termin im Kalender."
      />

      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Stack spacing={2} sx={{ width: "50%" }}>
            <MPMISimpleInfoCard
              image="/topics/glossar.png"
              title="Glossar bearbeiten"
              subTitle={`Anzahl der Glossareinträge: ${glossaryEntries.length}`}
            />

            <MPMISimpleInfoCard
              image="/topics/exercise.png"
              title="Übungen bearbeiten"
              subTitle={`Anzahl der Übungen: ${
                quizExercises.length +
                swiperExercises.length +
                matchingGameExercises.length +
                familyTreeExercises.length +
                freeformQuestionExercises.length
              }`}
            />
          </Stack>

          <MPMIDateCalendar />
        </Stack>

        <Divider sx={{ mt: 3, mb: 5 }} />

        <Grid container spacing={3}>
          <Grid {...commonGridItemProps}>
            <MPMIInfoCard
              image="/classroom/classroom-2.jpg"
              text="Klasse 11a"
              href="/lehrer-uebersicht"
            />
          </Grid>

          <Grid {...commonGridItemProps}>
            <MPMIInfoCard
              image="/classroom/classroom-1.jpg"
              text="Klasse 11b"
              href="/lehrer-uebersicht"
            />
          </Grid>

          <Grid {...commonGridItemProps}>
            <MPMIInfoCard
              image="/classroom/classroom-3.jpg"
              text="Klasse 11c"
              href="/lehrer-uebersicht"
            />
          </Grid>

          <Grid {...commonGridItemProps}>
            <MPMIInfoCard
              image="/classroom/classroom-4.jpg"
              text="Klasse 11c"
              href="/lehrer-uebersicht"
            />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};
