"use client";

import { CBBreadcrumbs } from "@/components/CBBreadcrumbs/CBBreadcrumbs";
import { CBContentWrapper } from "@/components/CBContentWrapper/CBContentWrapper";
import { CBDialog } from "@/components/CBDialog/CBDialog";
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
import { useUser } from "@/firebase-client/useUser";
import { getEnumRecordObjectValueByStringKey } from "@/helpers/getEnumRecordObjectValueByStringKey";
import { getEnumValueByStringValue } from "@/helpers/getEnumValueByStringValue";
import { CBRoute, retryMistakesPathSegment } from "@/helpers/routes";
import { Button, Stack, TextField, Typography } from "@mui/material";
import Grid, { Grid2Props } from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/system";
import { notFound } from "next/navigation";
import { useState } from "react";

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
  const topic = getEnumValueByStringValue(CBTopic, params.id);
  const topicData = topic && getEnumRecordObjectValueByStringKey(topics, topic);

  if (!topicData) {
    notFound();
  }

  const { incorrectExercises } = useUser();

  const [hasAccessToAI, setAccessToAI] = useState<boolean>(false);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [aiAccessText, setAIAccessText] = useState<string>("");

  return (
    <>
      <CBContentWrapper bgcolor={(t) => t.palette.background.default}>
        <CBPageHeader
          title={
            <CBBreadcrumbs
              previousLinks={[
                { label: "Freie Übung", href: CBRoute.FreieUebung },
              ]}
              currentLabel={topicData.name}
            />
          }
        />

        <Grid container spacing={4}>
          {quizExercises.some((e) => e.topic === topic) && (
            <Grid {...commonGridItemProps}>
              <CBInfoCard
                text={exercisesData[CBExerciseType.Quiz].name}
                image={{ src: "/topics/quiz.png", alt: "Quiz" }}
                href={`${CBRoute.FreieUebung}/${topic}/${CBExerciseType.Quiz}`}
              />
            </Grid>
          )}

          {matchingGameExercises.some((e) => e.topic === topic) && (
            <Grid {...commonGridItemProps}>
              <CBInfoCard
                text={exercisesData[CBExerciseType.MatchingGame].name}
                image={{ src: "/topics/matching-game.png", alt: "Puzzleteile" }}
                href={`${CBRoute.FreieUebung}/${topic}/${CBExerciseType.MatchingGame}`}
              />
            </Grid>
          )}

          {swiperExercises.some((e) => e.topic === topic) && (
            <Grid {...commonGridItemProps}>
              <CBInfoCard
                text={exercisesData[CBExerciseType.Swiper].name}
                image={{ src: "/topics/swiper.png", alt: "Swiper" }}
                href={`${CBRoute.FreieUebung}/${topic}/${CBExerciseType.Swiper}`}
              />
            </Grid>
          )}

          {familyTreeExercises.some((e) => e.topic === topic) && (
            <Grid {...commonGridItemProps}>
              <CBInfoCard
                text={exercisesData[CBExerciseType.FamilyTree].name}
                image={{
                  src: "/topics/familytree.png",
                  alt: "Familienstammbaum",
                }}
                href={`${CBRoute.FreieUebung}/${topic}/${CBExerciseType.FamilyTree}`}
              />
            </Grid>
          )}

          {freeformQuestionExercises.some((e) => e.topic === topic) && (
            <Grid {...commonGridItemProps}>
              <CBInfoCard
                text={exercisesData[CBExerciseType.FreeformQuestion].name}
                image={{ src: "/topics/freetext.png", alt: "Freitext" }}
                href={`${CBRoute.FreieUebung}/${topic}/${CBExerciseType.FreeformQuestion}`}
              />
            </Grid>
          )}

          <Grid {...commonGridItemProps}>
            <CBInfoCard
              text={exercisesData[CBExerciseType.AIQuiz].name}
              image={{ src: "/topics/quiz.png", alt: "KI-Quiz" }}
              href={`${CBRoute.FreieUebung}/${topic}/${CBExerciseType.AIQuiz}`}
            />
          </Grid>

          <Grid {...commonGridItemProps}>
            <Box
              onClick={hasAccessToAI ? undefined : () => setDialogOpen(true)}
            >
              <CBInfoCard
                text={exercisesData[CBExerciseType.LabelImage].name}
                image={{ src: "/topics/exercise.png", alt: "Bild beschriften" }}
                href={
                  hasAccessToAI
                    ? `${CBRoute.FreieUebung}/${topic}/${CBExerciseType.LabelImage}`
                    : undefined
                }
              />
            </Box>
          </Grid>

          {incorrectExercises.find((e) => e.topic === topic) !== undefined && (
            <Grid {...commonGridItemProps}>
              <CBInfoCard
                text="Fehler wiederholen"
                image={{ src: "/topics/repeat.png", alt: "Wiederholen" }}
                href={`${CBRoute.FreieUebung}/${topic}/${retryMistakesPathSegment}`}
              />
            </Grid>
          )}
        </Grid>
      </CBContentWrapper>

      <CBDialog isOpen={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <Stack spacing={1}>
          <Typography>
            Dieser Inhalt ist geschützt. Bitte gib das Passwort ein, um Zugriff
            zu erhalten.
          </Typography>

          <TextField
            value={aiAccessText}
            onChange={(e) => setAIAccessText(e.target.value)}
          />

          <Button
            onClick={() => {
              setAccessToAI(aiAccessText === "aidev");
              setDialogOpen(false);
            }}
          >
            Abschicken
          </Button>
        </Stack>
      </CBDialog>
    </>
  );
}
