import Axios from "axios";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { TLeaderboard } from "../../@types/global";
import { keysNotAllowed } from "../../constants/global";
import { TETRIS_POST_URL } from "../../constants/tetris";
import { processData } from "../../utils/globalUtils";
import {
  BorderBottom,
  BorderLeft,
  BorderRight,
  BorderTop,
} from "./SharedStyles/Borders";

// ------------- INTERFACES -------------

interface IWrapperProps {
  popup: boolean;
}

interface IPopupProps {
  isNewRecord: boolean;
  gameOver: boolean;
  score: number;
  setLeaderboard: React.Dispatch<React.SetStateAction<TLeaderboard>>;
}

// ------------- ANIMATIONS -------------

const borderTopAnimation = keyframes`
0% {
    left: -100%;
}
30% {
    left: 100%;
}
100% {
    left: 100%;
}
`;
const borderRightAnimation = keyframes`
0% {
    top: -100%;
}
15% {
    top: -100%;
}
45% {
    top: 100%;
}
100% {
    top: 100%;
}
`;
const borderBottomAnimation = keyframes`
0% {
    right: -100%;
}
30% {
    right: 100%;
}
100% {
    right: 100%;
}
`;
const borderLeftAnimation = keyframes`
0% {
    bottom: -100%;
}
15% {
    bottom: -100%;
}
45% {
    bottom: 100%;
}
100% {
    bottom: 100%;
}
`;

// ------------- STYLED COMPONENTS -------------

const Wrapper = styled.div<IWrapperProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: 30%;
  display: ${(props) => (props.popup ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  overflow: hidden;
  z-index: 6;
  ${BorderTop} {
    background: linear-gradient(90deg, transparent, #ff5709);
    animation: ${borderTopAnimation} 2s linear infinite;
  }
  ${BorderRight} {
    background: linear-gradient(180deg, transparent, #ff5709);
    animation: ${borderRightAnimation} 2s linear infinite;
  }
  ${BorderBottom} {
    background: linear-gradient(270deg, transparent, #ff5709);
    animation: ${borderBottomAnimation} 2s linear infinite;
  }
  ${BorderLeft} {
    background: linear-gradient(0deg, transparent, #ff5709);
    animation: ${borderLeftAnimation} 2s linear infinite;
  }
`;

const Filter = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.9;
  z-index: -1;
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff5709;
  cursor: pointer;
  &:hover {
    color: #844b25;
    background-color: #ff5709;
    box-shadow: 0 0 10px #ff5709, 0 0 40px #ff5709, 0 0 80px #ff5709;
  }
`;

const Heading = styled.h2`
  margin-bottom: 20px;
  font-size: 1.6rem;
  color: white;
`;

const Text = styled.span`
  font-size: 1rem;
  color: white;
  margin-bottom: 30px;
`;

const Input = styled.input`
  all: unset;
  color: white;
  margin-bottom: 10px;
`;

const Warning = styled.span`
  display: block;
  height: 1rem;
  font-size: 0.8rem;
  color: red;
`;

const SubmitBtn = styled.div`
  width: 30%;
  height: 10%;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff5709;
  cursor: pointer;
  &:hover {
    color: #844b25;
    background-color: #ff5709;
    box-shadow: 0 0 10px #ff5709, 0 0 40px #ff5709, 0 0 80px #ff5709;
  }
`;

// ------------- MAIN COMPONENT -------------

const Popup: React.FC<IPopupProps> = ({
  isNewRecord,
  gameOver,
  score,
  setLeaderboard,
}) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    if (gameOver) {
      setPopup(true);
    }
  }, [gameOver]);

  const validator = (value: string) => {
    if (0 < value.length && value.length < 2) {
      setError("It's too short.");
    } else if (20 < value.length) {
      setError("It's too long");
    } else if (keysNotAllowed.some((char) => value.includes(char))) {
      setError("It's not allowed");
    } else if (value[0] === " ") {
      setError("It begins with blank");
    } else {
      setError("");
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    validator(value);
    setUsername(value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLDivElement>) => {
    if (error === "") {
      console.log("Submit", username, score);
      try {
        Axios.post(TETRIS_POST_URL, {
          username,
          score,
        }).then((res) => setLeaderboard(processData(res.data)));
        setPopup(false);
        setUsername("");
      } catch {}
    }
  };

  return (
    <Wrapper popup={popup}>
      <Filter />
      <BorderTop />
      <BorderRight />
      <BorderBottom />
      <BorderLeft />
      <CloseBtn onClick={(e) => setPopup(false)}>⨉</CloseBtn>
      {isNewRecord ? (
        <>
          <Heading>NEW RECORD</Heading>
          <Text>{score}</Text>
          <div>
            <Input
              type="text"
              placeholder="WHO ARE YOU?"
              value={username}
              onChange={handleOnChange}
            />
            <Warning>{error}</Warning>
          </div>
          <SubmitBtn onClick={handleSubmit}>SUBMIT</SubmitBtn>
        </>
      ) : (
        <>
          <Heading>GAME OVER</Heading>
          <Text>{score}</Text>
        </>
      )}
    </Wrapper>
  );
};

export default Popup;
