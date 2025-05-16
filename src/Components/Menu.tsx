import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../Store/index.ts";
import { startGame } from "../Store/gameSlice";
import classes from "./Menu.module.css";

const Menu = () => {
  const dispatch = useDispatch();
  const { leaderboard } = useSelector((state: RootState) => state.game);

  return (
    <div className={classes.menuOverlay}>
      <div className={classes.menuContent}>
        <h1>Snake Game</h1>
        <button onClick={() => dispatch(startGame())}>Start Game</button>
        <h2>Leaderboard</h2>

        {leaderboard.length === 0 ? (
          <ul>
            <li>No scores yet</li>
          </ul>
        ) : (
          <ol className={classes.leaderboardList}>
            {leaderboard.map((score, index) => {
              const medal = ["🥇", "🥈", "🥉"][index] || `#${index + 1}`;
              return (
                <li key={index}>
                  <span className={classes.medal}>{medal}</span>
                  <span className={classes.scoreValue}>Score: {score}</span>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
};
export default Menu;
