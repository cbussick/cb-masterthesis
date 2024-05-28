"use client";

import { MPMIBreadcrumbs } from "@/components/MPMIBreadcrumbs/MPMIBreadcrumbs";
import { MPMIContentWrapper } from "@/components/MPMIContentWrapper/MPMIContentWrapper";
import { MPMIPageHeader } from "@/components/MPMIPageHeader/MPMIPageHeader";
import { MPMIProgressCircle } from "@/components/MPMIProgressCircle/MPMIProgressCircle";
import { MPMIProgressCircleConnector } from "@/components/MPMIProgressCircleConnector/MPMIProgressCircleConnector";
import { topicWorldTopics } from "@/data/topicWorld";
import { MPMITopic } from "@/data/topics";
import { TopicWorldProgress } from "@/firebase/TopicWorldProgressConverter";
import { getUserTopicWorldProgress } from "@/firebase/getUserTopicWorldProgress";
import { useUser } from "@/firebase/useUser";
import { MPMIRoute } from "@/helpers/routes";
import {
  topicWorldContentWrapperStyles,
  topicWorldInnerBoxStyles,
  topicWorldPageHeaderStyles,
} from "@/helpers/topicWorldStyles";
import { Box, Stack } from "@mui/material";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

interface TopicUnitPageParams {
  params: {
    id: string;
  };
}

export default function TopicUnit({ params }: TopicUnitPageParams) {
  const topicData = topicWorldTopics[params.id as MPMITopic];

  const [topicWorldProgress, setTopicWorldProgress] =
    useState<TopicWorldProgress>();

  const user = useUser();

  useEffect(() => {
    if (user?.user) {
      getUserTopicWorldProgress(user.user.uid).then((progress) => {
        setTopicWorldProgress(progress);
      });
    } else {
      setTopicWorldProgress(undefined);
    }
  }, [params.id, user]);

  return (
    <MPMIContentWrapper {...topicWorldContentWrapperStyles}>
      <MPMIPageHeader
        title={
          <MPMIBreadcrumbs
            previousLinks={[
              { label: "Themenwelt", href: MPMIRoute.Themenwelt },
            ]}
            currentLabel={topicData.topicData.name || "Thema"}
          />
        }
        isOnTransparentBackground
        sx={topicWorldPageHeaderStyles}
      />

      <Box {...topicWorldInnerBoxStyles}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Stack width="fit-content">
            {topicData?.units.map((unit, index) => {
              const previousUnitId =
                index === 0 ? undefined : topicData.units[index - 1].id;

              const generalPreviousUnitData = topicData.units.find(
                (u) => u.id === previousUnitId,
              );

              const generalUnitData = topicData.units.find(
                (u2) => u2.id === unit.id,
              );

              const previousUnitCompletedExercises =
                previousUnitId &&
                topicWorldProgress?.topics[params.id]?.units[previousUnitId]
                  ?.completedExercises?.length;

              const isPreviousUnitCompleted =
                previousUnitCompletedExercises ===
                generalPreviousUnitData?.exercises.length;

              const unlocked = index === 0 || isPreviousUnitCompleted;

              const completedExercises =
                topicWorldProgress?.topics[params.id]?.units[unit.id]
                  ?.completedExercises?.length;

              const progress =
                completedExercises && generalUnitData?.exercises
                  ? (100 * completedExercises) /
                    generalUnitData.exercises.length
                  : 0;

              return (
                <Fragment key={unit.id}>
                  {index !== 0 && (
                    <MPMIProgressCircleConnector disabled={!unlocked} />
                  )}

                  <MPMIProgressCircle
                    label={unit.name}
                    progress={progress}
                    href={`/themenwelt/${params.id}/${unit.id}`}
                    unlocked={unlocked || false}
                    icon={unit.icon}
                  />
                </Fragment>
              );
            })}
          </Stack>
        </Box>
      </Box>

      <Box position="absolute" right={50} bottom={10} width={200} height={300}>
        <Image src="/logo/dina.svg" alt="DiNA" fill />
      </Box>
    </MPMIContentWrapper>
  );
}
