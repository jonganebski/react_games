import React from "react";
import styled, { keyframes, css } from "styled-components";

interface IButtonProps {
  text: string;
}

const sudokuAnimation = keyframes`
  from{opacity: 0}
  to{opacity: 1}
`;

interface IPartialProps {
  delay: string;
}

const Partial = styled.div<IPartialProps>`
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: whitesmoke;
  font-size: 14px;
  font-weight: 600;
  color: black;
  opacity: 0;
  animation-delay: ${(props) => props.delay + "s"};
  animation-iteration-count: 2;
`;

const SudokuBtn = styled.div`
  position: relative;
  width: 120px;
  height: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20px, 1fr));
  cursor: pointer;
  background-color: white;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072);
  &:hover {
    ${Partial} {
      animation-name: ${() => css`
        ${sudokuAnimation}
      `};
      animation-duration: 0.3s;
    }
  }
`;

const SudokuBtnText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "Press Start 2P", cursive;
  letter-spacing: 5px;
  color: black;
  border-radius: 5px;
  background-color: white;
  z-index: 5;
  box-shadow: 0 0 5px rgba(255, 255, 255), 0 0 16px rgba(255, 255, 255, 0.3),
    0 0 18px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.1);
`;

const Button: React.FC<IButtonProps> = ({ text }) => {
  return (
    <SudokuBtn>
      {Array.from(Array(18).keys()).map((key) => {
        const delay = Math.random().toFixed(2);
        const num = Math.ceil(Math.random() * 9);
        return (
          <>
            <Partial key={key} delay={delay}>
              {num}
            </Partial>
            <SudokuBtnText>{text}</SudokuBtnText>
          </>
        );
      })}
    </SudokuBtn>
  );
};

export default Button;
