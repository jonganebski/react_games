import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { timeToString } from "utils/globalUtils";

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
  // const [id, setId] = useState(0);
  const id = useRef(0);

  useEffect(() => {
    if (status === 0) {
      setTime(0);
      setRecord(null);
    }
    if (status === 1) {
      const startedAt = Date.now();
      id.current = setInterval(() => {
        setTime(Date.now() - startedAt);
      }, 10);
      // setId(id);
      return () => clearInterval(id.current);
    }
  }, [setRecord, setTime, status]);

  if (status !== 1) {
    clearInterval(id.current);
  }

  useEffect(() => {
    if (status !== 1) {
      setRecord(time);
    }
  }, [setRecord, status, time]);

  return (
    <>
      <Box>{timeToString(time).substring(0, 5)}</Box>
    </>
  );
};

export default Timer;
