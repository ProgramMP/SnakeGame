import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../Store/index.ts";
import classes from "./Screen.module.css";

type ScreenProps = {
  title: string;
  button: string;
  handleScreen: () => void;
};

const Screen = ({ button, title, handleScreen }: ScreenProps) => {
  const { score, game } = useSelector((state: RootState) => state.game);

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const screenRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      screenRef.current,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        delay: 1.5,
        opacity: 1,
        scale: 1,
        transform: "translate(0, 0)",
        duration: 0.5,
        ease: "power3.out",
        onComplete: () => setButtonDisabled(false),
      }
    );
  }, []);

  return (
    <div ref={screenRef} className={classes.overlay}>
      <div className={classes.content}>
        <h1
          className={
            game === "deathScreen" ? classes.deathScreen : classes.nextLevel
          }
        >
          {title}
        </h1>
        {game === "deathScreen" && <h2>Score: {score}</h2>}
        <div className={classes.button}>
          <button onClick={() => handleScreen()} disabled={buttonDisabled}>
            {button}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Screen;
