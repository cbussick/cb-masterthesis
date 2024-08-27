"use client";

import { CBBreadcrumbs } from "@/components/CBBreadcrumbs/CBBreadcrumbs";
import { CBContentWrapper } from "@/components/CBContentWrapper/CBContentWrapper";
import { CBExerciseSequenceProvider } from "@/components/CBExerciseSequence/CBExerciseSequenceProvider";
import { CBExerciseSequenceWrapper } from "@/components/CBExerciseSequence/CBExerciseSequenceWrapper";
import { CBExerciseSequenceType } from "@/components/CBExerciseSequence/CBExerciseSequenceWrapperInterfaces";
import { glossaryEntries } from "@/components/CBGlossary/CBGlossaryEntries";
import { CBPageHeader } from "@/components/CBPageHeader/CBPageHeader";
import { CBNoAccessTopicWorldView } from "@/components/views/CBNoAccessTopicWorldView";
import { CBExerciseWithMetaData } from "@/data/exercises/CBExercise";
import { CBExerciseDifficulty } from "@/data/exercises/CBExerciseDifficulty";
import { pointsToAddForSequenceCompletion } from "@/data/gamification";
import { topicWorldTopics } from "@/data/topicWorld";
import { CBTopic } from "@/data/topics";
import { makeUpdatedTrackedTime } from "@/firebase-client/makeUpdatedTrackedTime";
import { markExerciseAsCompleted } from "@/firebase-client/markExerciseAsCompleted";
import { updateUser } from "@/firebase-client/updateUser";
import { useUser } from "@/firebase-client/useUser";
import { CBUserCustomData } from "@/firebase-client/userCustomDataConverter";
import { getEnumRecordObjectValueByStringKey } from "@/helpers/getEnumRecordObjectValueByStringKey";
import { getEnumValueByStringValue } from "@/helpers/getEnumValueByStringValue";
import { CBRoute } from "@/helpers/routes";
import { dayjsLocalized } from "@/helpers/time-tracking/dayjsLocalized";
import { isUnitUnlocked } from "@/helpers/topic-world/isUnitUnlocked";
import { Stack } from "@mui/material";
import { notFound } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface ExercisePageParams {
  params: {
    id: string;
    unitId: string;
  };
}

export default function ExercisePage({ params }: ExercisePageParams) {
  const { user, topicWorldProgress, customData } = useUser();

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

  const { difficulty } = unit;

  const [exercises, setExercises] = useState<CBExerciseWithMetaData[]>([]);

  useEffect(() => {
    const userCompletedExercises =
      topicWorldProgress.topics[topicId]?.units[params.unitId]
        ?.completedExercises || [];

    const exercisesWithMetaData: CBExerciseWithMetaData[] = unit.exercises.map(
      (exercise) => ({
        ...exercise,
        isCompleted: userCompletedExercises.includes(exercise.id),
      }),
    );

    setExercises(exercisesWithMetaData);
    // Don't add anything from `user` to dependencies, because it would trigger
    // a new selection of random exercises, while the user is still inside the sequence.
    // This would cause glitches for the user.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.unitId, topicId, unit.exercises]);

  const onCompleteHref = `${CBRoute.Themenwelt}/${topicId}`;

  const beginTime = useMemo(() => dayjsLocalized(), []);

  const onSequenceComplete = (parameters: {
    allExercisesCompleted: boolean;
  }) => {
    const userNewData: Partial<CBUserCustomData> = {};

    if (parameters.allExercisesCompleted) {
      if (difficulty === CBExerciseDifficulty.Hard) {
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

          const dedupedUnlockedGlossaryEntryIds =
            unlockedGlossaryEntryIds.filter(
              (entry) => !customData.unlockedGlossaryEntryIDs.includes(entry),
            );

          userNewData.unlockedGlossaryEntryIDs = [
            ...customData.unlockedGlossaryEntryIDs,
            ...dedupedUnlockedGlossaryEntryIds,
          ];
        }
      }

      userNewData.points =
        customData.points + pointsToAddForSequenceCompletion[difficulty];
    }

    const endTime = dayjsLocalized();

    userNewData.trackedTime = makeUpdatedTrackedTime(
      beginTime,
      endTime,
      customData,
    );
    updateUser(user.uid, userNewData);
  };

  const hasAccess = isUnitUnlocked(topicId, unit, topicWorldProgress);

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
          <CBExerciseSequenceProvider
            type={CBExerciseSequenceType.TopicWorld}
            beginTime={beginTime}
          >
            <CBExerciseSequenceWrapper
              exercises={exercises}
              onCompleteHref={onCompleteHref}
              onCompleteExercise={(parameters: {
                exerciseId: string;
                isCorrect: boolean;
              }) => {
                markExerciseAsCompleted(
                  user.uid,
                  topicId,
                  params.unitId,
                  parameters.exerciseId,
                );
              }}
              onSequenceComplete={onSequenceComplete}
              difficulty={difficulty}
            />
          </CBExerciseSequenceProvider>
        ) : hasAccess === undefined ? null : (
          <CBNoAccessTopicWorldView />
        )}
      </Stack>
    </CBContentWrapper>
  );
}
