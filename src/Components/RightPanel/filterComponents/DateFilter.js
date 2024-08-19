import React, { useState } from "react";
import dayjs from "dayjs";
import { TextField } from "@mui/material";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "dayjs/locale/en-gb"; // Import locale for DD/MM/YYYY format

// Set the locale to use DD/MM/YYYY format by default
dayjs.locale("en-gb");

const TODAY = dayjs();
const FROM = dayjs().subtract(90, "day");

const DateFilter = ({ selectedLogic }) => {
  const [fromDate, setFromDate] = useState(null);
  const [tillDate, setTillDate] = useState(null);

  const formatDate = (date) => {
    return date ? dayjs(date).format("DD/MM/YYYY") : "";
  };

  const handleFromDate = (newFrom) => {
    setFromDate(newFrom);
    if (newFrom && tillDate && newFrom.isAfter(tillDate)) {
      setTillDate(newFrom);
    }
  };
  const isDayjsDate = (date) => dayjs.isDayjs(date);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          {selectedLogic === "In between" ||
          selectedLogic === "Is not between" ? (
            <>
              <DatePicker
                label="From"
                // defaultValue={fromDate}
                value={fromDate}
                onChange={(newFrom) => handleFromDate(newFrom)}
                minDate={FROM}
                maxDate={TODAY}
              />
              <DatePicker
                label="Till"
                value={tillDate}
                // defaultValue={tillDate}
                onChange={(newTill) => setTillDate(newTill)}
                minDate={fromDate || FROM}
                maxDate={TODAY}
              />
            </>
          ) : (
            <DatePicker
              label={selectedLogic}
              // defaultValue={fromDate}
              value={fromDate}
              onChange={(newFrom) => handleFromDate(newFrom)}
              maxDate={TODAY}
            />
          )}
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
};

export default DateFilter;
