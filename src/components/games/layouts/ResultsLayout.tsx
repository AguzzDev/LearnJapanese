"use client";
import { useGame } from "@/context/GameContext";
import { getPercentage } from "@/utils/getPercentage";
import { ButtonOne } from "@/components/ui/button/ButtonOne";

export const ResultsLayout = () => {
  const { game, startGame, goHome, isKanaGame, isGuessGame } = useGame();
  const valids = game!.valids;

  let body;
  if (isKanaGame) {
    body = (
      <>
        {game!.errorsList!.map((d, i: number) => (
          <div key={i} className="text-center">
            <h3>{d.furigana}</h3>
            <h3>{d.romaji}</h3>
            <p>You: {d.you}</p>
          </div>
        ))}
      </>
    );
  }
  if (isGuessGame) {
    body = (
      <>
        {game!.errorsList!.map((d, i: number) => (
          <div key={i} className="text-center">
            <h3>
              {d.furigana} - {d.romaji}
            </h3>
            <h4>{d.meaning}</h4>

            <p>You: {d.you}</p>
          </div>
        ))}
      </>
    );
  }
  return (
    <div data-id="results-view">
      <h2>Results</h2>

      <div>
        <p data-id="game-mode">Game mode: {game?.getInfo()}</p>
        <p data-id="overall-correct">
          Overall Correct: {valids}/{game!.data.length} {getPercentage(valids, game!.data.length)}
        </p>
        <p data-id="time">Time: {game!.timer.time}</p>
        <p data-id="errors">Errors: {game!.errors}</p>

        <div className="flex items-center space-x-10 mt-2">{body}</div>
      </div>

      <div className="flex flex-col justify-end flex-1 space-y-3">
        <ButtonOne data-id="button-play-again" onClick={() => startGame()}>
          Play again
        </ButtonOne>
        <ButtonOne data-id="button-go-home" onClick={goHome}>
          Back to home
        </ButtonOne>
      </div>
    </div>
  );
};
