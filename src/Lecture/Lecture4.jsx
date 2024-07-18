import styled from "styled-components";

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: ${(props) => (props.color ? "red" : "blue")};
  background-color: ${({ highlight }) => (highlight ? "yellow" : "white")};
  //이 styling요소 안 어느 이미지 요소든 영향을 미친다
  & img {
    width: 10rem;
    height: 10rem;
  }
  @media (min-width: 300px) {
    margin-bottom: 4rem;

    &h1 {
      font-size: 17rem;
    }
  }
`;

function Lecture4() {
  return (
    <MessageWrapper color={false} highlight={true}>
      <h1>title</h1>
      <img src="..." alt="..." />
      <div>hello</div>
      <div>huaksu</div>
    </MessageWrapper>
  );
}

export default Lecture4;
