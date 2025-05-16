import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSelector } from "react-redux";
import type { RootState } from "../Store/index.ts";
import { useRef } from "react";
import { Graphics } from "pixi.js";
import { PixiPlugin } from "gsap/PixiPlugin";
import * as PIXI from "pixi.js";

type AreaProps = {
  width: number;
  height: number;
  canvasHeight: number;
};

const Area = ({ width, height, canvasHeight }: AreaProps) => {
  PixiPlugin.registerPIXI(PIXI);
  gsap.registerPlugin(PixiPlugin);

  const { game } = useSelector((state: RootState) => state.game);

  const areaRef = useRef<Graphics>(null);

  useGSAP(() => {
    if (areaRef.current && game === "deathScreen") {
      gsap.to(areaRef.current, {
        alpha: 0,
        duration: 0.4,
        ease: "back.in",
        delay: 0.03,
      });
    }
  }, [game]);

  return (
    <pixiGraphics
      ref={areaRef}
      y={(canvasHeight - height) / 2}
      draw={(g) => {
        g.clear();

        g.fill("#90C67C").roundRect(0.5, 0.5, width - 1, height - 1, 8);
        g.endFill();
      }}
    />
  );
};

export default Area;
