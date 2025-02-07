"use client";

import { CBBreadcrumbs } from "@/components/CBBreadcrumbs/CBBreadcrumbs";
import { CBContentWrapper } from "@/components/CBContentWrapper/CBContentWrapper";
import { CBDialog } from "@/components/CBDialog/CBDialog";
import { CBInfoCard } from "@/components/CBInfoCard/CBInfoCard";
import { CBPageHeader } from "@/components/CBPageHeader/CBPageHeader";
import { exercisesData } from "@/data/exercises/CBExercise";
import { CBExerciseType } from "@/data/exercises/CBExerciseType";
import { familyTreeExercises } from "@/data/exercises/CBFamilyTreeExercise";
import { freeformQuestionExercisesWithCorrectAnswer } from "@/data/exercises/CBFreeformQuestionExercise";
import { matchingGameExercises } from "@/data/exercises/CBMatchingGameExercise";
import { quizExercises } from "@/data/exercises/CBQuizExercise";
import { swiperExercises } from "@/data/exercises/CBSwiperExercise";
import { glossaryEntries } from "@/data/glossaryEntries";
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

  const isImageVariationExerciseAvailable =
    glossaryEntries.filter((e) => e.topic === topic && e.image1x1).length > 0;

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
          {false && quizExercises.some((e) => e.topic === topic) && (
            <Grid {...commonGridItemProps}>
              <CBInfoCard
                text={exercisesData[CBExerciseType.Quiz].name}
                image={{ src: "/topics/quiz.png", alt: "Quiz" }}
                href={`${CBRoute.FreieUebung}/${topic}/${CBExerciseType.Quiz}`}
              />
            </Grid>
          )}

          {false && matchingGameExercises.some((e) => e.topic === topic) && (
            <Grid {...commonGridItemProps}>
              <CBInfoCard
                text={exercisesData[CBExerciseType.MatchingGame].name}
                image={{ src: "/topics/matching-game.png", alt: "Puzzleteile" }}
                href={`${CBRoute.FreieUebung}/${topic}/${CBExerciseType.MatchingGame}`}
              />
            </Grid>
          )}

          {false && swiperExercises.some((e) => e.topic === topic) && (
            <Grid {...commonGridItemProps}>
              <CBInfoCard
                text={exercisesData[CBExerciseType.Swiper].name}
                image={{ src: "/topics/swiper.png", alt: "Swiper" }}
                href={`${CBRoute.FreieUebung}/${topic}/${CBExerciseType.Swiper}`}
              />
            </Grid>
          )}

          {false && familyTreeExercises.some((e) => e.topic === topic) && (
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

          {false && (
            <Grid {...commonGridItemProps}>
              <CBInfoCard
                text={exercisesData[CBExerciseType.AIQuiz].name}
                image={{
                  src: "/topics/quiz.png",
                  alt: "KI-Multiple-Choice-Quiz",
                }}
                href={`${CBRoute.FreieUebung}/${topic}/${CBExerciseType.AIQuiz}`}
              />
            </Grid>
          )}

          {freeformQuestionExercisesWithCorrectAnswer.some(
            (e) => e.topic === topic,
          ) && (
            <Grid {...commonGridItemProps}>
              <CBInfoCard
                text={
                  exercisesData[
                    CBExerciseType.FreeformQuestionWithCorrectAnswer
                  ].name
                }
                image={{ src: "/question-card.png", alt: "Freitext-Frage" }}
                href={`${CBRoute.FreieUebung}/${topic}/${CBExerciseType.FreeformQuestionWithCorrectAnswer}`}
              />
            </Grid>
          )}

          <Grid {...commonGridItemProps}>
            <CBInfoCard
              text={exercisesData[CBExerciseType.AIGeneratedQuestion].name}
              image={{ src: "/chat-card.png", alt: "KI-Fragen" }}
              href={`${CBRoute.FreieUebung}/${topic}/${CBExerciseType.AIGeneratedQuestion}`}
            />
          </Grid>

          {topic === CBTopic.Zelle && (
            <Grid {...commonGridItemProps}>
              <Box
                onClick={hasAccessToAI ? undefined : () => setDialogOpen(true)}
              >
                <CBInfoCard
                  text={exercisesData[CBExerciseType.LabelImage].name}
                  image={{
                    src: "/image-labelling-card.png",
                    alt: "Bild beschriften",
                  }}
                  href={
                    hasAccessToAI
                      ? `${CBRoute.FreieUebung}/${topic}/${CBExerciseType.LabelImage}`
                      : undefined
                  }
                />
              </Box>
            </Grid>
          )}

          {isImageVariationExerciseAvailable && (
            <Grid {...commonGridItemProps}>
              <Box
                onClick={hasAccessToAI ? undefined : () => setDialogOpen(true)}
              >
                <CBInfoCard
                  text={exercisesData[CBExerciseType.LabelImageVariation].name}
                  image={{
                    src: "/image-variation-labelling-card.png",
                    alt: "Bildvariation beschriften",
                  }}
                  href={
                    hasAccessToAI
                      ? `${CBRoute.FreieUebung}/${topic}/${CBExerciseType.LabelImageVariation}`
                      : undefined
                  }
                />
              </Box>
            </Grid>
          )}

          <Grid {...commonGridItemProps}>
            <CBInfoCard
              text={exercisesData[CBExerciseType.ProtegeChat].name}
              image={{
                src: "/protege-chat-card.png",
                alt: "Protégé-Chat",
              }}
              href={`${CBRoute.FreieUebung}/${topic}/${CBExerciseType.ProtegeChat}`}
            />
          </Grid>

          {false &&
            incorrectExercises.find((e) => e.topic === topic) !== undefined && (
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
