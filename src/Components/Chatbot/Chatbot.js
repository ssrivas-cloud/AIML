import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ReactComponent as SendLogo } from "../../assets/SendCustom.svg";
import { Typography, Box, TextField, Button, IconButton } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { fetchBackendDataFromApi } from "../../Utilities/backendApi";
import { useDispatch, useSelector } from "react-redux";
import MessageList from "./MessageList";

const Chatbot = ({ setChatOpen }) => {
  const [question, setQuestion] = useState("");
  const [questionsAnswers, setQuestionsAnswers] = useState([]);
  const data = useSelector((state) => state.globalDataset);
  console.log(data);
  console.log(questionsAnswers);

  const handleAskQuestions = () => {
    const newQuestion = { question: question.replace(/^[ \t]+|[ \t]+$/g, "") };
    setQuestionsAnswers((previous) => {
      if (previous) {
        return [...previous, newQuestion];
      } else {
        return [newQuestion];
      }
    });
    fetchBackendDataFromApi("POST", "/post-question/", {
      data,
      question: question,
    })
      .then(() => {
        setQuestion("");
        fetchQuestionsAndAnswers();
      })
      .catch((error) => console.log(error));

    setQuestion("");
  };
  const fetchQuestionsAndAnswers = () => {
    fetchBackendDataFromApi("GET", "/get-questions-answers/")
      .then((response) => setQuestionsAnswers(response))
      .catch((error) => console.log(error));
  };

  const handleChatBotClose = () => {
    setChatOpen(false);
  };

  useEffect(() => {
    fetchQuestionsAndAnswers();
  }, []);

  return (
    <>
      <Box
        sx={{
          minWidth: "35% !important",
          width: "35% !important",
          // maxWidth: "40% !important",
          height: "calc(100% - 74px)",
          pb: 2,
          position: "fixed",
          right: 0,
          top: 0,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F1F2F4",
          zIndex: 1300,
          boxShadow: "-2px -1px 5px 0px rgba(176, 176, 176, 0.1)",
        }}
      >
        <Box
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            position: "sticky", // Stick to top
            top: 0, // Position at the top
            zIndex: 1, // Ensure it's above other content
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleChatBotClose}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>

            <Typography
              variant="body1"
              sx={{
                p: 0,
                fontWeight: 600,
                fontSize: "18px",
                lineHeight: "24px",
                color: "#0C0D0D",
              }}
            >
              Ask questions from Jaspersoft AI
            </Typography>
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setChatOpen(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <MessageList questionsAnswers={questionsAnswers} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
            marginLeft: "11px",
            marginRight: "11px",
            borderRadius: "8px",
            backgroundColor: "#FFFFFF",
            boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.2)",
            position: "sticky",
            bottom: 0,
            zIndex: 1,
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            value={question}
            placeholder="How can I help you?"
            multiline
            maxRows={3}
            sx={{ flexGrow: 1 }}
            className="chatBotTextField"
            onChange={(e) => setQuestion(e.target.value)}
          />
          <IconButton
            edge="false"
            color="inherit"
            onClick={handleAskQuestions}
            disabled={!question.trim()}
          >
            <SendLogo />
            {/* <SendIcon fontSize="small" /> */}
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default Chatbot;
