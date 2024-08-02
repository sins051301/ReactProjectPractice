import { useState, useCallback, useRef } from "react";
import { questions } from "../question";
import quizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Qusetion";
import QuizIsComplete from "./QuizIsComplete";

function Quiz() {
  //const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const [userAnswers, setUserAnswers] = useState([]);
  //사용자 답으로 파생 상태는 최대한 줄이는게 좋음

  const activeQuestionIndex = userAnswers.length;
  //const activeQuestionIndex = useAnswers.length;

  const quizIsComplete = userAnswers.length === questions.length;
  //배열이면 return []
  //객체이면 return {}
  //컴포넌트면 return ()
  //return 생략 가능
  const handleSelectAnswer = useCallback(function handleSelectAnswer(answer) {
    setUserAnswers((prev) => [...prev, answer]);
  }, []);
  //속성과 상태에 의존
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return <QuizIsComplete userAnswers={userAnswers}></QuizIsComplete>;
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        handleSkipAnswer={handleSkipAnswer}
      ></Question>
    </div>
  );
}
export default Quiz;
