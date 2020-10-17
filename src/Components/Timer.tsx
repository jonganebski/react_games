import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { timeToString } from "../utils/globalUtils";

interface ITimerProps {
  status: number;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  setRecord: React.Dispatch<React.SetStateAction<number | null>>;
}

const Box = styled.div`
  padding: 3px 5px 3px 5px;
  background-color: black;
  color: red;
  font-family: "Press Start 2P", cursive;
`;

const Timer: React.FC<ITimerProps> = ({ time, status, setTime, setRecord }) => {
  const [id, setId] = useState(0);

  useEffect(() => {
    if (status === 0) {
      setTime(0);
      setRecord(null);
    }
    if (status === 1) {
      const startedAt = Date.now();
      const id = setInterval(() => {
        setTime(Date.now() - startedAt);
      }, 10);
      setId(id);
    }
  }, [setRecord, setTime, status]);

  if (status !== 1) {
    clearInterval(id);
  }

  useEffect(() => {
    if (status !== 1) {
      setRecord(time);
    }
  }, [setRecord, status, time]);

  return (
    <>
      <Box>{timeToString(time)}</Box>
    </>
  );
};

export default Timer;
