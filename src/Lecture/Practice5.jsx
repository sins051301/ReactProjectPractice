import { useState } from "react";
import { Form } from "./StyledComponent/Form";

function Lecture5() {
  const [message, setMessage] = useState("");
  return (
    <Form label={message} onChange={(e) => setMessage(e.target.value)}></Form>
  );
}

export default Lecture5;
