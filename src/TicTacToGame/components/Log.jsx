
//인자를 객체 형태롤 받아서 turns를 추출해야 하기 때문에 {}로 전달
function Log({ turns }) {
  return (
    <ol>
      {turns.map((turn) => (
        //key 값을 동적으로 생성 unique한 값임
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} selected {turn.square.row} {turn.square.column}
        </li>
      ))}
    </ol>
  );
}
export default Log;
