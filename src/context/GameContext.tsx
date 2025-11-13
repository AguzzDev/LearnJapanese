"use client";
import {
  GameStatesEnum,
  GameContextInterface,
  GameModeEnum,
  GameTypeEnum,
  UpdateSelectModeProps,
  GameTypeMap,
  KanaGameTypeEnum,
  GuessGameTypeEnum,
  WordInterface,
  JLPTTypeEnum,
  KanaGameKanaTypeEnum,
  GuessGameGuessType2Enum,
} from "@/interfaces";
import { getSheetData } from "@/services/csv";
import { sleep } from "@/utils/sleep";
import { usePathname } from "next/navigation";
import { createContext, FormEvent, useContext, useEffect, useRef, useState } from "react";
import { GuessGameMock } from "@/mocks/GuessGameMock";
import { GuessGameRepository } from "@/services/game/games/GuessGameRepository";
import { KanaGameRepository } from "@/services/game/games/KanaGameRepository";

export const GameContext = createContext<GameContextInterface | null>(null);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState<string>("");
  const [currentGame, setCurrentGame] = useState<GameContextInterface["currentGame"]>(null);
  const [game, setGame] = useState<GameContextInterface["game"]>(null);
  const [state, setState] = useState<GameContextInterface["state"]>(GameStatesEnum.DEFAULT);
  const [selectMode, setSelectMode] = useState<GameContextInterface["selectMode"]>({ mode: null, type: null, subType: null, subType2: null });

  const isKanaGame = game instanceof KanaGameRepository;
  const isGuessGame = game instanceof GuessGameRepository;

  const inputsRef = useRef<GameContextInterface["inputs"]>([]);
  const answersRef = useRef<GameContextInterface["answers"]>(new Map());
  const path = usePathname();

  const goHome = () => {
    setState(GameStatesEnum.DEFAULT);
    setSelectMode({ mode: GameModeEnum.CLASSIC, type: null, subType: null, subType2: null });
  };

  const updateSelectMode = ({ mode, value, selectModeValue }: UpdateSelectModeProps) => {
    setSelectMode((prev) => ({ ...prev, [mode]: value }));
    if (!selectModeValue) return;
  };

  async function createGame<T extends GameTypeEnum>(gameType: T, isTest: boolean): Promise<GameTypeMap[T]> {
    const modeValues = selectMode!.mode;
    const typeValues = selectMode!.type!;
    const subTypeValues = selectMode!.subType!;
    const subType2Values = selectMode!.subType2!;

    let guessWordsList: WordInterface[] = [];

    if (gameType === GameTypeEnum.Guess) {
      try {
        guessWordsList = await getSheetData({ sheetName: `${subTypeValues}-${subType2Values}`, limit: 1000 });
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw (error as Error).message;
        }
        throw "Unknown";
      }
    }

    const selectGameDict = {
      [GameTypeEnum.KanaQuiz]: new KanaGameRepository({ mode: modeValues!, type: typeValues as KanaGameTypeEnum, subType: subTypeValues as KanaGameKanaTypeEnum, isTest }),
      [GameTypeEnum.Guess]: new GuessGameRepository({
        mode: modeValues!,
        type: typeValues as GuessGameTypeEnum,
        subType: subTypeValues as JLPTTypeEnum,
        subType2: subType2Values as GuessGameGuessType2Enum,
        words: isTest ? GuessGameMock : guessWordsList,
        isTest,
      }),
    } as const;

    return selectGameDict[gameType] as GameTypeMap[T];
  }

  const startGame = async () => {
    const isTest = (typeof window !== "undefined" && (window as Window).CYPRESS_TEST) || false;
    const gameType = currentGame!;
    try {
      const game = await createGame(gameType, isTest);

      if (game) {
        setGame(game);

        if (isTest) {
          window.game = game;
        }

        const gameF = game as GameTypeMap[GameTypeEnum.KanaQuiz];
        inputsRef.current = gameF.inputs;
        answersRef.current = gameF.answers;

        setState(GameStatesEnum.GAME);
      }
    } catch (error: unknown) {
      updateError(error as string);
    }
  };

  const endGame = async (auto = false) => {
    if (!auto) game!.endGame();

    setState(GameStatesEnum.RESULTS);
  };

  const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const clearInput = () => {
    if (inputsRef.current[game!.current].el!.value) {
      inputsRef.current[game!.current].el!.value = "";
    }

    setInput("");
  };

  const updateCurrentGame = (key: GameTypeEnum) => {
    setCurrentGame(key);
  };

  const updateCurrent = (i: number) => {
    clearInput();
    game!.updateCurrent(i);
  };

  const updateError = async (error: string) => {
    setError(error);
    await sleep(3000);
    setError(null);
  };

  const move = () => {
    if (!game) return;
    const moveTo = game!.move();
    if (moveTo === undefined) return;
    inputsRef.current[moveTo].el!.focus();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!game || input.length === 0) return;
    const isValid = game.isThisElementValid();
    if (isValid) return move();

    game.checkAnswer({ input });
    move();
    clearInput();
  };

  useEffect(() => {
    if (!game) return;

    game.onEndGameEvent = () => {
      endGame(true);
    };
  }, [game]);

  useEffect(() => {
    if (!game) return;
    const isGamePath = path.split("/").length === 3;
    if (isGamePath) return;

    return () => {
      game.endGame();
      setGame(null);
      setSelectMode({ mode: null, type: null, subType: null, subType2: null });
      setState(GameStatesEnum.DEFAULT);
    };
  }, [game, path]);

  return (
    <GameContext.Provider
      value={{
        error,
        input,
        state,
        game,
        inputs: inputsRef.current,
        answers: answersRef.current,
        selectMode,
        currentGame,
        isKanaGame,
        isGuessGame,
        handleSubmit,
        updateInput,
        updateSelectMode,
        startGame,
        endGame,
        goHome,
        updateCurrentGame,
        updateCurrent,
        updateError,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);

  if (!context) throw new Error("useGameContext must be used within GameProvider");
  return context;
};
