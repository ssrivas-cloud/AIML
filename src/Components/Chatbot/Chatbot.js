import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { setChatOpen } from "../../Features/chatOpenSlice";
import CloseIcon from "@mui/icons-material/Close";
import StopIcon from "@mui/icons-material/Stop";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ReactComponent as SendLogo } from "../../assets/SendCustom.svg";
import { Typography, Box, TextField, Button, IconButton } from "@mui/material";
import { fetchBackendDataFromApi } from "../../Utilities/backendApi";
import { useDispatch, useSelector } from "react-redux";
import MessageList from "./MessageList";

const Chatbot = () => {
  const [question, setQuestion] = useState("");
  const [sending, setSending] = useState(false);
  const [questionsAnswers, setQuestionsAnswers] = useState([]);
  const data = useSelector((state) => state.globalDataset);
  const cancelTokenSource = useRef(null);
  const dispatch = useDispatch();

  const handleAskQuestions = (event) => {
    const newQuestion = { question: question.replace(/^[ \t]+|[ \t]+$/g, "") };
    setQuestionsAnswers((previous) => {
      if (previous.length) {
        return [...previous, newQuestion]; // Return updated array with new question added
      } else {
        return [newQuestion]; // Return new array with just the new question
      }
    });
    setSending(true);

    // cancel any ongoing request
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel("Operation is cancel by th user");
    }

    // create a new cancel token
    cancelTokenSource.current = axios.CancelToken.source();

    fetchBackendDataFromApi(
      "POST",
      "/post-question/",
      {
        data: data["data"],
        question: question,
      },
      cancelTokenSource.current.token
    )
      .then(() => {
        setQuestion("");
        fetchQuestionsAndAnswers();
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request was cancelled");
        } else {
          console.log("Request failed", error);
        }
      })
      .finally(() => {
        setSending(false);
        setQuestion("");
      });
  };

  // Handler for the Enter key press
  const handleKeyDownAskQuestion = (event) => {
    if (event.key === "Enter") {
      if (!event.shiftKey) {
        event.preventDefault();
        sending ? handleCancelQuestion() : handleAskQuestions();
      }
    }
  };

  // cancelling api request to the backend
  const handleCancelQuestion = () => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel("Operation is cancel by th user");
      cancelTokenSource.current = null;
      setSending(false);
    }
  };
  const fetchQuestionsAndAnswers = () => {
    fetchBackendDataFromApi("GET", "/get-questions-answers/")
      .then((response) => {
        if (response && Array.isArray(response)) {
          setQuestionsAnswers(response);
        } else {
          console.error("Unexpected error format:", response);
          setQuestionsAnswers([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching questions and answers:", error);
        setQuestionsAnswers([]);
      });
  };

  const handleChatBotClose = () => {
    dispatch(setChatOpen(false));
  };

  useEffect(() => {
    fetchQuestionsAndAnswers();
  }, []);

  return (
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
          <IconButton edge="start" color="inherit" onClick={handleChatBotClose}>
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
        <IconButton edge="end" color="inherit" onClick={handleChatBotClose}>
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
          maxRows={4}
          sx={{ flexGrow: 1 }}
          className="chatBotTextField"
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDownAskQuestion}
        />
        <IconButton
          edge="false"
          color="inherit"
          onClick={sending ? handleCancelQuestion : handleAskQuestions}
          disabled={!question.trim()}
        >
          {sending ? <StopIcon fontSize="small" /> : <SendLogo />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Chatbot;
