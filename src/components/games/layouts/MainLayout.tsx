"use client";
import dynamic from "next/dynamic";
import { useGame } from "@/context/GameContext";
import { GameStatesEnum, MainLayoutProps } from "@/interfaces";
import { useState, useEffect, useMemo } from "react";
import { GameLayout } from "./GameLayout";
import { ResultsLayout } from "./ResultsLayout";

export const MainLayout = (props: MainLayoutProps) => {
  let body;
  const { game, state, updateCurrentGame } = useGame();
  const gameInfo = game?.getInfo();

  const [timer, setTimer] = useState("00:00");
  const DefaultState = useMemo(() => dynamic(() => import(`../${props.id}/states/Default`), { ssr: false, loading: () => <p>Loading...</p> }), [props.id]);

  useEffect(() => {
    if (!game) return;

    game.timer.onGetTimerEvent = () => {
      setTimer(game.timer.time);
    };

    return () => {
      setTimer("00:00");
    };
  }, [game]);

  useEffect(() => {
    updateCurrentGame(props!.id);
  }, []);

  if (state === GameStatesEnum.DEFAULT && DefaultState) {
    body = <DefaultState />;
  } else if (state === GameStatesEnum.GAME) {
    body = <GameLayout />;
  } else if (state === GameStatesEnum.RESULTS) {
    body = <ResultsLayout />;
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1>{props.title}</h1>
        {state == GameStatesEnum.GAME && (
          <div className="flex flex-col sm:flex-row items-center justify-between space-x-3">
            <h4 data-id="game-mode" className="py-2">
              {gameInfo}
            </h4>

            <h4>{timer}</h4>
          </div>
        )}
      </div>

      <div className="flex flex-col h-full">{body}</div>
    </div>
  );
};
