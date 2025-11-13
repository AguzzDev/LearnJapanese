"use client";
import { GameTypeEnum, GuessGameTypeEnum, WordInterface } from "@/interfaces";
import { IconMd } from "../ui/icon/Icon";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ButtonOne } from "../ui/button/ButtonOne";
import { MinigameLayout } from "./MinigameLayout";
import { useMinigame } from "@/context/MinigameContext";
import { useEffect } from "react";
import { withMinigame } from "@/hoc/withMinigame";
import { MinigameGuessGameRepository } from "@/services/game/minigames/MinigameGuessGameRepository";

const GuessMinigameComponent = ({ mode, words }: { mode: GuessGameTypeEnum; words: WordInterface[] }) => {
  const { game, input, startGame, handleChange, handleSubmit, handleSkip, handleClick } = useMinigame();

  useEffect(() => {
    startGame({ words, mode, type: GameTypeEnum.Guess });
  }, []);

  if (!game) return null;
  const gameData = game as MinigameGuessGameRepository;
  const isMeaningMode = mode === GuessGameTypeEnum.MEANING;
  const label = isMeaningMode ? "Furigana to meaning" : "Meaning to furigana";
  if (!gameData.game.word) return null;

  return (
    <MinigameLayout>
      <div className="flex justify-between items-center h-12">
        <div>
          <p>Mode: {label}</p>
          <p>{isMeaningMode ? `${gameData.game.word.kanji} —  ${gameData.game.word.furigana} — ${gameData.game.word.romaji}` : gameData.game.word.meaning}</p>
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

export const GuessMinigame = withMinigame(GuessMinigameComponent);
