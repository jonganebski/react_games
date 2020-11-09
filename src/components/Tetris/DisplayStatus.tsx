import React, { useEffect } from "react";
import styled from "styled-components";

// ------------- INTERFACES -------------

interface IDisplayStatusProps {
  title: string;
  number: number;
}

// ------------- STYLED COMPONENTS -------------

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

// ------------- MAIN COMPONENT -------------

const DisplayStatus: React.FC<IDisplayStatusProps> = ({ title, number }) => {
  useEffect(() => {}, [number]);
  return (
    <Wrapper role="button">
      <Heading>{title.toUpperCase()} </Heading>
      <Content>{number}</Content>
    </Wrapper>
  );
};

export default DisplayStatus;
