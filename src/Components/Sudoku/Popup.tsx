import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TLeaderboard, TPopup } from "../../@types/sudoku";
import { keysNotAllowed } from "../../constants/global";
import { processData, timeToString } from "../../utils/globalUtils";
import Button from "./Button";
import Axios from "axios";
import { SUDOKU_POST_URL } from "../../constants/sudoku";

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
  leaderboard: TLeaderboard[];
  setLeaderboard: React.Dispatch<React.SetStateAction<TLeaderboard[]>>;
  popup: TPopup;
  setPopup: React.Dispatch<React.SetStateAction<TPopup>>;
}

const validator = (
  value: string,
  setValid: React.Dispatch<
    React.SetStateAction<{
      bool: boolean;
      text: string;
    }>
  >
) => {
  if (value === "") {
    setValid({ bool: false, text: "" });
  } else if (value.length < 2) {
    setValid({ bool: false, text: "username is too short" });
  } else if (20 < value.length) {
    setValid({ bool: false, text: "username is too long" });
  } else if (keysNotAllowed.some((char) => value.includes(char))) {
    setValid({ bool: false, text: "not allowed keys" });
  } else if (value[0] === " ") {
    setValid({ bool: false, text: "username has to begin with a character" });
  } else {
    setValid({ bool: true, text: "" });
  }
};

const Popup: React.FC<IPopupProps> = ({
  time,
  leaderboard,
  setLeaderboard,
  setPopup,
}) => {
  const [value, setValue] = useState("");
  const [valid, setValid] = useState({ bool: false, text: "" });

  useEffect(() => {
    validator(value, setValid);
  }, [leaderboard, value]);

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
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
        ></Input>
        <Warning>{valid.text}</Warning>
        <Button
          text="SUBMIT"
          onClick={() => {
            if (valid.bool) {
              Axios.post(SUDOKU_POST_URL, {
                username: value,
                time,
              }).then((res) => {
                setLeaderboard(processData(res.data));
              });
              setPopup({ bool: false, submitted: true });
            }
          }}
        ></Button>
      </Container>
    </Wrapper>
  );
};

export default Popup;
