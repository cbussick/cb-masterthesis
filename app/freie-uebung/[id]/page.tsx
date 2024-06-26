"use client";

import { CBBreadcrumbs } from "@/components/CBBreadcrumbs/CBBreadcrumbs";
import { CBContentWrapper } from "@/components/CBContentWrapper/CBContentWrapper";
import { CBInfoCard } from "@/components/CBInfoCard/CBInfoCard";
import { CBPageHeader } from "@/components/CBPageHeader/CBPageHeader";
import { exercisesData } from "@/data/exercises/CBExercise";
import { CBExerciseType } from "@/data/exercises/CBExerciseType";
import { familyTreeExercises } from "@/data/exercises/CBFamilyTreeExercise";
import { freeformQuestionExercises } from "@/data/exercises/CBFreeformQuestionExercise";
import { matchingGameExercises } from "@/data/exercises/CBMatchingGameExercise";
import { quizExercises } from "@/data/exercises/CBQuizExercise";
import { swiperExercises } from "@/data/exercises/CBSwiperExercise";
import { CBTopic, topics } from "@/data/topics";
import { useUser } from "@/firebase/useUser";
import { getEnumRecordObjectValueByStringKey } from "@/helpers/getEnumRecordObjectValueByStringKey";
import { CBRoute, retryMistakesPathSegment } from "@/helpers/routes";
import Grid, { Grid2Props } from "@mui/material/Unstable_Grid2";
import { notFound } from "next/navigation";

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
  const topic = params.id as CBTopic;
  const topicData = getEnumRecordObjectValueByStringKey(topics, topic);

  if (!topicData) {
    notFound();
  }

  const user = useUser();

  return (
    <CBContentWrapper bgcolor={(t) => t.palette.background.default}>
      <CBPageHeader
        title={
          <CBBreadcrumbs
            previousLinks={[
              { label: "Freie Übung", href: CBRoute.FreieUebung },
            ]}
            currentLabel={topicData.name || "Thema"}
          />
        }
      />

      <Grid container spacing={4}>
        {quizExercises.some((e) => e.topic === topic) && (
          <Grid {...commonGridItemProps}>
            <CBInfoCard
              text={exercisesData[CBExerciseType.Quiz].name}
              image="/topics/quiz.png"
              href={`${CBRoute.FreieUebung}/${topic}/${CBExerciseType.Quiz}`}
            />
          </Grid>
        )}

        {matchingGameExercises.some((e) => e.topic === topic) && (
          <Grid {...commonGridItemProps}>
            <CBInfoCard
              text={exercisesData[CBExerciseType.MatchingGame].name}
              image="/topics/matching-game.png"
              href={`${CBRoute.FreieUebung}/${topic}/${CBExerciseType.MatchingGame}`}
            />
          </Grid>
        )}

        {swiperExercises.some((e) => e.topic === topic) && (
          <Grid {...commonGridItemProps}>
            <CBInfoCard
              text={exercisesData[CBExerciseType.Swiper].name}
              image="/topics/swiper.png"
              href={`${CBRoute.FreieUebung}/${topic}/${CBExerciseType.Swiper}`}
            />
          </Grid>
        )}

        {familyTreeExercises.some((e) => e.topic === topic) && (
          <Grid {...commonGridItemProps}>
            <CBInfoCard
              text={exercisesData[CBExerciseType.FamilyTree].name}
              image="/topics/familytree.png"
              href={`${CBRoute.FreieUebung}/${topic}/${CBExerciseType.FamilyTree}`}
            />
          </Grid>
        )}

        {freeformQuestionExercises.some((e) => e.topic === topic) && (
          <Grid {...commonGridItemProps}>
            <CBInfoCard
              text={exercisesData[CBExerciseType.FreeformQuestion].name}
              image="/topics/freetext.png"
              href={`${CBRoute.FreieUebung}/${topic}/${CBExerciseType.FreeformQuestion}`}
            />
          </Grid>
        )}

        {user &&
          user.customData.mistakeExercises.find((e) => e.topic === topic) !==
            undefined && (
            <Grid {...commonGridItemProps}>
              <CBInfoCard
                text="Fehler wiederholen"
                image="/topics/repeat.png"
                href={`${CBRoute.FreieUebung}/${topic}/${retryMistakesPathSegment}`}
              />
            </Grid>
          )}
      </Grid>
    </CBContentWrapper>
  );
}
