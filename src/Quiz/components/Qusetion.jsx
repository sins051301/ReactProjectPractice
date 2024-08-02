import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import { useState } from "react";
import { questions } from "../question";
function Question({ index, onSelectAnswer, handleSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 10000;

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: questions[index].answers[0] === answer,
      });
      console.log("1a");
      setTimeout(() => {
        onSelectAnswer(answer);
        console.log("2a");
      }, 2000);
    }, 1000);
  }
  let answerState = "";
  if (answer.selectedAnswer) {
    timer = 1000;
    console.log("1b");
  }
  if (answer.isCorrect !== null) {
    timer = 2000; 
    console.log("2b");
  }
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answerState.selectedAnswer) {
    answerState = "answered";
  }
  return (
    <div id="question">
      <QuestionTimer
        //key를 넣어줌으로써 재랜더링이 일어나 타이머 초기화가 가능해진다.
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === "" ? handleSkipAnswer : null}
        mode={answerState}
      ></QuestionTimer>
      <h2>{questions[index].text}</h2>

      {/* 같은 key를 여러컴포넌트에서 쓰면 안됨  */}
      <Answers
        answers={questions[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        handleSelectAnswer={handleSelectAnswer}
      ></Answers>
    </div>
  );
}
export default Question;
