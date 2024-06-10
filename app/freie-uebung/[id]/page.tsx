"use client";

import { MPMIBreadcrumbs } from "@/components/MPMIBreadcrumbs/MPMIBreadcrumbs";
import { MPMIContentWrapper } from "@/components/MPMIContentWrapper/MPMIContentWrapper";
import { MPMIInfoCard } from "@/components/MPMIInfoCard/MPMIInfoCard";
import { MPMIPageHeader } from "@/components/MPMIPageHeader/MPMIPageHeader";
import { exercisesData } from "@/data/exercises/MPMIExercise";
import { MPMIExerciseType } from "@/data/exercises/MPMIExerciseType";
import { familyTreeExercises } from "@/data/exercises/MPMIFamilyTreeExercise";
import { freeformQuestionExercises } from "@/data/exercises/MPMIFreeformQuestionExercise";
import { matchingGameExercises } from "@/data/exercises/MPMIMatchingGameExercise";
import { quizExercises } from "@/data/exercises/MPMIQuizExercise";
import { swiperExercises } from "@/data/exercises/MPMISwiperExercise";
import { MPMITopic, topics } from "@/data/topics";
import { useUser } from "@/firebase/useUser";
import { MPMIRoute, retryMistakesPathSegment } from "@/helpers/routes";
import Grid, { Grid2Props } from "@mui/material/Unstable_Grid2";

const commonGridItemProps: Grid2Props = {
  xs: 6,
  lg: 4,
};

interface FreePracticeSubpageParams {
  params: {
    id: string;
  };
}

export default function FreePracticeSubpage({
  params,
}: FreePracticeSubpageParams) {
  const topic = params.id as MPMITopic;
  const topicData = topics[topic];

  const user = useUser();

  return (
    <MPMIContentWrapper bgcolor={(t) => t.palette.background.default}>
      <MPMIPageHeader
        title={
          <MPMIBreadcrumbs
            previousLinks={[
              { label: "Freie Übung", href: MPMIRoute.FreieUebung },
            ]}
            currentLabel={topicData.name || "Thema"}
          />
        }
      />

      <Grid container spacing={4}>
        {quizExercises.some((e) => e.topic === topic) && (
          <Grid {...commonGridItemProps}>
            <MPMIInfoCard
              text={exercisesData[MPMIExerciseType.Quiz].name}
              image="/topics/quiz.png"
              href={`${MPMIRoute.FreieUebung}/${topic}/${MPMIExerciseType.Quiz}`}
            />
          </Grid>
        )}

        {matchingGameExercises.some((e) => e.topic === topic) && (
          <Grid {...commonGridItemProps}>
            <MPMIInfoCard
              text={exercisesData[MPMIExerciseType.MatchingGame].name}
              image="/topics/matching-game.png"
              href={`${MPMIRoute.FreieUebung}/${topic}/${MPMIExerciseType.MatchingGame}`}
            />
          </Grid>
        )}

        {swiperExercises.some((e) => e.topic === topic) && (
          <Grid {...commonGridItemProps}>
            <MPMIInfoCard
              text={exercisesData[MPMIExerciseType.Swiper].name}
              image="/topics/swiper.png"
              href={`${MPMIRoute.FreieUebung}/${topic}/${MPMIExerciseType.Swiper}`}
            />
          </Grid>
        )}

        {familyTreeExercises.some((e) => e.topic === topic) && (
          <Grid {...commonGridItemProps}>
            <MPMIInfoCard
              text={exercisesData[MPMIExerciseType.FamilyTree].name}
              image="/topics/familytree.png"
              href={`${MPMIRoute.FreieUebung}/${topic}/${MPMIExerciseType.FamilyTree}`}
            />
          </Grid>
        )}

        {freeformQuestionExercises.some((e) => e.topic === topic) && (
          <Grid {...commonGridItemProps}>
            <MPMIInfoCard
              text={exercisesData[MPMIExerciseType.FreeformQuestion].name}
              image="/topics/freetext.png"
              href={`${MPMIRoute.FreieUebung}/${topic}/${MPMIExerciseType.FreeformQuestion}`}
            />
          </Grid>
        )}

        {user &&
          user.customData.mistakeExercises.find((e) => e.topic === topic) !==
            undefined && (
            <Grid {...commonGridItemProps}>
              <MPMIInfoCard
                text="Fehler wiederholen"
                image="/topics/repeat.png"
                href={`${MPMIRoute.FreieUebung}/${topic}/${retryMistakesPathSegment}`}
              />
            </Grid>
          )}
      </Grid>
    </MPMIContentWrapper>
  );
}
