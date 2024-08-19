"use client";

import { CBBreadcrumbs } from "@/components/CBBreadcrumbs/CBBreadcrumbs";
import { CBContentWrapper } from "@/components/CBContentWrapper/CBContentWrapper";
import { CBImage } from "@/components/CBImage/CBImage";
import { CBPageHeader } from "@/components/CBPageHeader/CBPageHeader";
import { CBProgressCircle } from "@/components/CBProgressCircle/CBProgressCircle";
import { CBProgressCircleConnector } from "@/components/CBProgressCircleConnector/CBProgressCircleConnector";
import { CBNoAccessTopicWorldView } from "@/components/views/CBNoAccessTopicWorldView";
import { topicWorldTopics } from "@/data/topicWorld";
import { CBTopic } from "@/data/topics";
import { useUser } from "@/firebase-client/useUser";
import { getEnumRecordObjectValueByStringKey } from "@/helpers/getEnumRecordObjectValueByStringKey";
import { getEnumValueByStringValue } from "@/helpers/getEnumValueByStringValue";
import { CBRoute } from "@/helpers/routes";
import { isTopicUnlocked } from "@/helpers/topic-world/isTopicUnlocked";
import { isUnitUnlocked } from "@/helpers/topic-world/isUnitUnlocked";
import {
  topicWorldContentWrapperStyles,
  topicWorldInnerBoxStyles,
  topicWorldPageHeaderStyles,
} from "@/helpers/topic-world/topicWorldStyles";
import { Box, Stack } from "@mui/material";
import { notFound } from "next/navigation";
import { Fragment, useEffect } from "react";

interface TopicUnitPageParams {
  params: {
    id: string;
  };
}

export default function TopicUnit({ params }: TopicUnitPageParams) {
  const { topicWorldProgress } = useUser();

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

  let currentUnit = topicData.units[0].id;
  if (topicWorldProgress) {
    topicData.units.forEach((unit) => {
      const isUnlocked = isUnitUnlocked(topicId, unit, topicWorldProgress);
      currentUnit = isUnlocked ? unit.id : currentUnit;
    });
  }

  useEffect(() => {
    const element = document.getElementById(currentUnit);
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentUnit]);

  const hasAccess =
    topicWorldProgress && isTopicUnlocked(topicId, topicWorldProgress);

  return (
    <CBContentWrapper {...topicWorldContentWrapperStyles}>
      <CBPageHeader
        title={
          <CBBreadcrumbs
            previousLinks={[{ label: "Themenwelt", href: CBRoute.Themenwelt }]}
            currentLabel={topicData.topicData.name}
          />
        }
        isOnTransparentBackground
        sx={topicWorldPageHeaderStyles}
      />

      {/* eslint-disable-next-line no-nested-ternary */}
      {hasAccess ? (
        <Box {...topicWorldInnerBoxStyles}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Stack sx={{ width: "fit-content" }}>
              {topicData?.units.map((unit, index) => {
                const isUnlocked = isUnitUnlocked(
                  topicId,
                  unit,
                  topicWorldProgress,
                );

                const generalUnitData = topicData.units.find(
                  (u2) => u2.id === unit.id,
                );

                const completedExercises =
                  topicWorldProgress?.topics[topicId]?.units[unit.id]
                    ?.completedExercises?.length;

                const progress =
                  completedExercises && generalUnitData?.exercises
                    ? (100 * completedExercises) /
                      generalUnitData.exercises.length
                    : 0;

                return (
                  <Fragment key={unit.id}>
                    {index !== 0 && (
                      <CBProgressCircleConnector disabled={!isUnlocked} />
                    )}

                    <CBProgressCircle
                      id={unit.id}
                      label={unit.name}
                      progress={progress}
                      href={`${CBRoute.Themenwelt}/${topicId}/${unit.id}`}
                      unlocked={isUnlocked || false}
                      icon={unit.icon}
                    />
                  </Fragment>
                );
              })}
            </Stack>
          </Box>
        </Box>
      ) : hasAccess === undefined ? null : (
        <CBNoAccessTopicWorldView />
      )}

      {hasAccess ? (
        <CBImage
          image={{
            src: "/logo/dina.svg",
            alt: "DiNA",
          }}
          boxProps={{
            sx: {
              position: "absolute",
              right: 50,
              bottom: 10,
              width: 200,
              height: 300,
            },
          }}
        />
      ) : null}
    </CBContentWrapper>
  );
}
