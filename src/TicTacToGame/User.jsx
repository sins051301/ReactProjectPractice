import styled from "styled-components";
import { useState } from "react";
import PlayerInfo from "./components/PlayerInfo";
const PlayersWrap = styled.ol`
  width: 40rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
function User() {
  return (
    <PlayersWrap>
      <PlayerInfo initialName={"me"} mark={"X"}></PlayerInfo>
      <PlayerInfo initialName={"computer"} mark={"O"}></PlayerInfo>
    </PlayersWrap>
  );
}

export default User;
