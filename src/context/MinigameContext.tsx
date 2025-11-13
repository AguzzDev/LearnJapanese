"use client";
import { GameTypeEnum, GuessGameTypeEnum, GuessNumbersGameTypeEnum, MinigameContextInterface, WordInterface, WordSortedInterface, WordStringStringInterface } from "@/interfaces";
import { MinigameMatchPairRepository } from "@/services/game/minigames/MinigameMatchPairRepository";
import { createContext, FormEvent, useContext, useEffect, useState } from "react";
import { sleep } from "@/utils/sleep";
import { MinigameGuessGameRepository } from "@/services/game/minigames/MinigameGuessGameRepository";
import { MinigameGuessNumbersRepository } from "@/services/game/minigames/MinigameGuessNumbersRepository";
import { useShow } from "./ShowContext";

export const MinigameContext = createContext<MinigameContextInterface | null>(null);

export const MinigameProvider = ({ children }: { children: React.ReactNode }) => {
  const [, setVersion] = useState(0);
  const [game, setGame] = useState<MinigameContextInterface["game"]>(null);
  const [data, setData] = useState<MinigameContextInterface["data"]>([]);
  const [input, setInput] = useState<MinigameContextInterface["input"]>(null);
  const [gameOpts, setGameOpts] = useState<{
    type: GameTypeEnum;
    mode: GuessNumbersGameTypeEnum | GuessGameTypeEnum | null;
  } | null>(null);
  const [words, setWords] = useState<WordInterface[] | WordSortedInterface[]>();
  const [restart, setRestart] = useState(false);
  const [firstClick, setFirstClick] = useState<boolean>(true);

  const { active, updateShow } = useShow();

  const handleClick = () => {
    if (game instanceof MinigameGuessGameRepository || game instanceof MinigameGuessNumbersRepository) {
      if (!active.boolean) {
        updateShow("removeAll");
      }
      updateShow(gameOpts!.mode === GuessGameTypeEnum.MEANING ? "meaning" : "furigana");
    } else {
      updateShow("all");
      setFirstClick(false);
    }
  };

  const handleChange = (value: string, type?: "left" | "right") => {
    if (Array.isArray(input)) {
      if (firstClick) {
        handleClick();
      }

      if (type === "left") {
        setInput((prev) => [value, prev![1]]);
      } else {
        setInput((prev) => [prev![0], value]);
      }
      return;
    }

    setInput(value);
  };

  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    if (game instanceof MinigameMatchPairRepository) {
      const res = game!.checkAnswer({ input: input as [string, string] });
      if (res) {
        clearInput();
      }
    } else if (game instanceof MinigameGuessGameRepository || game instanceof MinigameGuessNumbersRepository) {
      e!.preventDefault();

      if (!input) return;
      const res = game!.checkAnswer({ input: input as string });
      setInput("");
      await sleep(1500);
      game!.handleResponseType(res);
    }
  };

  const handleRestart = () => {
    clearInput();
    setRestart(true);
    startGame();
  };

  const clearInput = () => {
    if (Array.isArray(input)) {
      setInput(["", ""]);
    } else {
      setInput("");
    }
  };

  const handleSkip = () => {
    setInput("");
    if (game instanceof MinigameGuessGameRepository || game instanceof MinigameGuessNumbersRepository) {
      game!.handleSkip();
    }
  };

  const startGame = (
    args?: {
      words?: WordInterface[] | WordSortedInterface[] | undefined;
      type: GameTypeEnum;
      mode?: GuessGameTypeEnum | GuessNumbersGameTypeEnum;
    }
  ) => {
    const type = args?.type ?? gameOpts!.type!;
    if (type === GameTypeEnum.KanaQuiz) return;

    if (args) {
      setGameOpts({ type: args.type, mode: args?.mode ?? null});
      setWords(args!.words);
      setInput(args.type === GameTypeEnum.MatchPair ? ["", ""] : "");
    }

    const gameFactory = {
      [GameTypeEnum.Guess]: () =>
        new MinigameGuessGameRepository({
          mode: (args?.mode ?? gameOpts!.mode) as GuessGameTypeEnum,
          words: (args?.words ?? words) as WordInterface[],
          onUpdate: () => setVersion((v) => v + 1),
        }),

      [GameTypeEnum.MatchPair]: () =>
        new MinigameMatchPairRepository({
          words: (args?.words ?? words) as WordSortedInterface[],
          onUpdate: () => setVersion((v) => v + 1),
        }),

      [GameTypeEnum.GuessNumbers]: () =>
        new MinigameGuessNumbersRepository({
          mode: (args?.mode ?? gameOpts!.mode) as GuessNumbersGameTypeEnum,
          words: (args?.words ?? words) as WordStringStringInterface[],
          onUpdate: () => setVersion((v) => v + 1),
        }),
    } as const;

    const newGame = gameFactory[type]();
    if (newGame instanceof MinigameMatchPairRepository) {
      const getData = newGame?.getData();
      setData(getData.length < 10 ? [getData] : chunkArray(getData));
    }
    if (newGame instanceof MinigameGuessGameRepository || newGame instanceof MinigameGuessNumbersRepository) {
      newGame.startGame();
    }

    if (restart) {
      handleClick();
    }
    setGame(newGame);
    setRestart(false);
  };

  const chunkArray = (arr: WordSortedInterface[], size = 10): WordSortedInterface[][] => {
    const chunks: WordSortedInterface[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  useEffect(() => {
    if (game instanceof MinigameMatchPairRepository && input) {
      if (input[0] && input[1]) {
        handleSubmit();
      }
    }
  }, [input]);

  useEffect(() => {
    if (game?.game.finish) {
      updateShow("all");
    }
  }, [game?.game.finish]);

  return <MinigameContext.Provider value={{ data, game, input, startGame, handleChange, handleRestart, handleSubmit, handleSkip, handleClick }}>{children}</MinigameContext.Provider>;
};

export const useMinigame = () => {
  const context = useContext(MinigameContext);

  if (!context) throw new Error("useMinigameContext must be used within MinigameProvider");
  return context;
};
