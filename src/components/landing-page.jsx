import { Box } from "@chakra-ui/react";
import { useState } from "react";
import StartChat from "./start-chat";
import ChatHistory from "./chat-history";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [isChatHistory, showChatHistory] = useState(true);
  const [selectedChat, setSelectedChat] = useState({});

  return (
    <Box>
      {isChatHistory && Object.keys(selectedChat)?.length === 0 ? (
        <ChatHistory
          setEmail={setEmail}
          showChatHistory={showChatHistory}
          email={email}
          setSelectedChat={setSelectedChat}
        />
      ) : null}
      {!isChatHistory || Object.keys(selectedChat)?.length > 0 ? (
        <StartChat
          email={email || selectedChat?.From}
          showChatHistory={showChatHistory}
          setSelectedChat={setSelectedChat}
          selectedChat={selectedChat}
        />
      ) : null}
    </Box>
  );
}
