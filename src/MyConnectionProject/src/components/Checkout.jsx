import { useState, useContext } from "react";

import Modal from "./Modal";
import Button from "./UI/Button";

import Input from "./Input";
import { isNotEmpty, isEmail, hasMinLength } from "./util/validation";
import useInput from "../../../FormProject/hooks/useInput";
import { EmailContext, MyMealContext } from "./store/Context";
import { userProgressContext } from "./store/UserProgressContext";
import useHttp from "./hooks/useHttp";
import Errors from "./Errors";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

function Checkout() {
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData
  } = useHttp("http://localhost:4000/orders", requestConfig);
  const { form, setForm, resetForm } = useContext(EmailContext);
  const userProgressCtx = useContext(userProgressContext);
  const { myMeal } = useContext(MyMealContext);
  const cartTotal = myMeal.array.reduce(
    (total, item) => total + item.mine * item.price,
    0
  );
  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  const {
    value: nameValue,
    handleInputChange: handleNameChange,
    handleInputBlur: handleNameBlur,
    hasError: nameError,
  } = useInput(form.name, (value) => {
    return isNotEmpty(value);
  });
  const {
    value: emailValue,
    handleInputChange: handleEamilChange,
    handleInputBlur: handleEamilBlur,
    hasError: eamilError,
  } = useInput(form.email, (value) => {
    return isNotEmpty(value) && isEmail(value);
  });
  const {
    value: postalValue,
    handleInputChange: handlePostalChange,
    handleInputBlur: handlePostalBlur,
    hasError: postalError,
  } = useInput(form.postalCode, (value) => {
    return isNotEmpty(value) && hasMinLength(value, 6);
  });

  const [input, setInput] = useState({
    street: form.street,
    city: form.city,
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

  let actions = (
    <>
      <Button
        textOnly
        onClick={(event) => {
          event.preventDefault();
          setForm({
            name: nameValue,
            email: emailValue,
            postalCode: postalValue,
            street: input.street,
            city: input.city,
          });
          userProgressCtx.hideCheckout();
        }}
      >
        Close
      </Button>
      <Button
        onClick={async (event) => {
          event.preventDefault();

          const orderData = {
            order: {
              customer: {
                name: nameValue,
                email: emailValue,
                street: input.street,
                "postal-code": postalValue,
                city: input.city,
              },
              items: myMeal,
            },
          };

          sendRequest(JSON.stringify(orderData));
          resetForm();
          clearData();
        }}
      >
        Submit Order
      </Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleClose}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>We will get</p>
        <p className="modal-actions">
          <Button onClick={handleClose}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal className="actions" open={userProgressCtx.progress === "checkout"}>
      <form action="" typeof="submit">
        <h2>Checkout</h2>
        <p>Total Amount: {cartTotal}$</p>
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
        <div className="control-row">
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
        {error && (
          <Errors title={"Failed to submit order"} message={error}></Errors>
        )}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}

export default Checkout;
