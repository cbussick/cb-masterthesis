"use client";

import { topicWorldTopics } from "@/data/topicWorld";
import { CBTopic } from "@/data/topics";
import { useUser } from "@/firebase-client/useUser";
import { getEnumRecordKeyByValue } from "@/helpers/getEnumRecordKeyByValue";
import { CBRoute } from "@/helpers/routes";
import { isTopicCompleted } from "@/helpers/topic-world/isTopicCompleted";
import { isTopicUnlocked } from "@/helpers/topic-world/isTopicUnlocked";
import { Box, CircularProgress, Stack } from "@mui/material";
import { notFound } from "next/navigation";
import { Fragment, useEffect } from "react";
import { CBProgressCircle } from "../CBProgressCircle/CBProgressCircle";
import { CBProgressCircleConnector } from "../CBProgressCircleConnector/CBProgressCircleConnector";

export const CBTopicWorld = (): JSX.Element => {
  const { topicWorldProgress } = useUser();

  const topicsAsArray = Object.values(topicWorldTopics);

  let currentTopic = CBTopic.Zelle;
  if (topicWorldProgress) {
    if (isTopicCompleted(CBTopic.Zelle, topicWorldProgress)) {
      currentTopic = CBTopic.MitoseMeiose;
    }
    if (isTopicCompleted(CBTopic.MitoseMeiose, topicWorldProgress)) {
      currentTopic = CBTopic.AufbauDNA;
    }
  }

  useEffect(() => {
    const element = document.getElementById(currentTopic);
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentTopic]);

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
            const topicId = getEnumRecordKeyByValue(topicWorldTopics, topic);

            if (!topicId) {
              notFound();
            }

            const unlocked = isTopicUnlocked(topicId, topicWorldProgress);

            let completedUnits = 0;

            topic.units.forEach((unit) => {
              const completedExercises =
                topicWorldProgress.topics[topicId]?.units[unit.id]
                  ?.completedExercises?.length;

              if (
                completedExercises &&
                completedExercises === unit.exercises.length
              ) {
                completedUnits += 1;
              }
            });

            const progress = topic.units
              ? (100 * completedUnits) / topic.units.length
              : 0;

            return (
              <Fragment key={topicId}>
                {index !== 0 && (
                  <CBProgressCircleConnector disabled={!unlocked} />
                )}

                <CBProgressCircle
                  id={topicId}
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
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};
