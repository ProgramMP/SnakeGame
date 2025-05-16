import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSelector } from "react-redux";
import type { RootState } from "../Store/index.ts";
import { useRef } from "react";

type SnakeProps = {
  x: number;
  y: number;
  size: number;
  index: number;
};

const Snake = ({ x, y, size, index }: SnakeProps) => {
  const { game } = useSelector((state: RootState) => state.game);

  const bodyRef = useRef<any>(null);

  useGSAP(
    () => {
      if (bodyRef.current) {
        gsap.to(bodyRef.current!, {
          pixi: {
            x: x,
            y: y,
          },
          duration: 0.1,
          ease: "power1.out",
        });
      }
    },
    { dependencies: [x, y, size, game] }
  );

  useGSAP(() => {
    if (game === "deathScreen" && bodyRef.current) {
      gsap.to(bodyRef.current, {
        alpha: 0,
        scaleX: 0,
        scaleY: 0,
        duration: 1,
        ease: "back.in",
        delay: index * 0.03,
      });
    }
  }, [game]);
  return (
    <pixiGraphics
      ref={bodyRef}
      x={x}
      y={y}
      draw={(g) => {
        g.clear();

        if (index === 0) {
          // Head with rounded rect and eyes
          g.fill(0x00cc66).roundRect(0, 0, size, size + 1, 5);
          g.endFill();

          // Eyes
          g.fill(0x000000)
            .circle(size * 0.3, size * 0.3, size * 0.1)
            .circle(size * 0.7, size * 0.3, size * 0.1);
          g.endFill();
        } else {
          g.fill(0x00cc66).roundRect(0, 0, size, size + 1, 4);
          g.endFill();
        }
      }}
    />
  );
};

export default Snake;
