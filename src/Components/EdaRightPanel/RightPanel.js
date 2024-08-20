import React from "react";
import { Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Eda from "./Eda";
import AdvanceFilter from "../RightPanel/AdvanceFilter";

const RightPanel = ({ onOpen, handleEvent, panelOption, panelContent }) => {
  const handleClose = () => {
    handleEvent(false);
  };
  return (
    <Drawer anchor="right" open={onOpen} onClose={handleClose}>
      <div
        role="presentation"
        // onClick={handleClose}
        // onKeyDown={handleClose}
        style={{ width: 900, padding: 20, height: "100vh" }}
      >
        <IconButton
          style={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>

        {panelOption == "anomalies" ? (
          <Eda panelContent={panelContent} />
        ) : (
          <>
            <AdvanceFilter handleClose={handleClose} />
          </>
        )}
      </div>
    </Drawer>
  );
};

export default RightPanel;
