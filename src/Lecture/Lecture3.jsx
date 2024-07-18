import styles from "./Lecture3.module.css";
import Lecture2 from "./Lecture2";
import { useState } from "react";

function Lecture3() {
    const [display, setDisplay] = useState(true);
  return (
    <div>
      <p className={styles.hello}>hello world</p>
      <Lecture2 ></Lecture2>
    </div>
  );
}

export default Lecture3;
