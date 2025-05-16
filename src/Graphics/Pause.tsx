import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../Store/index.ts";
import { pauseGame } from "../Store/gameSlice";
import type { Text } from "pixi.js";

type PauseProps = {
  canvasWidth: number;
};

const Pause = ({ canvasWidth }: PauseProps) => {
  const dispatch = useDispatch();
  const { isPaused, game } = useSelector((state: RootState) => state.game);

  const pauseRef = useRef<Text>(null);

  useGSAP(() => {
    if (pauseRef.current && game === "deathScreen") {
      gsap.to(pauseRef.current, {
        alpha: 0,
        scaleX: 0,
        scaleY: 0,
        duration: 0.4,
        ease: "back.in",
        delay: 0.03,
      });
    }
  }, [game]);

  return (
    <>
      <pixiText
        ref={pauseRef}
        text={isPaused ? "Unpause" : "Pause"}
        anchor={{ x: 1, y: 0 }}
        x={canvasWidth - 10}
        y={0}
        style={{
          fill: 0xffffff,
          fontSize: 24,
          fontWeight: "bold",
        }}
        interactive
        cursor="pointer"
        onPointerTap={() => dispatch(pauseGame())}
      />
    </>
  );
};

export default Pause;
