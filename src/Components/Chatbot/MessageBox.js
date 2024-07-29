import React from "react";
import { ListItem, Box, Typography } from "@mui/material";

const MessageBox = (props) => {
  return (
    <>
      <ListItem
        sx={{
          justifyContent: props.isUser ? "flex-end" : "flex-start",
          mb: props.index !== props.messagesLength ? 2 : 0,
          p: 0,
        }}
      >
        <Box
          sx={{
            maxWidth: "70%",
            backgroundColor: props.isUser ? "#0076AD" : "#ffffff",
            borderRadius: "8px",
            wordBreak: "break-word",
            p: "8px",
          }}
        >
          <Typography
            sx={{
              textAlign: "left",
              whiteSpace: "pre-wrap",
              color: props.isUser ? "#ffffff" : "",
              p: 0,
              fontSize: "13px",
            }}
          >
            {props.content}
          </Typography>
        </Box>
      </ListItem>
    </>
  );
};

export default MessageBox;
