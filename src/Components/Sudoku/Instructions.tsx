import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-left: 30px;
  width: 90%;
`;

const Heading = styled.h2`
  font-size: 30px;
  margin-bottom: 20px;
`;

const SubHeading = styled.h4`
  font-size: 22px;
  margin-bottom: 10px;
`;

const List = styled.ul`
  margin-bottom: 15px;
`;

const ListItem = styled.li`
  margin-left: 15px;
  margin-bottom: 5px;
  line-height: 20px;
  font-size: 15px;
`;

const Instructions = () => {
  return (
    <Wrapper>
      <Heading>Welcome!</Heading>

      <SubHeading>Some tips before you start:</SubHeading>
      <List>
        <ListItem>
          SPACEBAR turns on & off note function. You can also click the button.
        </ListItem>
        <ListItem>
          If you want to erase your note, press the number again(with notes
          function ON).
        </ListItem>
        <ListItem>You can move around the boxes with your ARROW KEYS.</ListItem>
        <ListItem>
          Timer starts right after the page is loaded to prevent cheating.
        </ListItem>
        <ListItem>This Sudoku may have more than 1 answer.</ListItem>
      </List>
      <SubHeading>Sudoku rules: </SubHeading>
      <List>
        <ListItem>
          This is 9x9 sudoku table. It contains 9 3x3 small tables(sub regions).
        </ListItem>
        <ListItem>Each column must have every number between 1 ~ 9.</ListItem>
        <ListItem>Each row must have every number between 1 ~ 9.</ListItem>
        <ListItem>
          Each sub region must have every number between 1 ~ 9.
        </ListItem>
        <ListItem>
          Which means each column, row and sub region cannot have repeated
          number.
        </ListItem>
      </List>
    </Wrapper>
  );
};

export default Instructions;
