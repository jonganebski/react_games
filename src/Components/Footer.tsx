import React, { useRef, useState } from "react";
import styled from "styled-components";

interface IPopupProps {
  popup: boolean;
}

const Wrapper = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: steelblue;
`;

const About = styled.div`
  cursor: pointer;
`;

const Popup = styled.div<IPopupProps>`
  position: absolute;
  top: -140px;
  width: 350px;
  height: 150px;
  display: ${(props) => (props.popup ? "flex" : "none")};
  flex-direction: column;
  justify-content: space-around;
  border-radius: 10px;
  z-index: 20;
`;

const Arrow = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 100%);
  width: 30px;
  height: 30px;
  border-top: 15px solid rgba(0, 0, 0, 0.8);
  border-right: 15px solid transparent;
  border-left: 15px solid transparent;
`;

const Filter = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: black;
  opacity: 0.8;
  z-index: -1;
`;

const Content = styled.div`
  margin: 10px 0px 10px 10px;
  color: whitesmoke;
  z-index: 1;
`;

const Footer = () => {
  const [popup, setPopup] = useState(false);
  return (
    <Wrapper>
      <About onClick={() => setPopup((prev) => !prev)}>
        <span role="img" aria-label="email">
          👋
        </span>
      </About>
      <Popup popup={popup}>
        <Arrow />
        <Filter />
        <Content>
          This is my Typescript + React project for learning purpose. If you
          have any advice or suggestion, please contact me.
        </Content>
        <div>
          <Content>
            <span role="img" aria-label="email">
              💌 jon.ganebski@gmail.com
            </span>
          </Content>
          <Content>
            <span role="img" aria-label="email">
              📝
              <a
                href="https://github.com/jonganebski/react_games"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "whitesmoke" }}
              >
                {" "}
                see code
              </a>
            </span>
          </Content>
        </div>
      </Popup>
    </Wrapper>
  );
};

export default Footer;
