import React from "react";
import styled from "styled-components";

const Border = styled.span`
  position: absolute;
  display: block;
`;

const BorderTop = styled(Border)`
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #2196f3);
`;
const BorderRight = styled(Border)`
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #2196f3);
`;
const BorderBottom = styled(Border)`
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #2196f3);
`;
const BorderLeft = styled(Border)`
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #2196f3);
`;

const Button = styled.div`
  position: relative;
  width: 200px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2196f3;
  overflow: hidden;
  &:hover {
    transition-delay: 1s;
    color: #255784;
    background-color: #2196f3;
    box-shadow: 0 0 10px #2196f3, 0 0 40px #2196f3, 0 0 80px #2196f3;
    ${BorderTop} {
      left: 100%;
      transition: 0.8s;
    }
    ${BorderRight} {
      top: 100%;
      transition: 0.5s;
      transition-delay: 0.3s;
    }
    ${BorderBottom} {
      right: 100%;
      transition: 0.8s;
      transition-delay: 0.5s;
    }
    ${BorderLeft} {
      bottom: 100%;
      transition: 0.5s;
      transition-delay: 0.8s;
    }
  }
`;

interface ITetrisButtonProps {
  text: string;
}

const TetrisButton: React.FC<ITetrisButtonProps> = ({ text }) => (
  <Button>
    <BorderTop />
    <BorderRight />
    <BorderBottom />
    <BorderLeft />
    {text}
  </Button>
);

export default TetrisButton;
