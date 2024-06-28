import { useState } from "react";
import styled from "styled-components";

const PlayersWrap = styled.ol``;

const NameWrap = styled.div`
  border: ${(props) => (props.active ? "none" : "1px solid gray")};
  display: flex;
  gap: 10%;
  flex-direction: row;
  width: 5rem;
`;

const PlayerWrap = styled.li`
  display: flex;
  justify-content: space-between;
`;

const PlayerEdit = styled.input`
  width: 5rem;
  height: 1rem;
  border: 1px solid gray;
`;
const PlayerEditButton = styled.button`
  width: 3rem;
  height: 1.5rem;
  border: 1px solid gray;
`;

function PlayerInfo({ initialName, mark, isActive, onChangeName }) {
  const [player, setPlayerName] = useState(initialName);
  const [edit, setEdit] = useState(true);

  function handleEditClick() {
    setEdit((edit) => !edit);
    if (!edit) {
      onChangeName(mark, player);
    }
  }
  let input = edit ? (
    <NameWrap active={isActive}>
      {player}
      <span>{mark}</span>
    </NameWrap>
  ) : (
    <PlayerEdit
      onChange={(e) => setPlayerName(e.target.value)}
      required
      value={player}
    ></PlayerEdit>
  );

  return (
    <>
      <PlayerWrap>{input}</PlayerWrap>
      <PlayerEditButton onClick={handleEditClick}>
        {edit ? "edit" : "save"}
      </PlayerEditButton>
    </>
  );
}

export default PlayerInfo;
