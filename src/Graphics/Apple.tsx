import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSelector } from "react-redux";
import type { RootState } from "../Store/index.ts";
import { useRef } from "react";
import { Graphics } from "pixi.js";

type AppleProps = {
  x: number;
  y: number;
  size: number;
};

const Apple = ({ x, y, size }: AppleProps) => {
  const { game } = useSelector((state: RootState) => state.game);

  const appleRef = useRef<Graphics>(null);

  useGSAP(() => {
    if (appleRef.current && game === "deathScreen") {
      gsap.to(appleRef.current, {
        alpha: 0,
        scaleX: 0,
        scaleY: 0,
        duration: 0.4,
        ease: "back.in",
        delay: 0.03,
      });
    }
  }, [game]);

  useGSAP(
    () => {
      if (appleRef.current) {
        gsap.set(appleRef.current.scale, { x: 0, y: 0 });

        gsap.to(appleRef.current.scale, {
          x: 1,
          y: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    },
    { dependencies: [x, y] }
  );

  return (
    <pixiGraphics
      ref={appleRef}
      x={x}
      y={y}
      draw={(g) => {
        g.clear();

        // Apple body
        g.fill(0xff0000); // red
        g.circle(size / 2, size / 2, size / 2);
        g.endFill();

        // Stem
        g.fill(0x8b4513); // brown
        g.rect(size / 2 - 1.5, 2, 3, 6);
        g.endFill();

        // Leaf
        g.fill(0x00ff00);
        g.ellipse(size / 2 + 4, 4, 4, 2);
        g.endFill();
      }}
    />
  );
};

export default Apple;
