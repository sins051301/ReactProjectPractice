import { useState } from "react";
import Input from "./Input";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation";
import useInput from "../hooks/useInput";
export default function StateLogin() {
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailIsInvalid,
  } = useInput("", (value) => {
    return isEmail(value) && isNotEmpty(value);
  });

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordIsInvalid,
  } = useInput("", (value) => {
    return hasMinLength(value, 6);
  });

  function handleSubmit(event) {
    event.preventDefault();
    if (emailIsInvalid || passwordIsInvalid) return;
    console.log(emailValue, passwordValue);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          id="email"
          type="email"
          name="email"
          //포커스를 잃을 때 보여줌
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          value={emailValue}
          error={emailIsInvalid && "Please enter a valid email!"}
        ></Input>
        <Input
          id="password"
          type="password"
          name="password"
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
          value={passwordValue}
          error={passwordIsInvalid && "Please enter a valid password!"}
        ></Input>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
