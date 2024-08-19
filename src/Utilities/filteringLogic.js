export const applyNumberFilter = (value, condition) => {
  const numValue = parseFloat(value);
  const numOneCondition = parseFloat(condition.firstInteger);
  const numTwoCondition = parseFloat(condition.secondInteger);

  switch (condition.selectedLogic) {
    case "Is not equal to":
      return numValue !== numOneCondition;
    case "Is less than":
      return numValue < numOneCondition;
    case "Is greater than":
      return numValue > numOneCondition;
    case "Equal":
      return numValue === numOneCondition;
    case "Is between":
      return numValue > numOneCondition && numValue < numTwoCondition;
    case "Is not between":
      return !(numValue > numOneCondition && numValue < numTwoCondition);
    case "Is not equal to":
      return numValue !== numOneCondition;
    default:
      return true;
  }
};

export const applyStringFilter = (value, condition) => {
  switch (condition.selectedLogic) {
    case "Equal":
      return value === condition.textValue;
    case "contains":
      return value.includes(condition.textValue);
    case "Starts with":
      return value.startsWith(condition.textValue);
    case "Ends with":
      return value.endsWith(condition.textValue);
    case "Is not equal to":
      return value !== condition.textValue;
    case "Does not contain":
      return !value.includes(condition.textValue);
    case "Does not start with":
      return !value.startsWith(condition.textValue);
    case "Does not end with":
      return !value.endsWith(condition.textValue);
    default:
      return true;
  }
};

export const applyBooleanFilter = (value, condition) => {
  const booleanValue = value === "true";
  switch (condition.selectedlogic) {
    case "yes":
      return booleanValue === (condition.selectedlogic === "true");
    default:
      return true;
  }
};

export const applyDateFilter = (value, condition) => {
  const dateValue = new Date(value);
  const dateOneCondition = new Date(condition.firstDate);
  const dateTwoCondition = new Date(condition.secondDate);

  switch (condition.selectedLogic) {
    case "Is before":
      return dateValue < dateOneCondition;
    case "Is after":
      return dateValue > dateOneCondition;
    case "Equal":
      return dateValue.toDateString() === dateOneCondition.toDateString();
    case "Is between":
      return dateValue > dateOneCondition && dateValue < dateTwoCondition;
    case "Is not between":
      return !(dateValue > dateOneCondition && dateValue < dateTwoCondition);
    default:
      return true;
  }
};

export const filterRows = (rows, filters) => {
  return rows.filter((row) => {
    return filters.every((filter) => {
      const columnIndex = parseInt(filter.indexOfColumn, 10);

      // check if the columnIndex is valid for the row
      if (columnIndex >= row.length) return false;

      const cellValue = row[columnIndex];
      const dataType = filter.dataTypeOfValue;

      switch (dataType) {
        case "number":
          return filter.columnConditions.every((condition) =>
            applyNumberFilter(cellValue, condition)
          );
        case "string":
          return filter.columnConditions.every((condition) =>
            applyStringFilter(cellValue, condition)
          );
        case "boolean":
          return filter.columnConditions.every((condition) =>
            applyBooleanFilter(cellValue, condition)
          );
        case "date":
          return filter.columnConditions.every((condition) =>
            applyDateFilter(cellValue, condition)
          );
        default:
          return true;
      }
    });
  });
};
