import { Box, Button, Heading, Link, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { sendEmail } from "../api/api";
import { useToast } from "@chakra-ui/react";
export default function StartChat({
  email,
  selectedChat,
  showChatHistory,
  setSelectedChat,
}) {
  const toast = useToast();
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  let randomId = Math.round(Math.random() * 1000000);
  const payload = {
    from: process.env.REACT_APP_EMAIL,
    to: email,
    subject:
      Object.keys(selectedChat).length === 0
        ? "Chat with Support" + randomId
        : selectedChat?.Subject,
    text: message,
    replyTo: selectedChat?.To
      ? `${selectedChat?.To} tstngninja@gmail.com`
      : `tstngninja+support${randomId}@gmail.com`,
    inReplyTo:
      selectedChat?.["In-Reply-To"] + " " + selectedChat?.To ||
      `tstngninja+support${randomId}@gmail.com`,
    headers: {
      ...(selectedChat?.["Message-ID"]
        ? { messageId: selectedChat?.["Message-ID"] }
        : {}),
      priority: "high",
    },
    ...(selectedChat?.["References"]
      ? { references: selectedChat?.["References"] }
      : {}),
  };
  return (
    <Box className="p-4">
      <Box className="flex flex-col gap-4">
        <Heading size="md" className="text-gray-500 text-center">
          Starting chat with <span className="text-blue-500">{email}</span>
        </Heading>
        <Link
          colorScheme="blue"
          className="self-end"
          onClick={() => {
            showChatHistory(true);
            setSelectedChat({});
          }}
        >
          {" "}
          ← Back to Chat History
        </Link>
        <Textarea
          placeholder="Write a message..."
          message={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          colorScheme="green"
          size="lg"
          iconSpacing={2}
          leftIcon={<span>✈️</span>}
          isDisabled={sending}
          onClick={() => {
            if (message.length > 3) {
              setSending(true);
              sendEmail(payload)
                .then((response) => {
                  toast({
                    title: "Email Success",
                    description: response
                      ? "Reply sent successfully"
                      : "Email sent successfully",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right",
                  });
                  setSending(false);
                })
                .catch((error) => {
                  toast({
                    title: "Email Failure",
                    description: error?.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right",
                  });
                  setSending(false);
                });
            } else {
              toast({
                title: "Message Body",
                description: "Message body must have atleast 3 characters",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top-right",
              });
            }
          }}
        >
          {selectedChat && Object.keys(selectedChat)?.length > 0
            ? sending
              ? "Replying..."
              : "Reply"
            : sending
            ? "Sending ..."
            : "Send"}
        </Button>
      </Box>
      <Box className="p-2 my-10">
        <pre>{selectedChat?.response}</pre>
      </Box>
    </Box>
  );
}
