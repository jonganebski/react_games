import React from "react";
import styled from "styled-components";

interface IButtonProps {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

interface IMyButtonProps {
  arrLength: number;
}

const yAxisBoxWidth = 20;

const XAxis = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  div {
    height: 50%;
  }
  div:first-child {
    width: 0%;
    height: 25%;
    border-bottom: 1px solid lightgray;
    transition: width 0.2s ease-in-out;
  }
  div:last-child {
    width: 0%;
    height: 25%;
    border-top: 1px solid lightgray;
    transition: width 0.2s ease-in-out 0.1s;
  }
`;

const YAxisBox = styled.div`
  width: ${`${yAxisBoxWidth}px`};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: gray;
`;

const YAxis = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 5;
  ${YAxisBox} {
    height: 0%;
    overflow: hidden;
    color: black;
    font-weight: 600;
    background-color: white;
    border-right: 1px solid lightgray;
    transition-property: height;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
  }
  div:last-child {
    border-right: none;
  }
`;

const MyButton = styled.div<IMyButtonProps>`
  position: relative;
  width: ${(props) => `${props.arrLength * yAxisBoxWidth}px`};
  height: 50px;
  display: flex;
  background-color: white;
  cursor: pointer;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    3px 6.7px 5.3px rgba(0, 0, 0, 0.048), 5px 12.5px 10px rgba(0, 0, 0, 0.1),
    10px 22.3px 17.9px rgba(0, 0, 0, 0.09),
    20px 30.8px 20.4px rgba(0, 0, 0, 0.03);
  &:hover {
    ${XAxis} {
      div {
        width: 100%;
      }
    }
    ${YAxis} {
      div {
        height: 100%;
      }
    }
  }
  &:active {
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
      0 22.3px 17.9px rgba(0, 0, 0, 0.072);
  }
`;

const Button: React.FC<IButtonProps> = ({ text, onClick }) => {
  const yAxisArr = text.split("");
  yAxisArr.unshift("");
  yAxisArr.push("");
  return (
    <MyButton arrLength={yAxisArr.length} onClick={onClick}>
      {yAxisArr.map((char, i) => {
        return <YAxisBox key={i}>{char}</YAxisBox>;
      })}
      <YAxis>
        {yAxisArr.map((char, i) => {
          const delay = i * 0.03;
          return (
            <YAxisBox key={i} style={{ transitionDelay: `${delay}s` }}>
              {char}
            </YAxisBox>
          );
        })}
      </YAxis>
      <XAxis>
        <div></div>
        <div></div>
        <div></div>
      </XAxis>
    </MyButton>
  );
};

export default Button;
