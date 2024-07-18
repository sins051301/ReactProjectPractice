import styled from "styled-components";

export const StyledButton = styled.button`
  border-radius: 10px;
  color: ${({ color }) => (color ? "red" : "blue")};
  width: 3rem;
  height: 1.5rem;
  border: 1px solid gray;
`;
