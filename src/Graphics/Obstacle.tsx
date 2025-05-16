import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSelector } from "react-redux";
import type { RootState } from "../Store/index.ts";
import { useRef } from "react";
import { Graphics } from "pixi.js";

type ObstacleProps = {
  width: number;
  height: number;
  areaWidth: number;
  areaHeight: number;
  offsetX: number;
  offsetY: number;
};

const Obstacle = ({ width, height, offsetX, offsetY }: ObstacleProps) => {
  const { game } = useSelector((state: RootState) => state.game);

  const obstacleRef = useRef<Graphics>(null);

  useGSAP(() => {
    if (obstacleRef.current && game === "deathScreen") {
      gsap.to(obstacleRef.current, {
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
    <pixiGraphics
      ref={obstacleRef}
      x={offsetX}
      y={offsetY}
      draw={(g) => {
        g.clear();

        // Base hay color
        g.fill(0xf4d35e); // golden-yellow
        g.roundRect(0, 0, width, height, 4);
        g.endFill();

        // Twine lines
        g.stroke({ width: 2, color: 0xc2a83e });
        const lineOffsetY = height / 4;
        for (let i = 1; i < 4; i++) {
          g.moveTo(0, i * lineOffsetY);
          g.lineTo(width, i * lineOffsetY);
        }

        // Optional outline
        g.stroke({ width: 2, color: 0xa88d32 });
        g.roundRect(0, 0, width, height, 4);
      }}
    />
  );
};

export default Obstacle;
