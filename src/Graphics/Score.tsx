import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSelector } from "react-redux";
import type { RootState } from "../Store/index.ts";
import type { Text } from "pixi.js";
import { useRef } from "react";
import { PixiPlugin } from "gsap/PixiPlugin";
import * as PIXI from "pixi.js";

const Score = () => {
  PixiPlugin.registerPIXI(PIXI);
  gsap.registerPlugin(PixiPlugin);

  const { score, game } = useSelector((state: RootState) => state.game);

  const scoreRef = useRef<Text>(null);

  useGSAP(() => {
    if (scoreRef.current && game === "deathScreen") {
      gsap.to(scoreRef.current, {
        alpha: 0,
        duration: 0.4,
        ease: "back.in",
        delay: 0.03,
      });
    }
  }, [game]);

  return (
    <pixiText
      ref={scoreRef}
      text={`Score: ${score}`}
      anchor={{ x: 0, y: 0 }}
      style={{
        fill: 0xffffff,
        fontSize: 24,
        fontWeight: "bold",
      }}
      x={0}
      y={0}
    />
  );
};

export default Score;
