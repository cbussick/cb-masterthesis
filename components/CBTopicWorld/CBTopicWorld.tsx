"use client";

import { topicWorldTopics } from "@/data/topicWorld";
import { CBTopic } from "@/data/topics";
import { TopicWorldProgress } from "@/firebase/TopicWorldProgressConverter";
import { getUserTopicWorldProgress } from "@/firebase/getUserTopicWorldProgress";
import { useUser } from "@/firebase/useUser";
import { getEnumKeyByValue } from "@/helpers/getEnumByValue";
import { isTopicUnlocked } from "@/helpers/isTopicUnlocked";
import { CBRoute } from "@/helpers/routes";
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {topicWorldProgress ? (
        <Stack
          sx={{
            width: "fit-content",
          }}
        >
          {topicsAsArray.map((topic, index) => {
            const topicId = getEnumKeyByValue(
              topicWorldTopics,
              topic,
            ) as CBTopic;
            const unlocked = isTopicUnlocked(topicId, topicWorldProgress);

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
                  href={`${CBRoute.Themenwelt}/${topicId}`}
                  unlocked={unlocked || false}
                />
              </Fragment>
            );
          })}
        </Stack>
      ) : null}
    </Box>
  );
};
