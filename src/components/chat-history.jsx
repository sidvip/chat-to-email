import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllEmails } from "../api/api";
import { parser } from "./parser";

function ChatSkeleton() {
  return new Array(8)
    .fill(10)
    .map((ele, id) => <Skeleton height={20} key={id} />);
}

export default function ChatHistory({
  email,
  showChatHistory,
  setEmail,
  setResponse,
}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    getAllEmails()
      .then((response) => {
        setData(
          response?.data?.map((string) => {
            return parser(string);
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  });

  function groupChats(data) {
    return data?.reduce((a, b, c, d) => {
      let to = b.To.split("support")[1].split("@")[0];
      a[to] = b;
      return a;
    }, {});
  }

  groupChats(data);

  return (
    <Box className="p-5">
      <Box className="flex flex-col lg:items-center p-4 w-full">
        <Heading size="md" className="text-center">
          Welcome to Chat to Email - 👋
        </Heading>
        <form
          className="flex lg:flex-row flex-col items-center gap-4 my-5"
          onSubmit={(e) => {
            e.preventDefault();
            showChatHistory(false);
          }}
        >
          <Input
            placeholder="Enter Email"
            value={email}
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            className="lg:w-64 w-full"
          />
          <Button
            className="lg:w-40 w-full"
            size="md"
            colorScheme="blue"
            type="submit"
          >
            Start Chat
          </Button>
        </form>
      </Box>
      <Heading size="md" className="text-blue-400 text-center mb-10">
        Chat History
      </Heading>
      <Box className="flex flex-col gap-4">
        {/* <Heading size="md">There is no chat history</Heading> */}
        {data === null ? (
          <ChatSkeleton />
        ) : (
          <Box className="flex flex-col gap-4">
            {Object.keys(groupChats(data))?.map((chatKey) => (
              <Card
                className="p-2 cursor-pointer"
                onClick={() => setResponse(groupChats(data)[chatKey].response)}
              >
                <CardBody>
                  <Heading size="md" color="#48AAE4" as="body">
                    Chat with {groupChats(data)[chatKey].From}
                  </Heading>
                  <Text size="sm" color="blue">
                    Support Id - {chatKey}
                  </Text>
                  <Text size="sm" color="green">
                    Date - {groupChats(data)[chatKey].Date}
                  </Text>
                </CardBody>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
