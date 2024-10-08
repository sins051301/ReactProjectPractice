import { useEffect, useState } from "react";

function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainingTIme, setRemainingTime] = useState(timeout);
  //객체 생성으로 인해 계속 갱신
  useEffect(() => {
    //console.log("Setting Timeout");
    const Timer = setTimeout(onTimeout, timeout);
    return () => {
      clearTimeout(Timer);
    };
  }, [timeout, onTimeout]);
  useEffect(() => {
    //console.log("Setting Interval");
    const Timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 100);
    }, 100);
    //함수가 실행되는 시점은 effect함수가 재실행되기 직전
    return () => {
      clearTimeout(Timer);
    };
  }, [onTimeout]);

  return (
    <progress
      id="question-time"
      value={remainingTIme}
      max={timeout}
      className={mode}
    ></progress>
  );
}

export default QuestionTimer;
