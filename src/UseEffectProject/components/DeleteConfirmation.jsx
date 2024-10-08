import { useEffect, useState } from "react";
import Progress from "./Progress";
const TIMER = 3000;
export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("SET");
      onConfirm();
    }, 3000);
    //useEffect가 작동되기 바로 직전에 실행
    //의존성이 함수일 경우 까다로움
    //main컴포넌트가 재실행되면 새로운 함수 객체를 전달 받아서 무한루프에 빠질
    //수 있다. ->다르다고 판단하기 때문에 계속 실행
    return () => {
      console.log("cleaning up timer");
      clearTimeout(timer);
    };
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <Progress timer={TIMER}></Progress>
    </div>
  );
}
