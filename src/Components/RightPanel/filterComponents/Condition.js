import React, { useMemo } from "react";
import dataBasedLogic from "./logicList";
import SelectCoLogic from "./SelectCoLogic";
import TextNumberFilter from "./TextNumberFilter";
import DateFilter from "./DateFilter";
import BooleanFilter from "./BooleanFilter";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { ReactComponent as Close } from "../../../assets/close.svg";

import convertDataTypes from "../../../Utilities/convertDataTypes";

const Condition = ({
  condition: {
    id,
    filterColumn,
    selectedLogic,
    textValue,
    firstInteger,
    secondInteger,
    booleanValue,
  },
  selectedColumnData,
  data,
  handleChange,
  handleRemove,
}) => {
  const handleInputChange = (key) => (value) => {
    handleChange(id, key, value);
  };

  // Memoized logic options based on selected column data type
  const logicOptions = useMemo(() => {
    if (typeof selectedColumnData === "string") {
      return dataBasedLogic.string;
    } else if (typeof selectedColumnData === "number") {
      return dataBasedLogic.numerical;
    } else if (typeof selectedColumnData === "boolean") {
      return dataBasedLogic.boolean;
    } else if (typeof selectedColumnData === "object") {
      return dataBasedLogic.date;
    }
    return [];
  }, [selectedColumnData]);

  const renderFilterInputs = () => {
    if (typeof selectedColumnData === "string") {
      return (
        <TextNumberFilter
          type="text"
          value={textValue}
          handleChange={handleInputChange("textValue")}
        />
      );
    } else if (typeof selectedColumnData === "number") {
      return (
        <>
          <TextNumberFilter
            type="number"
            value={firstInteger}
            handleChange={handleInputChange("firstInteger")}
          />
          {(selectedLogic === "Is between" ||
            selectedLogic === "Is not between") && (
            <TextNumberFilter
              type="number"
              value={secondInteger}
              handleChange={handleInputChange("secondInteger")}
            />
          )}
        </>
      );
    } else if (typeof selectedColumnData === "object") {
      return <DateFilter selectedLogic={selectedLogic} />;
    }

    return null;
  };

  return (
    <div className="filter-logic">
      <div className="filter-logic-inputs">
        {filterColumn !== null &&
          typeof selectedColumnData !== "undefined" &&
          typeof selectedColumnData !== "boolean" && (
            <>
              <SelectCoLogic
                name="Select Logic"
                data={logicOptions}
                handleChange={handleInputChange("selectedLogic")}
                CoLogic={selectedLogic}
              />

              <div style={{ display: "flex", gap: "8px" }}>
                {selectedLogic && renderFilterInputs()}
              </div>
            </>
          )}
        {filterColumn && typeof selectedColumnData === "boolean" && (
          <BooleanFilter
            value={booleanValue}
            handleChange={handleInputChange("booleanValue")}
          />
        )}
      </div>
      <IconButton onClick={handleRemove}>
        <Close />
      </IconButton>
    </div>
  );
};

export default Condition;
