import {
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useContext,
} from "react";

import Input from "./Input";
import { isNotEmpty, isEmail, hasMinLength } from "./util/validation";
import useInput from "../../../FormProject/hooks/useInput";
import { createPortal } from "react-dom";
import { EmailContext, MyMealContext } from "./store/Context";
import { updateUserMeals } from "../http";
import FormBasic from "./FormBasic";


const Form = forwardRef(function Form({}, ref) {
  const { name, email, street, postalCode, city, setForm } =
    useContext(EmailContext);
  const { myMeal } = useContext(MyMealContext);
  const [message, setMessage] = useState();
  const answer = useRef();
  const {
    value: nameValue,
    handleInputChange: handleNameChange,
    handleInputBlur: handleNameBlur,
    hasError: nameError,
  } = useInput(name, (value) => {
    return isNotEmpty(value);
  });
  const {
    value: emailValue,
    handleInputChange: handleEamilChange,
    handleInputBlur: handleEamilBlur,
    hasError: eamilError,
  } = useInput(email, (value) => {
    return isNotEmpty(value) && isEmail(value);
  });
  const {
    value: postalValue,
    handleInputChange: handlePostalChange,
    handleInputBlur: handlePostalBlur,
    hasError: postalError,
  } = useInput(postalCode, (value) => {
    return isNotEmpty(value) && hasMinLength(value, 6);
  });

  const [input, setInput] = useState({
    street: street,
    city: city,
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
  function handleAnswer() {
    modal.current.close();
    answer.current.open();

    const timer = setTimeout(() => {
      answer.current.close();
    }, 6000);
  }

  async function updateForm(orderData) {
    const message = await updateUserMeals(orderData);
    setMessage(message);
    handleAnswer();
  }

  return createPortal(
    <dialog ref={modal} className="modal">
      <h2>Checkout</h2>
      <form action="" typeof="submit">
        <p>total Amount {myMeal.sum}$</p>
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
        <FormBasic ref={answer} css={'modal'}>{message}</FormBasic>
        <button
          onClick={(event) => {
            event.preventDefault();
            setForm({
              name: nameValue,
              email: emailValue,
              postalCode: postalValue,
              street: input.street,
              city: input.city,
            });
            modal.current.close();
          }}
        >
          Close
        </button>
        <button
          onClick={async (event) => {
            event.preventDefault();

            setForm({
              name: "",
              email: "",
              postalCode: "",
              street: "",
              city: "",
            });

            const orderData = {
              customer: {
                name: nameValue,
                email: emailValue,
                street: input.street,
                "postal-code": postalValue,
                city: input.city,
              },
              items: myMeal,
            };

            updateForm(orderData);
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
