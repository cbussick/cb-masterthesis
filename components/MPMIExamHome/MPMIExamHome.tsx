"use client";

import { Box, Button, Card, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { MPMIExamSimulatorState } from "../MPMIExamSimulator/MPMIExamSimulatorInterfaces";
import { MPMIExamHomeProps } from "./MPMIExamHomeInterfaces";

export const MPMIExamHome = ({
  titleTop,
  titleCard,
  setExamState,
}: MPMIExamHomeProps): JSX.Element => {
  const onClickStart = () => {
    setExamState(MPMIExamSimulatorState.Started);
  };

  return (
    <Stack spacing={1} flex="1 1 auto">
      <Typography variant="h4" alignSelf="flex-end">
        {titleTop}
      </Typography>

      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          borderRadius: 3,
          flex: "1 1 auto",
        }}
      >
        <Box position="relative" width="100%" flex="1 1 auto">
          <Image
            src="/exam-simulator-bg.png"
            alt="Ein Labor"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </Box>

        <Stack
          spacing={2}
          sx={{
            textAlign: "center",
            alignItems: "center",
            position: "absolute",
          }}
        >
          <Stack spacing={1}>
            <Typography variant="h2">{titleCard}</Typography>

            <Typography>
              Du hast 20 Minuten Zeit für die folgenden Aufgaben.
              <br />
              Kannst du es schaffen dein Wissen unter Zeitdruck zu beweisen?
            </Typography>
          </Stack>

          <Button onClick={onClickStart}>Start</Button>
        </Stack>
      </Card>
    </Stack>
  );
};
