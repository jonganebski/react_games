import React from "react";
import styled from "styled-components";

const Wrapper = styled.header`
  position: absolute;
  top: 0;
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: tomato;
  font-size: 1.5rem;
  font-family: "Henny Penny", cursive;
`;

const Header = () => {
  return <Wrapper>WELCOME TO GAME CENTER</Wrapper>;
};

export default Header;
