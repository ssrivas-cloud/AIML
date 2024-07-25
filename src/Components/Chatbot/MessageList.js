import React, { useEffect, useRef } from "react";
import { Typography, Box, List, ListItem } from "@mui/material";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";

const MessageList = ({ questionsAnswers }) => {
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [questionsAnswers]);
  return (
    // <Box sx={{ overflow: "auto" }}>
    <List
      sx={{
        flex: 1,
        overflow: "auto",
        p: 2,
        ml: "11px",
        mr: "11px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ListItem
        sx={{
          justifyContent: "flex-start",
          mb: 2,
          p: 0,
        }}
      >
        <Box
          sx={{
            maxWidth: "70%",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            wordBreak: "break-word",
            p: "8px",
          }}
        >
          <Typography
            sx={{
              textAlign: "left",
              whiteSpace: "pre-wrap",
              p: 0,
              fontSize: "13px",
            }}
          >
            Hello there! 👋 It’s nice to meet you! Please ask me anything about
            Bangalore real estate
          </Typography>
        </Box>
      </ListItem>
      {questionsAnswers?.map((qa, index) => (
        <Box key={index}>
          {qa.question ? (
            <UserMessage
              question={qa.question}
              questionsAnswers={questionsAnswers}
              index={index}
              qa={qa}
            />
          ) : (
            ""
          )}
          {qa.answer?.answer && (
            <BotMessage
              answer={qa.answer.answer}
              questionsAnswers={questionsAnswers}
              index={index}
            />
          )}
        </Box>
      ))}
      <div ref={messagesEndRef} />
    </List>
    // </Box>
  );
};

export default MessageList;
