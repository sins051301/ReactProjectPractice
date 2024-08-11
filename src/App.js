import "./App.css";
import Head from "./Header/Head";
import MainGame from "./TicTacToGame/MainGame";
import Lecture4 from "./Lecture/Lecture4";
import Lecture5 from "./Lecture/Practice5";
import MainCaculator from "./Caculator/Main";
import MainPortal from "./Portal/MainPortal";
import MainPage from "./TodoProject/MainPage";
import MainTodo from "./PracticeTodo/MainTodo";
import MainContext from "./ContextPractice/MainContext";
import MainUse from "./UseEffectProject/MainUse";
import MainQuiz from "./Quiz/MainQuiz";
import MainApp from "./ReactTechnic/MainApp";
import ServerApp from "./HttpProject/src/App";
import MainForm from "./FormProject/MainForm";
import ProjectApp from "./MyConnectionProject/src/App";
import Practice from "./Practice";
import store from "./ReduxProject/store/index";
import Redux1 from "./ReduxProject/Redux1";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      {" "}
      <Redux1 ></Redux1>
    </Provider>
  );
}

export default App;
