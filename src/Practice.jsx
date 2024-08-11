import { useEffect } from "react";

function Inner1() {
  useEffect(() => {
    console.log("inner-mount1");
  }, []);
}
function Inner2() {
  useEffect(() => {
    console.log("inner-mount2");
  }, []);
}

function Outer({ children }) {
  useEffect(() => {
    console.log("outer-mount");
  }, []);
  return children;
}

function Practice() {
  useEffect(() => {
    console.log("main");
  }, []);

  return (
    <Outer>
      <Inner1></Inner1>
      <Inner2></Inner2>
    </Outer>
  );
}

export default Practice;
