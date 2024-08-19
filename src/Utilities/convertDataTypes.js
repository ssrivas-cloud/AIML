import React from "react";

const convertDataTypes = (item) => {
  // Check if item is null or undefined, return item as-is if so
  if (item === null || item === undefined) {
    return item;
  }

  // Convert to number if the item is a valid number
  if (typeof item === "string" && !isNaN(item) && item.trim() !== "") {
    return parseFloat(item);
  }

  // Convert to boolean if the item is 'true' or 'false'
  if (item === "true" || item === "false") {
    return item === "true";
  }

  // Otherwise, return item as a string
  return item;
};

export default convertDataTypes;
