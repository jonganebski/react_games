import React from "react";
import styled, { keyframes, css } from "styled-components";

interface IButtonProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  active?: boolean;
  margin?: string;
  text: string;
}

interface IPartialProps {
  active?: boolean;
  delay: string;
}

interface IMyButtonProps {
  margin?: string;
}

const Partial = styled.div<IPartialProps>`
  width: 10px;
  height: 10px;
  background-color: ${(props) => (props.active ? "silver" : "white")};
  transition: background-color 0.2s linear;
  transition-delay: ${(props) => `${props.delay}s`};
`;

const MyButton = styled.div<IMyButtonProps>`
  position: relative;
  width: 120px;
  margin: ${(props) => props.margin};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10px, 1fr));
  cursor: pointer;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072);
  div {
  }
  &:hover {
    div {
      background-color: silver;
    }
  }
  &:active {
    div {
      opacity: 0.9;
    }
  }
`;

const MyButtonText = styled.span`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Press Start 2P", cursive;
  letter-spacing: 5px;
  color: black;
`;

const Button: React.FC<IButtonProps> = ({ active, margin, text, onClick }) => {
  return (
    <MyButton margin={margin} onClick={onClick}>
      {Array.from(Array(60).keys()).map((key) => {
        const delay = (Math.random() / 2).toFixed(2);
        return <Partial key={key} delay={delay} active={active}></Partial>;
      })}
      <MyButtonText>{text}</MyButtonText>
    </MyButton>
  );
};

export default Button;
