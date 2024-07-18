import { useState, useRef, forwardRef } from "react";

export const Player2 = forwardRef(function Player2(props,ref) {
  const [Name, setName] = useState("");
  //const playerName = useRef();

  //dom상호작용은 리액트가 해야된다는 규칙 위반
  function handleSubmit() {
    setName(ref.current.value);
    ref.current.value = "";
  }
  return (
    <section id="player">
      <h2> {Name ?? "Welcome unknown entity"}</h2>
      <p>
        <input ref={ref} type="text" />
        <button onClick={handleSubmit}>Set Name</button>
      </p>
    </section>
  );
});
