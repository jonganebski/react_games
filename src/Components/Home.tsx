import React from "react";
import styled from "styled-components";
import MinesweeperBtn from "./Minesweeper/Button";

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

const Box = styled.div`
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

const FrontContent = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20px, 1fr));
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
  background-color: teal;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086);
`;

const MyCard = styled.div`
  position: relative;
  width: 240px;
  height: 300px;
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
  margin-bottom: 20px;
  font-size: 20px;
  font-family: "Press Start 2P", cursive;
  letter-spacing: 3px;
`;

const Home = () => {
  return (
    <div
      style={{
        height: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <MyCard>
        <Front>
          <FrontContent>
            {Array.from(Array(180).keys()).map((key) => {
              return (
                <Box key={key} className={`mine-${key}`}>
                  {key === 31 && <span>3</span>}
                </Box>
              );
            })}
          </FrontContent>
        </Front>
        <Back>
          <Heading>MINESWEEPER</Heading>
          <MinesweeperBtn text={"PLAY"} />
        </Back>
      </MyCard>
    </div>
  );
};

export default Home;
