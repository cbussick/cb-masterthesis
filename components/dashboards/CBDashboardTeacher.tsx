import { familyTreeExercises } from "@/data/exercises/CBFamilyTreeExercise";
import { freeformQuestionExercises } from "@/data/exercises/CBFreeformQuestionExercise";
import { matchingGameExercises } from "@/data/exercises/CBMatchingGameExercise";
import { quizExercises } from "@/data/exercises/CBQuizExercise";
import { swiperExercises } from "@/data/exercises/CBSwiperExercise";
import { Divider } from "@mui/material";
import Grid, { Grid2Props } from "@mui/material/Unstable_Grid2";
import { Stack } from "@mui/system";
import { CBDateCalendar } from "../CBDateCalendar/CBDateCalendar";
import { glossaryEntries } from "../CBGlossary/CBGlossaryEntries";
import { CBInfoCard } from "../CBInfoCard/CBInfoCard";
import { CBPageHeader } from "../CBPageHeader/CBPageHeader";
import { CBSimpleInfoCard } from "../CBSimpleInfoCard/CBSimpleInfoCard";

const commonGridItemProps: Grid2Props = {
  xs: 6,
  lg: 3,
};
export const CBDashboardTeacher = (): JSX.Element => {
  return (
    <Stack spacing={3}>
      <CBPageHeader
        title="Dashboard"
        subTitle="Erhalte einen Überblick über deine Klassen, bearbeite das Glossar und
          die Übungen oder erstelle einen Termin im Kalender."
      />

      <Stack spacing={2}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "space-between",
          }}
        >
          <Stack spacing={2} sx={{ width: "50%" }}>
            <CBSimpleInfoCard
              image="/topics/glossar.png"
              title="Glossar bearbeiten"
              subTitle={`Anzahl der Glossareinträge: ${glossaryEntries.length}`}
            />

            <CBSimpleInfoCard
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

          <CBDateCalendar />
        </Stack>

        <Divider sx={{ mt: 3, mb: 5 }} />

        <Grid container spacing={3}>
          <Grid {...commonGridItemProps}>
            <CBInfoCard
              image="/classroom/classroom-2.jpg"
              text="Klasse 11a"
              href="/lehrer-uebersicht"
            />
          </Grid>

          <Grid {...commonGridItemProps}>
            <CBInfoCard
              image="/classroom/classroom-1.jpg"
              text="Klasse 11b"
              href="/lehrer-uebersicht"
            />
          </Grid>

          <Grid {...commonGridItemProps}>
            <CBInfoCard
              image="/classroom/classroom-3.jpg"
              text="Klasse 11c"
              href="/lehrer-uebersicht"
            />
          </Grid>

          <Grid {...commonGridItemProps}>
            <CBInfoCard
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
