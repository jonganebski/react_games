import styled from "styled-components";

const Border = styled.span`
  position: absolute;
  display: block;
`;

export const BorderTop = styled(Border)`
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #099fff);
`;
export const BorderRight = styled(Border)`
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #099fff);
`;
export const BorderBottom = styled(Border)`
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #099fff);
`;
export const BorderLeft = styled(Border)`
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #099fff);
`;
