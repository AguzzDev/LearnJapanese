import { useMinigame } from "@/context/MinigameContext";
import { withMinigame } from "@/hoc/withMinigame";
import { useEffect } from "react";
import { MinigameLayout } from "./MinigameLayout";
import { GameTypeEnum, GuessNumbersGameTypeEnum, WordStringStringInterface } from "@/interfaces";
import { MinigameGuessNumbersRepository } from "@/services/game/minigames/MinigameGuessNumbersRepository";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ButtonOne } from "../ui/button/ButtonOne";
import { IconMd } from "../ui/icon/Icon";

export const GuessNumbersMinigameComponent = ({ mode, words }: { mode?: GuessNumbersGameTypeEnum; words: WordStringStringInterface[] }) => {
  const { game, input, startGame, handleChange, handleSubmit, handleSkip, handleClick } = useMinigame();

  useEffect(() => {
    startGame({ words, mode, type: GameTypeEnum.GuessNumbers });
  }, []);

  if (!game) return null;
  const gameData = game as MinigameGuessNumbersRepository;
  const isTextMode = mode === GuessNumbersGameTypeEnum.TEXT;
  const label = isTextMode ? "Text to number" : "Number to text";
  if (!gameData.game.word) return null;

  return (
    <MinigameLayout>
      <div className="flex justify-between items-center h-12">
        <div>
          <p>Mode: {label}</p>
          <p>{isTextMode ? gameData.game.word[1] : gameData.game.word[0]}</p>
        </div>

        {game?.game.correct && <IconMd Icon={CheckIcon} />}
        {game?.game.incorrect && <IconMd Icon={XMarkIcon} />}
      </div>

      <div className="flex flex-col space-y-2 py-3">
        <form onSubmit={handleSubmit}>
          <input className="w-full" type="text" value={input as string} onChange={(e) => handleChange(e.target.value)} onClick={handleClick} />
        </form>
        <ButtonOne onClick={handleSkip}>Skip?</ButtonOne>
      </div>
    </MinigameLayout>
  );
};

export const GuessNumbersMinigame = withMinigame(GuessNumbersMinigameComponent);
