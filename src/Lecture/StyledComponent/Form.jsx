import { StyledButton } from "./Button";
import { StyledInput } from "./Input";
import styled from "styled-components";
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10%;

  align-items: center;
`;

export function Form({ color, label, ...props }) {
  return (
    <StyledDiv>
      <StyledButton color={true}>{label}</StyledButton>
      <StyledInput {...props}></StyledInput>
    </StyledDiv>
  );
}
