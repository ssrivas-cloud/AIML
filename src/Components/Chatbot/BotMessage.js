import React from "react";
import { ListItem, Box, Typography } from "@mui/material";

const BotMessage = (props) => {
  console.log(props.index, props.questionsAnswers.length);
  return (
    <>
      <ListItem
        sx={{
          justifyContent: "flex-start",
          mb: props.index !== props.questionsAnswers.length - 1 ? 2 : 0,
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
            {props.answer}
          </Typography>
        </Box>
      </ListItem>
    </>
  );
};

export default BotMessage;
