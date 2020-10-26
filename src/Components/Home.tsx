import React from "react";
import styled from "styled-components";
import MinesweeperBtn from "./Minesweeper/Button";
import SudokuBtn from "./Sudoku/Button";
import TetrisBtn from "./Tetris/Button";
import { Link } from "react-router-dom";
import { Cell } from "./Tetris/Tetris";
import { CELL_WIDTH } from "../constants/tetris";
import { HOMECARD_H, HOMECARD_W } from "../constants/global";
import { getRandKey } from "../utils/Tetris/utils";
import Header from "./Header";
import Footer from "./Footer";

// ----------- INTERFACES -----------

interface ISudokuBoxProps {
  text: string;
}

interface IFrontContentProps {
  gridMin: string;
}

// ----------- STYLED COMPONENTS -----------

const Wrapper = styled.div`
  height: 100vh;
  position: relative;
`;

const Main = styled.main`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Front = styled.section`
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  transition: 0.8s;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086);
`;

const MinesweeperBox = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 600;
  color: #e53e3e;
  ${({ className }) => {
    if (className === "mine-31") {
      return `background-color: whitesmoke;
      border-top: 2px solid dimgray;
  border-right: 2px solid whitesmoke;
  border-left: 2px solid dimgray;
  border-bottom: 2px solid whitesmoke;`;
    } else {
      return `background-color: silver;
  border-top: 2px solid whitesmoke;
  border-right: 2px solid dimgray;
  border-left: 2px solid whitesmoke;
  border-bottom: 2px solid dimgray;`;
    }
  }}
`;

const SudokuBox = styled.div<ISudokuBoxProps>`
  width: 80px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid lightgray;
  font-size: 40px;
  font-weight: 600;
  background-color: ${({ text }) => (text !== "" ? "whitesmoke" : "none")};
`;

const FrontContent = styled.div<IFrontContentProps>`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: ${({ gridMin }) =>
    `repeat(auto-fill, minmax(${gridMin}, 1fr))`};
`;

const Back = styled.section`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 30px 10px 30px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  transition: 0.8s;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086);
`;

const MyCard = styled.article`
  position: relative;
  width: ${HOMECARD_W}px;
  height: ${HOMECARD_H}px;
  transition: transform 0.5s linear;
  &:hover {
    ${Front} {
      transform: rotateY(-180deg);
    }
    ${Back} {
      transform: rotateY(0deg);
    }
  }
`;

const Heading = styled.h3`
  margin-bottom: 50px;
  font-size: 20px;
  letter-spacing: 3px;
`;

// ----------- MAIN COMPONENT -----------

const Home = () => {
  return (
    <Wrapper>
      <Header />
      <Main>
        <MyCard>
          <Front>
            <FrontContent gridMin={"20px"}>
              {Array.from(Array(180).keys()).map((key) => {
                return (
                  <MinesweeperBox key={key} className={`mine-${key}`}>
                    {key === 31 && <span>3</span>}
                  </MinesweeperBox>
                );
              })}
            </FrontContent>
          </Front>
          <Back style={{ backgroundColor: "lightgray" }}>
            <Heading
              style={{
                fontFamily: '"Press Start 2P", cursive',
                letterSpacing: 0,
              }}
            >
              MINESWEEPER
            </Heading>
            <Link to="/minesweeper">
              <MinesweeperBtn text={"PLAY"} />
            </Link>
          </Back>
        </MyCard>
        <MyCard>
          <Front>
            <FrontContent gridMin={"80px"}>
              {Array.from(Array(9).keys()).map((key) => {
                const fillValues = ["1", "2", "", "", "", "9", "", "7", "8"];
                return (
                  <SudokuBox
                    key={key}
                    className={`sudoku-${key}`}
                    text={fillValues[key]}
                  >
                    {fillValues[key]}
                  </SudokuBox>
                );
              })}
            </FrontContent>
          </Front>
          <Back style={{ backgroundColor: "whitesmoke" }}>
            <Heading style={{ fontFamily: "'Indie Flower', cursive" }}>
              SUDOKU
            </Heading>
            <Link to="/sudoku">
              <SudokuBtn text={"PLAY"} />
            </Link>
          </Back>
        </MyCard>
        <MyCard>
          <Front>
            <FrontContent gridMin={`${CELL_WIDTH}px`}>
              {Array.from(
                Array(((HOMECARD_W / 30) * HOMECARD_H) / 30).keys()
              ).map((key: number) => {
                if (key < 20 || key === 23 || key === 26 || key === 34)
                  return <Cell key={key} type="." borderW="15px" />;
                else
                  return <Cell key={key} type={getRandKey()} borderW="15px" />;
              })}
            </FrontContent>
          </Front>
          <Back style={{ backgroundColor: "black" }}>
            <Heading style={{ color: "#099fff" }}>TETRIS</Heading>
            <Link to="/tetris">
              <TetrisBtn text={"PLAY"} w={120} h={50} />
            </Link>
          </Back>
        </MyCard>
      </Main>
      <Footer />
    </Wrapper>
  );
};

export default Home;
