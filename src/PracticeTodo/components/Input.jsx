import styled from "styled-components";
import { StyledArea } from "../styles/Tag";
import { StyledInput } from "../styles/Tag";
import { forwardRef } from "react";
const StyledP = styled.p`
  display: flex;
  gap: 2%;
  margin: 2rem;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  font-size: smaller;
  color: gray;
  text-transform: uppercase;
`;

const Input = forwardRef(function Input({ title, textarea, ...props }, ref) {
  return (
    <StyledP>
      <StyledLabel>{title} </StyledLabel>
      {textarea ? (
        <StyledArea ref={ref} {...props}></StyledArea>
      ) : (
        <StyledInput ref={ref} type="text" {...props} />
      )}
    </StyledP>
  );
});

export default Input;
