import React, { useEffect } from "react";
import styled from "styled-components";

interface IDisplayStatusProps {
  title: string;
  number: number;
}

const Wrapper = styled.div`
  position: relative;
  width: 200px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #099fff;
`;

const Heading = styled.h2`
  margin-right: 10px;
`;

const Content = styled.span``;

const DisplayStatus: React.FC<IDisplayStatusProps> = ({ title, number }) => {
  useEffect(() => {
    console.log("CHANGED!!!");
  }, [number]);
  return (
    <Wrapper role="button">
      <Heading>{title.toUpperCase()} </Heading>
      <Content>{number}</Content>
    </Wrapper>
  );
};

export default DisplayStatus;
