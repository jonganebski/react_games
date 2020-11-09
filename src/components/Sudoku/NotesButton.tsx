import React from "react";
import styled from "styled-components";

interface INotesBtnProps {
  notesOn: boolean;
}

const NotesBtn = styled.div<INotesBtnProps>`
  width: 200px;
  height: 50px;
  box-sizing: content-box;
  background-color: whitesmoke;
  display: flex;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.1s ease-in-out;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    3px 6.7px 5.3px rgba(0, 0, 0, 0.048), 5px 12.5px 10px rgba(0, 0, 0, 0.1),
    10px 22.3px 17.9px rgba(0, 0, 0, 0.09),
    20px 30.8px 20.4px rgba(0, 0, 0, 0.03);
  &:hover {
  }
`;

const NotesBtnTextContainer = styled.div<INotesBtnProps>`
  width: 100%;
  height: 300%;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.22s ease-in-out;
  transform: ${(props) =>
    props.notesOn ? "translateY(-66px)" : "translateY(66px)"};
`;

const NotesBtnText = styled.span``;

interface INotesButtonProps {
  notesOn: boolean;
  setNotesOn: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotesButton: React.FC<INotesButtonProps> = ({ notesOn, setNotesOn }) => {
  return (
    <NotesBtn notesOn={notesOn} onClick={() => setNotesOn(!notesOn)}>
      <NotesBtnTextContainer notesOn={notesOn}>
        <NotesBtnText>Notes OFF</NotesBtnText>
        <NotesBtnText style={{ color: "red" }}>
          <span role="img" aria-label="imoji">
            📝
          </span>{" "}
          Notes ON
        </NotesBtnText>
      </NotesBtnTextContainer>
    </NotesBtn>
  );
};

export default NotesButton;
