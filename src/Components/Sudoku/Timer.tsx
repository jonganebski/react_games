import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { timeToString } from "../../utils/globalUtils";

const Container = styled.div`
  position: relative;
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: gray;
  letter-spacing: 1em;
  background-color: white;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    3px 6.7px 5.3px rgba(0, 0, 0, 0.048), 5px 12.5px 10px rgba(0, 0, 0, 0.1),
    10px 22.3px 17.9px rgba(0, 0, 0, 0.09),
    20px 30.8px 20.4px rgba(0, 0, 0, 0.03);
`;

interface ITimerProps {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  startedAt: React.MutableRefObject<number>;
  solved: boolean;
}

const Timer: React.FC<ITimerProps> = ({ time, setTime, startedAt, solved }) => {
  const id = useRef(0);

  useEffect(() => {
    id.current = setInterval(() => {
      setTime(Date.now() - startedAt.current);
    }, 10);
    return () => clearInterval(id.current);
  }, [setTime, startedAt]);

  if (solved) {
    clearInterval(id.current);
  }

  return <Container>{timeToString(time).substring(0, 5)}</Container>;
};

export default Timer;
