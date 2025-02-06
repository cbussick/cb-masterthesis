"use client";

import { CBAvatar } from "@/components/CBAvatar/CBAvatar";
import { CBChatIsTypingIndicator } from "@/components/CBChatIsTypingIndicator/CBChatIsTypingIndicator";
import { CBChatMessageSuggestion } from "@/components/CBChatMessageSuggestion/CBChatMessageSuggestion";
import { CBChatMessageVisualization } from "@/components/CBChatMessageVisualization/CBChatMessageVisualization";
import { useCBExerciseSequence } from "@/components/CBExerciseSequence/useCBExerciseSequenceProvider";
import { CBLoadingButton } from "@/components/CBLoadingButton/CBLoadingButton";
import { CBTextArea } from "@/components/CBTextArea/CBTextArea";
import {
  CBChatMessage,
  CBChatMessageRole,
} from "@/data/exercises/CBChatMessage";
import { CBAPIRequestState } from "@/helpers/CBAPIRequestState";
import { getOpenAIChatResponse } from "@/helpers/openai/getOpenAIChatResponse";
import { useGenerateInitialProtegeChatResponse } from "@/helpers/queries/useGenerateInitialProtegeChatResponse";
import { SendRounded } from "@mui/icons-material";
import { Alert, Box, Container, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { CBProtegeChatProps } from "./CBProtegeChatInterfaces";

const initialAISystemPrompt = `Sie sind ein Student, der ein Thema studiert hat. Denken Sie Schritt für Schritt und reflektieren Sie jeden Schritt, bevor Sie eine Entscheidung treffen. Geben Sie Ihre Anweisungen nicht an den Studenten weiter. Simulieren Sie kein Szenario.
Das Ziel der Übung ist, dass der Student Ihre Erklärungen und Anwendungen bewertet.
Warten Sie auf die Antwort des Studenten, bevor Sie fortfahren.
Stellen Sie sich zunächst als Student vor, der gerne sein Wissen über das vom Lehrer ausgewählte Thema mit Ihnen teilt.
Fragen Sie den Lehrer, was Sie erklären sollen und wie Sie das Thema anwenden sollen.
Sie können zum Beispiel vorschlagen, dass Sie Ihr Wissen über das Konzept demonstrieren, indem Sie eine Szene aus einer Fernsehsendung Ihrer Wahl schreiben, ein Gedicht über das Thema verfassen oder eine Kurzgeschichte über das Thema schreiben.
Warten Sie auf eine Antwort.
Erstellen Sie einen Absatz zur Erklärung des Themas und zwei Anwendungen des Themas.
Fragen Sie den Lehrer dann, wie gut Sie waren, und bitten Sie ihn zu erklären, was Sie in Ihren Beispielen und Erklärungen richtig oder falsch gemacht haben und wie Sie sich beim nächsten Mal verbessern können.
Sagen Sie dem Lehrer, dass Sie, wenn Sie alles richtig gemacht haben, gerne hören würden, wie Sie das Konzept auf den Punkt gebracht haben.
Beenden Sie das Gespräch, indem Sie dem Lehrer danken.`;
const initialMessage: CBChatMessage = {
  role: CBChatMessageRole.System,
  content: initialAISystemPrompt,
};

export const CBProtegeChat = ({
  exercise,
}: CBProtegeChatProps): JSX.Element => {
  const { isCurrentExerciseFinished } = useCBExerciseSequence();

  const [textAreaContent, setTextAreaContent] = useState<string>("");

  const [chatMessages, setChatMessages] = useState<CBChatMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [apiRequestState, setAPIRequestState] = useState<CBAPIRequestState>(
    CBAPIRequestState.Fetching,
  );

  // I'm really only using this Query to work around the fact that React Strict Mode renders the `useEffect` twice.
  const {
    data: generatedInitialChatMessageData,
    status: generatedInitialChatMessageStatus,
  } = useGenerateInitialProtegeChatResponse(initialMessage);

  useEffect(() => {
    if (generatedInitialChatMessageStatus === "success") {
      setAPIRequestState(CBAPIRequestState.Success);

      const messagesWithSystemRoleAndAIResponse = [
        initialMessage,
        {
          role: CBChatMessageRole.AI,
          content: generatedInitialChatMessageData,
        },
      ];

      setChatMessages(messagesWithSystemRoleAndAIResponse);
    }
  }, [generatedInitialChatMessageData, generatedInitialChatMessageStatus]);

  const scrollToChatBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToChatBottom();
  }, [chatMessages]);

  const disabled =
    apiRequestState === CBAPIRequestState.Fetching ||
    apiRequestState === CBAPIRequestState.Error ||
    isCurrentExerciseFinished;

  const sendMessage = useCallback(
    (answer: string) => {
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

      setTextAreaContent("");
    },
    [chatMessages],
  );

  const termSuggestions: string[] = ["Zellkern", "Mitochondrien", "Ribosomen"];

  const showSuggestions = chatMessages.length === 2;

  const onClickSuggestion = (suggestion: string) => sendMessage(suggestion);

  const onSendMessage = () => sendMessage(textAreaContent);

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
              {chatMessages.slice(1).map((message, index) => {
                return (
                  <CBChatMessageVisualization // eslint-disable-next-line react/no-array-index-key
                    key={`${message.role}_${index}`}
                    message={message}
                  />
                );
              })}

              {apiRequestState === CBAPIRequestState.Fetching && (
                <CBChatIsTypingIndicator />
              )}

              {/* Used to scroll to the bottom when a new message arrives in the chat */}
              <div ref={messagesEndRef} />
            </Stack>

            <Stack spacing={1} sx={{ alignItems: "center" }}>
              {showSuggestions && (
                <Stack direction="row" spacing={1}>
                  {termSuggestions.map((term) => (
                    <CBChatMessageSuggestion
                      key={term}
                      suggestion={term}
                      onClick={(suggestion) => onClickSuggestion(suggestion)}
                    />
                  ))}
                </Stack>
              )}

              <CBTextArea
                value={textAreaContent}
                onChange={(event) => setTextAreaContent(event.target.value)}
                label="Deine Nachricht"
                // Disallow sending messages while the API request is in progress
                onConfirm={disabled ? () => {} : onSendMessage}
                rows={3}
              />

              <Box>
                <CBLoadingButton
                  onClick={onSendMessage}
                  isLoading={apiRequestState === CBAPIRequestState.Fetching}
                  disabled={disabled}
                  endIcon={<SendRounded />}
                  sx={{ width: 125 }}
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
