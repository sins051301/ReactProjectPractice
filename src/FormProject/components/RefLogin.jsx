import { useState } from "react";
import { useRef } from "react";

export default function RefLogin() {
  const [emailInvalid, setEmailInvalid] = useState(false);
  const password = useRef();
  const email = useRef();
  function handleSubmit(event) {
    event.preventDefault();
    const enteredEmail = email.current.value;
    const emailIsInvalid = enteredEmail.includes('@');
    if (!emailIsInvalid) {
      setEmailInvalid(true);
      return;
    }
    setEmailInvalid(false);
    console.log("sending HTTP request...");
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={email} />
          <div className="control-error">
            {emailInvalid && <p>Please enter a valid email address</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={password} />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
