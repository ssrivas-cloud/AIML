import React from "react";
import { ListItem, Box, Typography } from "@mui/material";

const UserMessage = (props) => {
  return (
    <>
      <ListItem
        sx={{
          justifyContent: "flex-end",
          mb: 2,
          p: 0,
        }}
      >
        <Box
          sx={{
            maxWidth: "70%",
            backgroundColor: "#0076AD",
            borderRadius: "8px",
            wordBreak: "break-word",
            p: "8px",
          }}
        >
          <Typography
            sx={{
              textAlign: "left",
              whiteSpace: "pre-wrap",
              color: "#ffffff",
              p: 0,
              fontSize: "13px",
            }}
          >
            {props.question}
          </Typography>
        </Box>
      </ListItem>
    </>
  );
};

export default UserMessage;
