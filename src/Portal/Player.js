import { useState, useRef } from "react";

export default function Player() {
  const [Name, setName] = useState("");
  const playerName = useRef();

  //dom상호작용은 리액트가 해야된다는 규칙 위반
  function handleSubmit() {
    setName(playerName.current.value);
    playerName.current.value ="";
  }
  return (
    <section id="player">
      <h2> {Name ?? "Welcome unknown entity"}</h2>
      <p>
        <input
          ref={playerName} 
          type="text"
        />
        <button onClick={handleSubmit}>Set Name</button>
      </p>
    </section>
  );
}
