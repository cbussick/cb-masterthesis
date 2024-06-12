"use client";

import { topicWorldTopics } from "@/data/topicWorld";
import { TopicWorldProgress } from "@/firebase/TopicWorldProgressConverter";
import { getUserTopicWorldProgress } from "@/firebase/getUserTopicWorldProgress";
import { useUser } from "@/firebase/useUser";
import { getEnumKeyByValue } from "@/helpers/getEnumByValue";
import { Box, Stack } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { CBProgressCircle } from "../CBProgressCircle/CBProgressCircle";
import { CBProgressCircleConnector } from "../CBProgressCircleConnector/CBProgressCircleConnector";

export const CBTopicWorld = (): JSX.Element => {
  const user = useUser();

  const [topicWorldProgress, setTopicWorldProgress] =
    useState<TopicWorldProgress>();

  useEffect(() => {
    if (user?.user) {
      getUserTopicWorldProgress(user.user.uid).then((progress) => {
        setTopicWorldProgress(progress);
      });
    }
  }, [user?.user]);

  const topicsAsArray = Object.values(topicWorldTopics);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Stack width="fit-content">
        {topicsAsArray.map((topic, index) => {
          const previousTopicGeneralData = topicsAsArray[index - 1];

          const previousTopicId =
            index === 0
              ? undefined
              : getEnumKeyByValue(topicWorldTopics, previousTopicGeneralData);

          const isPreviousTopicCompleted =
            previousTopicId &&
            previousTopicGeneralData?.units?.length > 0 &&
            previousTopicGeneralData.units.every((unit) => {
              const userUnitProgress =
                topicWorldProgress?.topics[previousTopicId]?.units[unit.id];

              return (
                unit.exercises.length > 0 &&
                unit.exercises.every((exercise) => {
                  return userUnitProgress?.completedExercises.includes(
                    exercise.id,
                  );
                })
              );
            });

          const unlocked = index === 0 || isPreviousTopicCompleted;

          const topicId = getEnumKeyByValue(topicWorldTopics, topic);

          let completedUnits = 0;

          topic?.units.forEach((unit) => {
            const completedExercises =
              topicWorldProgress?.topics[topicId]?.units[unit.id]
                ?.completedExercises?.length;

            if (
              completedExercises &&
              completedExercises === unit?.exercises.length
            ) {
              completedUnits += 1;
            }
          });

          const progress = topic?.units
            ? (100 * completedUnits) / topic.units.length
            : 0;

          return (
            <Fragment key={topicId}>
              {index !== 0 && (
                <CBProgressCircleConnector disabled={!unlocked} />
              )}

              <CBProgressCircle
                label={topic.topicData.name}
                icon={topic.topicData.icon}
                progress={Number.isNaN(progress) ? 0 : progress}
                href={`themenwelt/${topicId}`}
                unlocked={unlocked || false}
              />
            </Fragment>
          );
        })}
      </Stack>
    </Box>
  );
};
