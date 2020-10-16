import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { timeToString } from "../utils/globalUtils";

interface ITimerProps {
  status: number;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

const Box = styled.div`
  padding: 3px 5px 3px 5px;
  background-color: black;
  color: red;
  font-family: "Press Start 2P", cursive;
`;

const Timer: React.FC<ITimerProps> = ({ time, status, setTime }) => {
  // const [time, setTime] = useState(0);
  const [id, setId] = useState(0);

  useEffect(() => {
    if (status === 0) {
      setTime(0);
    }
    if (status === 1) {
      const startedAt = Date.now();
      const id = setInterval(() => {
        setTime(Date.now() - startedAt);
      }, 10);
      setId(id);
    }
  }, [setTime, status]);

  if (status !== 1) {
    clearInterval(id);
  }

  return (
    <>
      <Box>{timeToString(time)}</Box>
    </>
  );
};

export default Timer;
