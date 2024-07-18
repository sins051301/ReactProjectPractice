import styled from "styled-components";

export const H2 = styled.h2`
  margin-bottom: 3rem;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 1.2rem;
  color: #e29f0ded;
`;

export const Button = styled.button`
  padding: 1rem;
  font-size: x-small;
  border-radius: 20px;
  color: gray;
  background-color: #3b3a3a;
  &:hover {
    background-color: #bababa;
    color: #171717;
  }
`;

export const StyledArea = styled.textarea`
  width: 100%;
  padding: 3%;
  border: 2px solid gray;
  border-radius: 5px;
  background-color: gray;
  &:focus {
    border: black;
    outline: none;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 3%;
  border: 2px solid gray;
  border-radius: 5px;
  background-color: gray;
  &:focus {
    border: black;
    outline: none;
  }
`;

export const StyledP = styled.p`
  margin-bottom: 2rem;
  color: gray;
`;

export const H1 = styled.h1`
  font-size: xx-large;
  font-weight: bold;
  margin-bottom: 3%;
  color: black;
`;

export const StyledUl = styled.ul`
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledLi = styled.li`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  background-color: #c4c3c3;
  border-radius: 3px;
  margin-bottom: 3%;
  padding: 2%;
`;

export const Main = styled.main`
height: 100vh;
margin-top: 2rem;
display: flex;
gap: 2rem;
`;
