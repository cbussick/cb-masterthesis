"use client";

import { CBAvatar } from "@/components/CBAvatar/CBAvatar";
import { useCBExerciseSequence } from "@/components/CBExerciseSequence/useCBExerciseSequenceProvider";
import { CBLoadingButton } from "@/components/CBLoadingButton/CBLoadingButton";
import { CBTextArea } from "@/components/CBTextArea/CBTextArea";
import {
  CBChatMessage,
  CBChatMessageRole,
} from "@/data/exercises/CBChatMessage";
import { CBAPIRequestState } from "@/helpers/CBAPIRequestState";
import { getOpenAIChatResponse } from "@/helpers/openai/getOpenAIChatResponse";
import { Alert, Box, Container, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { CBProtegeChatProps } from "./CBProtegeChatInterfaces";

export const CBProtegeChat = ({
  exercise,
}: CBProtegeChatProps): JSX.Element => {
  const { isCurrentExerciseFinished } = useCBExerciseSequence();

  const [answer, setAnswer] = useState<string>("");

  const [chatMessages, setChatMessages] = useState<CBChatMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToChatBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToChatBottom();
  }, [chatMessages]);

  const [apiRequestState, setAPIRequestState] = useState<CBAPIRequestState>(
    CBAPIRequestState.Idle,
  );

  const disabled =
    apiRequestState === CBAPIRequestState.Fetching ||
    apiRequestState === CBAPIRequestState.Error ||
    isCurrentExerciseFinished;

  // Update the chat on the client with the user's message right away.
  const onSendMessage = useCallback(() => {
    setAPIRequestState(CBAPIRequestState.Fetching);

    const messagesWithUserMessage = [
      ...chatMessages,
      {
        role: CBChatMessageRole.User,
        content: answer,
      },
    ];

    setChatMessages(messagesWithUserMessage);

    getOpenAIChatResponse(messagesWithUserMessage).then((response) => {
      setAPIRequestState(CBAPIRequestState.Success);

      const messagesWithAIResponse = [
        ...messagesWithUserMessage,
        {
          role: CBChatMessageRole.AI,
          content: response,
        },
      ];

      setChatMessages(messagesWithAIResponse);
    });

    setAnswer("");
  }, [answer, chatMessages]);

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
      }}
    >
      <Stack spacing={3} sx={{ flex: 1, minHeight: 0 }}>
        <Alert severity="info" sx={{ alignItems: "center" }}>
          <Typography>
            Du führst hier eine Unterhaltung mit einer künstlichen Intelligenz
            (KI). Die Antworten, die du erhältst, kommen nicht von einem echten
            Menschen. Hierbei kann es zu Fehlern kommen.
          </Typography>

          <Typography>
            {`Behalte stets im Hinterkopf, dass du die Kontrolle über diese
            Unterhaltung hast. Du kannst die Unterhaltung jederzeit abbrechen, indem du den Button "Übung beenden" unten links klickst. Falls du Fragen hast, dir etwas unklar ist oder du Hilfe benötigst,
            wende dich an deine Lehrkraft.`}
          </Typography>
        </Alert>

        <Stack
          sx={{
            alignItems: "center",
            flex: 1,
            minHeight: 0,
          }}
        >
          <Stack
            spacing={3}
            sx={{
              minHeight: 0,
              flex: 1,
              width: 900,
              maxWidth: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              border: (t) => `2px solid ${t.palette.grey[300]}`,
              borderRadius: 3,
              p: 2,
            }}
          >
            <CBAvatar
              image={{ src: "/logo/dina.svg", alt: "DiNA" }}
              imageSize={110}
              avatarProps={{
                sx: { border: (t) => `2px solid ${t.palette.grey[300]}` },
              }}
            />

            <Stack
              spacing={2}
              sx={{
                flex: 1,
                overflowY: "auto",
                width: "100%",
                scrollBehavior: "smooth",
              }}
            >
              {chatMessages.map((message, index) => {
                const isAI = message.role === CBChatMessageRole.AI;

                return (
                  <Stack
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${message.role}_${index}`}
                    spacing={1}
                    sx={{
                      alignSelf: isAI ? "flex-start" : "flex-end",
                      bgcolor: (t) =>
                        isAI ? t.palette.grey[100] : t.palette.primary.light,
                      color: (t) =>
                        isAI ? undefined : t.palette.primary.contrastText,
                      p: 2,
                      borderRadius: 3,
                      width: "60%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: (t) => t.typography.fontWeightBold,
                      }}
                    >
                      {isAI ? "DiNA" : "Du"}
                    </Typography>

                    <Typography>{message.content}</Typography>
                  </Stack>
                );
              })}

              <div ref={messagesEndRef} />
            </Stack>

            <Stack spacing={1} sx={{ alignItems: "center" }}>
              <CBTextArea
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                label="Deine Nachricht"
                onConfirm={onSendMessage}
                rows={3}
              />

              <Box>
                <CBLoadingButton
                  onClick={onSendMessage}
                  isLoading={apiRequestState === CBAPIRequestState.Fetching}
                  disabled={disabled}
                  sx={{ width: 150 }}
                >
                  Abschicken
                </CBLoadingButton>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
