import { useState } from "react";
export function useInput(errorFn, defaultValue) {
  const [didEdit, setDidEdit] = useState(false);
  const [enteredvalue, setEnteredValue] = useState(defaultValue);
  let valueIsValid = errorFn(enteredvalue);
  let hasError = valueIsValid && didEdit;

  function handleInputBlur() {
    setDidEdit(true);
  }
  function handleInputChange(event) {
    event.preventDefault();
    setDidEdit(false);
    setEnteredValue(event.target.value);
  }
  return {
    hasError,
    handleInputBlur,
    handleInputChange,
    value: enteredvalue,
  };
}
