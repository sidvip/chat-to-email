import { Box, Button, Heading, Link, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { sendEmail } from "../api/api";
import { useToast } from "@chakra-ui/react";
export default function StartChat({ email, backToHistory, response }) {
  const toast = useToast();
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  return (
    <Box className="p-4">
      <Box className="flex flex-col gap-4">
        <Heading size="md" className="text-gray-500 text-center">
          Starting chat with <span className="text-blue-500">{email}</span>
        </Heading>
        <Link colorScheme="blue" className="self-end" onClick={backToHistory}>
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
          disabled={sending}
          onClick={() => {
            if (message.length > 3) {
              setSending(true);
              sendEmail({
                subject: "Chat with Agent",
                content: message,
                to: email,
              })
                .then((response) => {
                  toast({
                    title: "Email Success",
                    description: response?.data?.message,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right",
                  });
                  setSending(false);
                })
                .catch((error) => {
                  console.log(error);
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
          {sending ? "Sending ..." : "Send"}
        </Button>
      </Box>
      <Box className="p-2 my-10">{response}</Box>
    </Box>
  );
}
