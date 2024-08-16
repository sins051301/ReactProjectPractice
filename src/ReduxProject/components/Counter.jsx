import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../store/counter";
function Counter() {
  //자동으로 selectoer을 통해 구독을 함
  const disptch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);
  const show = useSelector((state) => state.counter.showCounter);
  function toggleCounterHandler() {
    disptch(counterActions.toggleCounter());
  }
  function incrementHandler() {
    disptch(counterActions.increment());
  }
  function decrementHandler() {
    disptch(counterActions.decrement());
  }
  function increaseHandler(amount) {
    disptch(counterActions.increase(amount));
  }
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div className="counter">
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
        <button onClick={() => increaseHandler(5)}>Increase by 5</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
}

export default Counter;
