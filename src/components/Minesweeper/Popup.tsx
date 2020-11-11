import Button from "components/Minesweeper/Button";
import { SUDOKU_POST_URL } from "constants/sudoku";
import { useUsernameInput } from "hooks/useUsernameInput";
import { Difficulty } from "interfaces/minesweeper.interface";
import React from "react";
import styled from "styled-components";
import { timeToString } from "utils/globalUtils";
import { TPopup } from "../../types/global.types";

const Wrapper = styled.div`
  position: fixed;
  width: 400px;
  height: 300px;
  background-color: whitesmoke;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 20px;
  height: 20px;
  opacity: 0.7;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  &:active {
    opacity: 0.7;
  }
`;

const Heading = styled.h2`
  font-size: 25px;
`;

const Text = styled.span``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  all: unset;
  width: 200px;
  padding: 5px;
  box-shadow: 0 0 0 1px black;
  background-color: white;
  &:focus {
    box-shadow: 0 0 3px 1px green;
  }
`;

const Warning = styled.div`
  height: 20px;
  color: red;
  margin-top: 5px;
  margin-bottom: 10px;
`;

interface IPopupProps {
  time: number;
  difficulty: Difficulty;
  setPopup: React.Dispatch<React.SetStateAction<TPopup>>;
  handleSubmit: (valid: boolean, url: string, value: string) => void;
}

const Popup: React.FC<IPopupProps> = ({
  time,
  difficulty,
  setPopup,
  handleSubmit,
}) => {
  const { value, handleOnChange, valid } = useUsernameInput();

  return (
    <Wrapper>
      <CloseBtn onClick={() => setPopup({ bool: false, submitted: true })}>
        ✖
      </CloseBtn>
      <Heading>New Record!</Heading>
      <Text>time: {timeToString(time)}</Text>
      <Container>
        <Input
          type="text"
          placeholder="what is your name?"
          value={value}
          required
          onChange={handleOnChange}
        ></Input>
        <Warning>{valid.text}</Warning>
        <Button
          text="SUBMIT"
          onClick={() => handleSubmit(valid.bool, difficulty.POST_URL, value)}
        ></Button>
      </Container>
    </Wrapper>
  );
};

export default Popup;
