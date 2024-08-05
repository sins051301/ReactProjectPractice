import { useRef, useImperativeHandle, forwardRef, useState } from "react";
import Input from "./Input";
import { isNotEmpty, isEmail, hasMinLength } from "./util/validation";
import useInput from "../../../FormProject/hooks/useInput";
import { createPortal } from "react-dom";
const Form = forwardRef(function Form({ amount }, ref) {
  const {
    value: nameValue,
    handleInputChange: handleNameChange,
    handleInputBlur: handleNameBlur,
    hasError: nameError,
  } = useInput("", (value) => {
    return isNotEmpty(value);
  });
  const {
    value: emailValue,
    handleInputChange: handleEamilChange,
    handleInputBlur: handleEamilBlur,
    hasError: eamilError,
  } = useInput("", (value) => {
    return isNotEmpty(value) && isEmail(value);
  });
  const {
    value: postalValue,
    handleInputChange: handlePostalChange,
    handleInputBlur: handlePostalBlur,
    hasError: postalError,
  } = useInput("", (value) => {
    return isNotEmpty(value) && hasMinLength(value, 6);
  });

  const [input, setInput] = useState({
    street: "",
    postalCode: "",
    city: "",
  });

  function handleChange(identifier, event) {
    event.preventDefault();
    setInput((prevInput) => {
      return {
        ...prevInput,
        [identifier]: event.target.value,
      };
    });
    console.log(input);
  }
  const modal = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        modal.current.showModal();
      },
      close() {
        modal.current.close();
      },
    };
  });
  return createPortal(
    <dialog ref={modal} className="modal">
      <h2>Checkout</h2>
      <form action="" typeof="submit">
        <p>{amount}</p>
        <Input
          id={"name"}
          label={"Full Name"}
          onChange={(event) => handleNameChange(event)}
          onBlur={handleNameBlur}
          value={nameValue}
          error={nameError && "please enter.."}
        ></Input>
        <Input
          id={"emali"}
          label={"E-Mail-Adress"}
          onChange={(event) => handleEamilChange(event)}
          onBlur={handleEamilBlur}
          value={emailValue}
          error={eamilError && "please right email form"}
        ></Input>
        <Input
          id={"street"}
          label={"Street"}
          onChange={(event) => handleChange("street", event)}
        ></Input>
        <div className="contol-row">
          <Input
            id={"postalCode"}
            label={"Postal Code"}
            onChange={(event) => handlePostalChange(event)}
            onBlur={handlePostalBlur}
            value={postalValue}
            error={postalError && "please wright more than 6"}
          ></Input>
          <Input
            id={"city"}
            label={"City"}
            onChange={(event) => handleChange("city", event)}
          ></Input>
        </div>

        <button
          onClick={() => {
            modal.current.close();
          }}
        >
          Close
        </button>
        <button
          onClick={() => {
            modal.current.close();
          }}
        >
          Submit Order
        </button>
      </form>
    </dialog>,
    document.getElementById("root")
  );
});

export default Form;
