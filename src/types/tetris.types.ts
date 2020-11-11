export type TTetriShape = string[][];

export type TTetriminos = {
  pos: { x: number; y: number };
  shape: TTetriShape;
  collided: boolean;
};

export type TMatrix = string[][][];
