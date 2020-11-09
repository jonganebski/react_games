import React from "react";
import styled from "styled-components";
import {
  BorderTop,
  BorderRight,
  BorderBottom,
  BorderLeft,
} from "components/Tetris/SharedStyles/Borders";

// ------------- INTERFACES -------------

interface IButtonProps {
  w?: number;
  h?: number;
}

interface ITetrisButtonProps {
  text: string;
  w?: number;
  h?: number;
  onClick?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
}

// ------------- STYLED COMPONENTS -------------

const Button = styled.div<IButtonProps>`
  position: relative;
  width: ${(props) => (props.w ? `${props.w}px` : "200px")};
  height: ${(props) => (props.h ? `${props.h}px` : "60px")};
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #099fff;
  overflow: hidden;
  z-index: 20;
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

// ------------- MAIN COMPONENT -------------

const TetrisButton: React.FC<ITetrisButtonProps> = ({
  text,
  w,
  h,
  onClick,
}) => (
  <Button w={w} h={h} onClick={onClick}>
    <BorderTop />
    <BorderRight />
    <BorderBottom />
    <BorderLeft />
    {text}
  </Button>
);

export default TetrisButton;
