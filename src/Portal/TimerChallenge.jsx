import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const [expired, setExpired] = useState(false);
  //let timer;
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }
  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    //무한루프 위험성 조심
    dialog.current.open();
  }
  function handleReset(){
    setTimeRemaining(targetTime*1000);
  }

  function handleStop() {
    setExpired(true);
    if(expired)
        dialog.current.open();
    clearInterval(timer.current);
  }

  return (
    <>
      {expired && (
        <ResultModal
          ref={dialog}
          result={"lose"}
          targetTime={targetTime}
        ></ResultModal>
      )}
{/* 
      <ResultModal
        ref={dialog}
        result={"lose"}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      ></ResultModal> */}

      <section className="challenge">
        <h2>{title}</h2>

        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running... " : "Timer inactive"}
        </p>
      </section>
    </>
  );
}

export default TimerChallenge;
