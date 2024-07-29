import React, { useEffect, useRef } from "react";
import { Typography, Box, List, ListItem } from "@mui/material";
import MessageBox from "./MessageBox";

const MessageList = ({ questionsAnswers }) => {
  const messagesLength = questionsAnswers.length - 1;
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [questionsAnswers]);
  return (
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
      <MessageBox
        content="Hello there! 👋 It’s nice to meet you! Please ask me anything about
            Bangalore real estate"
        isUser={false}
        index={-1}
        messagesLength={messagesLength}
      />

      {questionsAnswers && questionsAnswers.length > 0 && (
        <>
          {questionsAnswers.map((qa, index) => (
            <Box key={index}>
              {/* Check if it's not the last message */}
              {index !== messagesLength && (
                <>
                  {qa.question && qa.answer?.answer ? (
                    <>
                      <MessageBox
                        isUser={true}
                        content={qa.question}
                        index={index}
                        messagesLength={messagesLength}
                      />
                      <MessageBox
                        isUser={false}
                        content={qa.answer.answer}
                        index={index}
                        messagesLength={messagesLength}
                      />
                    </>
                  ) : (
                    <MessageBox
                      isUser={true}
                      content={qa.question}
                      index={index}
                      messagesLength={messagesLength}
                    />
                  )}
                </>
              )}

              {/* For the last message, always render */}
              {index === messagesLength && (
                <>
                  {qa.question && qa.answer?.answer ? (
                    <>
                      <MessageBox
                        isUser={true}
                        content={qa.question}
                        index={index + 1} // Adjusted index for the last message
                        messagesLength={messagesLength}
                      />
                      <MessageBox
                        isUser={false}
                        content={qa.answer.answer}
                        index={index}
                        messagesLength={messagesLength}
                      />
                    </>
                  ) : (
                    <MessageBox
                      isUser={true}
                      content={qa.question}
                      index={index}
                      messagesLength={messagesLength}
                    />
                  )}
                </>
              )}
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </>
      )}
    </List>
  );
};

export default MessageList;
