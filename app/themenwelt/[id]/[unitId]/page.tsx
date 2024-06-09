"use client";

import { MPMIBreadcrumbs } from "@/components/MPMIBreadcrumbs/MPMIBreadcrumbs";
import { MPMIContentWrapper } from "@/components/MPMIContentWrapper/MPMIContentWrapper";
import { MPMIExerciseSequenceProvider } from "@/components/MPMIExerciseSequence/MPMIExerciseSequenceProvider";
import { MPMIExerciseSequenceWrapper } from "@/components/MPMIExerciseSequence/MPMIExerciseSequenceWrapper";
import { MPMIExerciseSequenceType } from "@/components/MPMIExerciseSequence/MPMIExerciseSequenceWrapperInterfaces";
import { MPMITime } from "@/components/MPMIExerciseTimer/MPMIExerciseTimerInterfaces";
import { glossaryEntries } from "@/components/MPMIGlossary/MPMIGlossaryEntries";
import { MPMIPageHeader } from "@/components/MPMIPageHeader/MPMIPageHeader";
import { MPMIExerciseWithMetaData } from "@/data/exercises/MPMIExercise";
import { MPMIExerciseDifficulty } from "@/data/exercises/MPMIExerciseDifficulty";
import { pointsToAddForSequenceCompletion } from "@/data/gamification";
import { topicWorldTopics } from "@/data/topicWorld";
import { MPMITopic } from "@/data/topics";
import { addPointsToUser } from "@/firebase/addPointsToUser";
import { getUserTopicWorldProgress } from "@/firebase/getUserTopicWorldProgress";
import { markExerciseAsCompleted } from "@/firebase/markExerciseAsCompleted";
import { unlockGlossaryEntries } from "@/firebase/unlockGlossaryEntries";
import { useUser } from "@/firebase/useUser";
import { MPMIRoute } from "@/helpers/routes";
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
    MPMIExerciseWithMetaData[] | undefined
  >(undefined);

  const topicData = topicWorldTopics[params.id as MPMITopic];

  const unit = topicData?.units.find(
    (currentUnit) => currentUnit.id === params.unitId,
  );

  const [, setCompletionTime] = useState<MPMITime>({
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

  const onCompleteHref = `${MPMIRoute.Themenwelt}/${params.id}`;

  const onSequenceComplete = (parameters: {
    allExercisesCompleted: boolean;
    difficulty: MPMIExerciseDifficulty;
  }) => {
    if (user?.user) {
      if (parameters.allExercisesCompleted && parameters.difficulty) {
        if (parameters.difficulty === MPMIExerciseDifficulty.Hard) {
          if (exercises) {
            const unlockedGlossaryEntryIds: string[] = [];
            const topic = exercises.at(0)?.topic;

            if (topic === MPMITopic.Zelle) {
              glossaryEntries.forEach((entry) => {
                if (entry.topic === MPMITopic.MitoseMeiose) {
                  unlockedGlossaryEntryIds.push(entry.id);
                }
              });
            } else if (topic === MPMITopic.MitoseMeiose) {
              glossaryEntries.forEach((entry) => {
                if (entry.topic === MPMITopic.AufbauDNA) {
                  unlockedGlossaryEntryIds.push(entry.id);
                }
              });
            }

            if (unlockGlossaryEntries.length > 0) {
              unlockGlossaryEntries(user.user.uid, unlockedGlossaryEntryIds);
            }
          }
        }

        const pointsToAdd =
          pointsToAddForSequenceCompletion[parameters.difficulty];

        addPointsToUser(user.user.uid, pointsToAdd);
      }
    }
  };

  return (
    <MPMIContentWrapper bgcolor={(t) => t.palette.background.default}>
      <Stack spacing={1} height="100%">
        <MPMIPageHeader
          title={
            <MPMIBreadcrumbs
              previousLinks={[
                { label: "Themenwelt", href: MPMIRoute.Themenwelt },
                {
                  label: topicData.topicData.name || "Thema",
                  href: onCompleteHref,
                },
              ]}
              currentLabel={unit?.name || "Einheit"}
            />
          }
        />

        <MPMIExerciseSequenceProvider>
          <MPMIExerciseSequenceWrapper
            type={MPMIExerciseSequenceType.TopicWorld}
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
        </MPMIExerciseSequenceProvider>
      </Stack>
    </MPMIContentWrapper>
  );
}
