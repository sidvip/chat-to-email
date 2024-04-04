import { Box } from "@chakra-ui/react";
import { useState } from "react";
import StartChat from "./start-chat";
import ChatHistory from "./chat-history";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [isChatHistory, showChatHistory] = useState(true);
  const [response, setResponse] = useState("");
  return (
    <Box>
      {isChatHistory ? (
        <ChatHistory
          setEmail={setEmail}
          showChatHistory={showChatHistory}
          email={email}
          setResponse={setResponse}
        />
      ) : null}
      {!isChatHistory || response ? (
        <StartChat
          email={email}
          backToHistory={() => showChatHistory(true)}
          response={response}
        />
      ) : null}
    </Box>
  );
}
