import { Application, extend } from "@pixi/react";
import { Container, Graphics, Text } from "pixi.js";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pauseGame, returnToMenu, nextLevel } from "./Store/gameSlice";
import type { RootState } from "./Store/index.ts";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./Constants/constants.ts";
import Screen from "./UI/Screen.tsx";
import SnakeGame from "./Components/SnakeGame";
import Menu from "./Components/Menu";
import Score from "./Graphics/Score";
import Pause from "./Graphics/Pause";

extend({ Container, Graphics, Text });

export default function App() {
  const dispatch = useDispatch();
  const { game } = useSelector((state: RootState) => state.game);

  useEffect(() => {
    const handlePauseP = (e: KeyboardEvent) => {
      if (e.key === "p") {
        dispatch(pauseGame());
      }
    };

    window.addEventListener("keydown", handlePauseP);
    return () => window.removeEventListener("keydown", handlePauseP);
  }, [dispatch, game]);

  return (
    <>
      {game === "menu" && <Menu />}

      {game === "deathScreen" && (
        <Screen
          title="Game Over!"
          button="Menu"
          handleScreen={() => dispatch(returnToMenu())}
        />
      )}

      {game === "nextLevel" && (
        <Screen
          title="Level Complete!"
          button="Next Level"
          handleScreen={() => dispatch(nextLevel())}
        />
      )}

      <Application
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        background={"#67ae6e"}
      >
        {(game === "game" ||
          game === "deathScreen" ||
          game === "nextLevel" ||
          game === "secondLevel") && (
          <>
            <Score />

            <Pause canvasWidth={CANVAS_WIDTH} />

            <SnakeGame
              canvasWidth={CANVAS_WIDTH}
              canvasHeight={CANVAS_HEIGHT}
            />
          </>
        )}
      </Application>
    </>
  );
}
