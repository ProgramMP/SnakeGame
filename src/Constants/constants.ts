export const BLOCK_SIZE = 20;
export const WIDTH_BLOCKS = 40;
export const HEIGHT_BLOCKS = 20;
export const CANVAS_WIDTH = WIDTH_BLOCKS * BLOCK_SIZE;
export const CANVAS_HEIGHT = 500;
export const AREA_WIDTH = CANVAS_WIDTH;
export const AREA_HEIGHT = HEIGHT_BLOCKS * BLOCK_SIZE;
export const OBSTACLE_SIZE = { width: 5, height: 2 };
export const OBSTACLE_POS = {
  x: Math.floor((WIDTH_BLOCKS - OBSTACLE_SIZE.width) / 2),
  y: Math.floor((HEIGHT_BLOCKS - OBSTACLE_SIZE.height) / 2),
};
