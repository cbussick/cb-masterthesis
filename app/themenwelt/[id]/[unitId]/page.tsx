"use client";

import { CBBreadcrumbs } from "@/components/CBBreadcrumbs/CBBreadcrumbs";
import { CBContentWrapper } from "@/components/CBContentWrapper/CBContentWrapper";
import { CBExerciseSequenceProvider } from "@/components/CBExerciseSequence/CBExerciseSequenceProvider";
import { CBExerciseSequenceWrapper } from "@/components/CBExerciseSequence/CBExerciseSequenceWrapper";
import { CBExerciseSequenceType } from "@/components/CBExerciseSequence/CBExerciseSequenceWrapperInterfaces";
import { CBTime } from "@/components/CBExerciseTimer/CBExerciseTimerInterfaces";
import { glossaryEntries } from "@/components/CBGlossary/CBGlossaryEntries";
import { CBPageHeader } from "@/components/CBPageHeader/CBPageHeader";
import { CBNoAccessTopicWorldView } from "@/components/views/CBNoAccessTopicWorldView";
import { CBExerciseWithMetaData } from "@/data/exercises/CBExercise";
import { CBExerciseDifficulty } from "@/data/exercises/CBExerciseDifficulty";
import { pointsToAddForSequenceCompletion } from "@/data/gamification";
import { topicWorldTopics } from "@/data/topicWorld";
import { CBTopic } from "@/data/topics";
import { TopicWorldProgress } from "@/firebase-client/TopicWorldProgressConverter";
import { addPointsToUser } from "@/firebase-client/addPointsToUser";
import { getUserTopicWorldProgress } from "@/firebase-client/getUserTopicWorldProgress";
import { markExerciseAsCompleted } from "@/firebase-client/markExerciseAsCompleted";
import { unlockGlossaryEntries } from "@/firebase-client/unlockGlossaryEntries";
import { useUser } from "@/firebase-client/useUser";
import { getEnumRecordObjectValueByStringKey } from "@/helpers/getEnumRecordObjectValueByStringKey";
import { getEnumValueByStringValue } from "@/helpers/getEnumValueByStringValue";
import { CBRoute } from "@/helpers/routes";
import { isUnitUnlocked } from "@/helpers/topic-world/isUnitUnlocked";
import { Stack } from "@mui/material";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

interface ExercisePageParams {
  params: {
    id: string;
    unitId: string;
  };
}

export default function ExercisePage({ params }: ExercisePageParams) {
  const user = useUser();

  const [exercises, setExercises] = useState<CBExerciseWithMetaData[]>([]);
  const [, setCompletionTime] = useState<CBTime>({
    sec: 0,
    min: 0,
  });
  const [topicWorldProgress, setTopicWorldProgress] =
    useState<TopicWorldProgress>();

  const topicId = getEnumValueByStringValue(CBTopic, params.id);

  if (!topicId) {
    notFound();
  }

  const topicData = getEnumRecordObjectValueByStringKey(
    topicWorldTopics,
    topicId,
  );

  if (!topicData) {
    notFound();
  }

  const unit = topicData.units.find(
    (currentUnit) => currentUnit.id === params.unitId,
  );

  if (!unit) {
    notFound();
  }

  useEffect(() => {
    if (user?.user) {
      getUserTopicWorldProgress(user.user.uid).then((progress) => {
        const userCompletedExercises =
          progress?.topics[topicId]?.units[params.unitId]?.completedExercises ||
          [];

        setExercises(
          unit.exercises.map((exercise) => ({
            ...exercise,
            isCompleted: userCompletedExercises.includes(exercise.id),
          })),
        );
      });
    }
  }, [params.unitId, topicId, unit, user]);

  useEffect(() => {
    if (user?.user) {
      getUserTopicWorldProgress(user.user.uid).then((progress) => {
        setTopicWorldProgress(progress);
      });
    }
  }, [user?.user]);

  const onCompleteHref = `${CBRoute.Themenwelt}/${topicId}`;

  const onSequenceComplete = (parameters: {
    allExercisesCompleted: boolean;
    difficulty: CBExerciseDifficulty;
  }) => {
    if (user?.user) {
      if (parameters.allExercisesCompleted && parameters.difficulty) {
        if (parameters.difficulty === CBExerciseDifficulty.Hard) {
          if (exercises) {
            const unlockedGlossaryEntryIds: string[] = [];
            const topic = exercises.at(0)?.topic;

            if (topic === CBTopic.Zelle) {
              glossaryEntries.forEach((entry) => {
                if (entry.topic === CBTopic.MitoseMeiose) {
                  unlockedGlossaryEntryIds.push(entry.id);
                }
              });
            } else if (topic === CBTopic.MitoseMeiose) {
              glossaryEntries.forEach((entry) => {
                if (entry.topic === CBTopic.AufbauDNA) {
                  unlockedGlossaryEntryIds.push(entry.id);
                }
              });
            }

            if (unlockGlossaryEntries.length > 0) {
              unlockGlossaryEntries(user.user.uid, unlockedGlossaryEntryIds);
            }
          }
        }

        addPointsToUser(
          user.user.uid,
          pointsToAddForSequenceCompletion[parameters.difficulty],
        );
      }
    }
  };
  const hasAccess =
    topicWorldProgress && isUnitUnlocked(topicId, unit, topicWorldProgress);

  return (
    <CBContentWrapper bgcolor={(t) => t.palette.background.default}>
      <Stack spacing={1} sx={{ height: "100%" }}>
        <CBPageHeader
          title={
            <CBBreadcrumbs
              previousLinks={[
                { label: "Themenwelt", href: CBRoute.Themenwelt },
                {
                  label: topicData.topicData.name,
                  href: onCompleteHref,
                },
              ]}
              currentLabel={unit.name}
            />
          }
        />

        {/* eslint-disable-next-line no-nested-ternary */}
        {hasAccess ? (
          <CBExerciseSequenceProvider type={CBExerciseSequenceType.TopicWorld}>
            <CBExerciseSequenceWrapper
              type={CBExerciseSequenceType.TopicWorld}
              exercises={exercises}
              onCompleteHref={onCompleteHref}
              onCompleteExercise={(parameters: {
                exerciseId: string;
                isCorrect: boolean;
              }) => {
                if (user?.user) {
                  markExerciseAsCompleted(
                    user.user.uid,
                    topicId,
                    params.unitId,
                    parameters.exerciseId,
                  );
                }
              }}
              onSequenceComplete={onSequenceComplete}
              setCompletionTime={setCompletionTime}
              difficulty={unit.difficulty}
            />
          </CBExerciseSequenceProvider>
        ) : hasAccess === undefined ? null : (
          <CBNoAccessTopicWorldView />
        )}
      </Stack>
    </CBContentWrapper>
  );
}
