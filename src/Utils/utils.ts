import {
  OBSTACLE_POS,
  OBSTACLE_SIZE,
  WIDTH_BLOCKS,
  HEIGHT_BLOCKS,
} from "../Constants/constants.ts";

export const isInsideObstacle = (x: number, y: number): boolean =>
  x >= OBSTACLE_POS.x &&
  x < OBSTACLE_POS.x + 1 + OBSTACLE_SIZE.width &&
  y >= OBSTACLE_POS.y &&
  y < OBSTACLE_POS.y + OBSTACLE_SIZE.height;

export const getRandomPosition = (): { x: number; y: number } => ({
  x: Math.floor(Math.random() * WIDTH_BLOCKS),
  y: Math.floor(Math.random() * HEIGHT_BLOCKS),
});
