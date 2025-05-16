import { useTick } from "@pixi/react";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../Store/index.ts";
import { gameOver, incrementScore } from "../Store/gameSlice";
import {
  BLOCK_SIZE,
  WIDTH_BLOCKS,
  HEIGHT_BLOCKS,
  AREA_WIDTH,
  AREA_HEIGHT,
  OBSTACLE_SIZE,
  OBSTACLE_POS,
} from "../Constants/constants.ts";
import { isInsideObstacle, getRandomPosition } from "../Utils/utils.ts";
import Snake from "../Graphics/Snake";
import Apple from "../Graphics/Apple";
import Area from "../Graphics/Area";
import Obstacle from "../Graphics/Obstacle";

type SnakeGameProps = {
  canvasWidth: number;
  canvasHeight: number;
};
type Position = { x: number; y: number };
type ArrowKey = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";

const OPPOSITE_DIRECTIONS: Record<ArrowKey, ArrowKey> = {
  ArrowUp: "ArrowDown",
  ArrowDown: "ArrowUp",
  ArrowLeft: "ArrowRight",
  ArrowRight: "ArrowLeft",
};

const DIR_VECTORS: Record<ArrowKey, Position> = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

const INITIAL_SNAKE: Position[] = [
  { x: 5, y: 5 },
  { x: 4, y: 5 },
  { x: 3, y: 5 },
];

const MOVE_INTERVAL = 100;

const SnakeGame = ({ canvasWidth, canvasHeight }: SnakeGameProps) => {
  const dispatch = useDispatch();
  const { isPaused, game } = useSelector((state: RootState) => state.game);

  const offsetX = (canvasWidth - AREA_WIDTH) / 2;
  const offsetY = (canvasHeight - AREA_HEIGHT) / 2;

  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<ArrowKey>("ArrowRight");
  const [food, setFood] = useState<Position>(getRandomPosition());

  const directionQueue = useRef<ArrowKey | null>(null);
  const lastMoveTime = useRef(performance.now());

  // Start game
  useEffect(() => {
    if (game === "game" || game === "secondLevel") {
      const startingSnake = [...INITIAL_SNAKE];
      setSnake(startingSnake);
      setDirection("ArrowRight");
      directionQueue.current = null;
      spawnFood(startingSnake);
    }
  }, [game]);

  // Arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newDir = e.key as ArrowKey;
      if (!(newDir in OPPOSITE_DIRECTIONS)) return;
      if (newDir !== direction && newDir !== OPPOSITE_DIRECTIONS[direction]) {
        directionQueue.current = newDir;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  // Food spawning
  const spawnFood = (snakeBody: Position[]) => {
    let newFood: Position;
    const occupied = new Set(snakeBody.map((s) => `${s.x},${s.y}`));

    do {
      newFood = getRandomPosition();
    } while (
      occupied.has(`${newFood.x},${newFood.y}`) ||
      (game === "secondLevel" && isInsideObstacle(newFood.x, newFood.y))
    );

    setFood(newFood);
  };

  // Movement
  useTick(() => {
    const now = performance.now();
    if (isPaused || game === "deathScreen" || game === "nextLevel") return;
    if (now - lastMoveTime.current < MOVE_INTERVAL) return;
    lastMoveTime.current = now;

    const newDir = directionQueue.current;
    if (
      newDir &&
      newDir !== direction &&
      newDir !== OPPOSITE_DIRECTIONS[direction]
    ) {
      setDirection(newDir);
    }
    directionQueue.current = null;

    const move = DIR_VECTORS[direction];

    setSnake((prevSnake) => {
      const newHead: Position = {
        x: prevSnake[0].x + move.x,
        y: prevSnake[0].y + move.y,
      };

      // Collision checks
      if (
        newHead.x < 0 ||
        newHead.y < 0 ||
        newHead.x >= WIDTH_BLOCKS ||
        newHead.y >= HEIGHT_BLOCKS ||
        (game === "secondLevel" && isInsideObstacle(newHead.x, newHead.y)) ||
        prevSnake.some((body) => body.x === newHead.x && body.y === newHead.y)
      ) {
        dispatch(gameOver());
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Eating food
      if (newHead.x === food.x && newHead.y === food.y) {
        dispatch(incrementScore());
        spawnFood(newSnake);
        return newSnake;
      }

      newSnake.pop();
      return newSnake;
    });
  });

  return (
    <>
      <Area
        width={AREA_WIDTH}
        height={AREA_HEIGHT}
        canvasHeight={canvasHeight}
      />

      {game === "secondLevel" && (
        <Obstacle
          width={(OBSTACLE_SIZE.width + 1) * BLOCK_SIZE}
          height={OBSTACLE_SIZE.height * BLOCK_SIZE}
          areaWidth={AREA_WIDTH}
          areaHeight={AREA_HEIGHT}
          offsetX={offsetX + OBSTACLE_POS.x * BLOCK_SIZE}
          offsetY={offsetY + OBSTACLE_POS.y * BLOCK_SIZE}
        />
      )}

      {snake.map((body, i) => (
        <Snake
          key={i}
          x={offsetX + body.x * BLOCK_SIZE}
          y={offsetY + body.y * BLOCK_SIZE}
          size={BLOCK_SIZE}
          index={i}
        />
      ))}

      <Apple
        x={offsetX + food.x * BLOCK_SIZE}
        y={offsetY + food.y * BLOCK_SIZE}
        size={BLOCK_SIZE}
      />
    </>
  );
};

export default SnakeGame;
