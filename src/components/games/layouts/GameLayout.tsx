"use client";
import { ButtonOne } from "@/components/ui/button/ButtonOne";
import { useGame } from "@/context/GameContext";
import { GuessGameTypeEnum } from "@/interfaces";

export const GameLayout = () => {
  const { game, inputs, updateInput, answers, handleSubmit, updateCurrent, endGame, isKanaGame, isGuessGame } = useGame();

  return (
    <>
      <div data-id="game-view" className="overflow-y-scroll h-[90%]">
        <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pr-3">
          {game?.getData().map((d, i) => {
            let word;
            if (isGuessGame) {
              word = (
                <div className="flex items-center justify-center h-20">
                  <p>{game.options.type === GuessGameTypeEnum.FURIGANA ? d.meaning : d.furigana}</p>
                  {game.options.type === GuessGameTypeEnum.MEANING ? <p>{d.romaji}</p> : null}
                </div>
              );
            }
            if (isKanaGame) {
              word = <p className="py-2 text-2xl">{d.furigana}</p>;
            }

            return (
              <div key={i} className={`${answers.get(i) === true ? "bg-[#056d66]/50" : answers?.get(i) === false ? "bg-red-400/50" : ""} overflow-hidden rounded-lg text-center`}>
                {word}

                {answers.get(i) ? (
                  <p className="h-10"></p>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <input
                      ref={(el) => {
                        const prev = inputs[i];
                        inputs[i] = {
                          el,
                          status: prev?.status ?? false,
                        };
                      }}
                      autoFocus={game!.current === i}
                      type="text"
                      className="p-2"
                      onChange={(e) => updateInput(e)}
                      onClick={() => {
                        updateCurrent(i);
                      }}
                    />
                  </form>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-1 w-full justify-end space-x-5 rounded-md bg-secondary p-2">
        <ButtonOne data-id="button-endGame" variant="nav" onClick={() => endGame()}>
          Finish Quiz
        </ButtonOne>
      </div>
    </>
  );
};
