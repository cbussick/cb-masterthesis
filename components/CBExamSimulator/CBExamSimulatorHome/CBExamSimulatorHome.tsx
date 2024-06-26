import { CBImage } from "@/components/CBImage/CBImage";
import { Button, Card, Stack, Typography } from "@mui/material";
import { CBExamSimulatorState } from "../CBExamSimulatorInterfaces";
import { CBExamSimulatorHomeProps } from "./CBExamSimulatorHomeInterfaces";

export const CBExamSimulatorHome = ({
  titleTop,
  titleCard,
  setExamState,
}: CBExamSimulatorHomeProps): JSX.Element => {
  const onClickStart = () => {
    setExamState(CBExamSimulatorState.Started);
  };

  return (
    <Stack
      spacing={1}
      sx={{
        flex: "1 1 auto",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          alignSelf: "flex-end",
        }}
      >
        {titleTop}
      </Typography>

      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          flex: "1 1 auto",
        }}
      >
        <CBImage
          image={{
            src: "/exam-simulator-bg.png",
            alt: "Ein Labor",
          }}
          boxProps={{
            width: "100%",
            flex: "1 1 auto",
          }}
          imageProps={{
            style: {
              objectFit: "cover",
            },
            priority: true,
          }}
        />

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
