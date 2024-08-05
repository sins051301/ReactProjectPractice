import { useState } from "react";

export default function useInput(defaultValue, validationFn) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(enteredValue);

  function handleInputChange(event) {
    event.preventDefault();
    setEnteredValue(event.target.value);
    setDidEdit(false);
  }
  function handleInputBlur() {
    setDidEdit(true);
  }
  return {
    value: enteredValue,
    handleInputBlur,
    handleInputChange,
    hasError: didEdit && !valueIsValid,
  };
}
