import { useState } from "react";
import ConfigureCounter from "./components/Counter/ConfiguerCounter.jsx";
import Counter from "./components/Counter/Counter.jsx";
import Header from "./components/Header.jsx";
import { log } from "./log.js";

function MainApp() {
  log("<App /> rendered");

  const [chosenCount, setChosenCount] = useState(0);
  function handleSetCount(newCount) {
    setChosenCount(newCount);
  }

  return (
    <>
      <Header />
      <main>
        <ConfigureCounter setChosenCount={handleSetCount}></ConfigureCounter>
        <Counter key={chosenCount} initialCount={chosenCount} />
        <Counter key={chosenCount} initialCount={0} />
      </main>
    </>
  );
}

export default MainApp;
