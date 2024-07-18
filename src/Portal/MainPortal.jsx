import Player from "./Player";
import TimerChallenge from "./TimerChallenge";
import { useRef } from "react";
import { Player2 } from "./Player2";
function MainPortal() {
  const name = useRef();
  return (
    <>
      <Player />
      <Player2 ref={name} />
      <div id="challenges">
        <TimerChallenge title={"Easy"} targetTime={1}></TimerChallenge>
        <TimerChallenge title={"Not Easy"} targetTime={5}></TimerChallenge>
        <TimerChallenge
          title={"Getting tough"}
          targetTime={10}
        ></TimerChallenge>
        <TimerChallenge title={"Pros Only"} targetTime={15}></TimerChallenge>
      </div>
    </>
  );
}

export default MainPortal;
