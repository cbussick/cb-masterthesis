"use client";

import { CBBreadcrumbs } from "@/components/CBBreadcrumbs/CBBreadcrumbs";
import { CBContentWrapper } from "@/components/CBContentWrapper/CBContentWrapper";
import { CBExerciseSequenceProvider } from "@/components/CBExerciseSequence/CBExerciseSequenceProvider";
import { CBExerciseSequenceWrapper } from "@/components/CBExerciseSequence/CBExerciseSequenceWrapper";
import { CBExerciseSequenceType } from "@/components/CBExerciseSequence/CBExerciseSequenceWrapperInterfaces";
import { CBTime } from "@/components/CBExerciseTimer/CBExerciseTimerInterfaces";
import { glossaryEntries } from "@/components/CBGlossary/CBGlossaryEntries";
import { CBPageHeader } from "@/components/CBPageHeader/CBPageHeader";
import { CBExerciseWithMetaData } from "@/data/exercises/CBExercise";
import { CBExerciseDifficulty } from "@/data/exercises/CBExerciseDifficulty";
import { pointsToAddForSequenceCompletion } from "@/data/gamification";
import { topicWorldTopics } from "@/data/topicWorld";
import { CBTopic } from "@/data/topics";
import { addPointsToUser } from "@/firebase/addPointsToUser";
import { getUserTopicWorldProgress } from "@/firebase/getUserTopicWorldProgress";
import { markExerciseAsCompleted } from "@/firebase/markExerciseAsCompleted";
import { unlockGlossaryEntries } from "@/firebase/unlockGlossaryEntries";
import { useUser } from "@/firebase/useUser";
import { CBRoute } from "@/helpers/routes";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";

interface ExercisePageParams {
  params: {
    id: string;
    unitId: string;
  };
}

export default function ExercisePage({ params }: ExercisePageParams) {
  const user = useUser();

  const [exercises, setExercises] = useState<
    CBExerciseWithMetaData[] | undefined
  >(undefined);

  const topicData = topicWorldTopics[params.id as CBTopic];

  const unit = topicData?.units.find(
    (currentUnit) => currentUnit.id === params.unitId,
  );

  const [, setCompletionTime] = useState<CBTime>({
    sec: 0,
    min: 0,
  });

  useEffect(() => {
    if (user?.user) {
      getUserTopicWorldProgress(user.user.uid).then((progress) => {
        const userCompletedExercises =
          progress?.topics[params.id]?.units[params.unitId]
            ?.completedExercises || [];

        setExercises(
          unit
            ? unit?.exercises.map((exercise) => ({
                ...exercise,
                isCompleted: userCompletedExercises.includes(exercise.id),
              }))
            : [],
        );
      });
    }
  }, [params.id, params.unitId, unit, unit?.exercises, user]);

  const onCompleteHref = `${CBRoute.Themenwelt}/${params.id}`;

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

  return (
    <CBContentWrapper bgcolor={(t) => t.palette.background.default}>
      <Stack spacing={1} height="100%">
        <CBPageHeader
          title={
            <CBBreadcrumbs
              previousLinks={[
                { label: "Themenwelt", href: CBRoute.Themenwelt },
                {
                  label: topicData.topicData.name || "Thema",
                  href: onCompleteHref,
                },
              ]}
              currentLabel={unit?.name || "Einheit"}
            />
          }
        />

        <CBExerciseSequenceProvider>
          <CBExerciseSequenceWrapper
            type={CBExerciseSequenceType.TopicWorld}
            exercises={exercises}
            onCompleteHref={onCompleteHref}
            onCompleteExercise={(parameters: {
              exerciseId: string;
              isCorrect: boolean;
            }): void => {
              if (user?.user) {
                markExerciseAsCompleted(
                  user.user.uid,
                  params.id,
                  params.unitId,
                  parameters.exerciseId,
                );
              }
            }}
            onSequenceComplete={onSequenceComplete}
            setCompletionTime={setCompletionTime}
            difficulty={unit?.difficulty}
          />
        </CBExerciseSequenceProvider>
      </Stack>
    </CBContentWrapper>
  );
}
