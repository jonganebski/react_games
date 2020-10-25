import React from "react";
import styled from "styled-components";
import { BorderTop, BorderRight, BorderBottom, BorderLeft } from "./Borders";

const Button = styled.div`
  position: relative;
  width: 200px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #099fff;
  overflow: hidden;
  &:hover {
    transition-delay: 1s;
    color: #255784;
    background-color: #099fff;
    box-shadow: 0 0 10px #099fff, 0 0 40px #099fff, 0 0 80px #099fff;
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
  onClick?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
}

const TetrisButton: React.FC<ITetrisButtonProps> = ({ text, onClick }) => (
  <Button onClick={onClick}>
    <BorderTop />
    <BorderRight />
    <BorderBottom />
    <BorderLeft />
    {text}
  </Button>
);

export default TetrisButton;
