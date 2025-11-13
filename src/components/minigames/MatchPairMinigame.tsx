"use client";

import { withMinigame } from "@/hoc/withMinigame";
import { GameTypeEnum, WordSortedInterface } from "@/interfaces";
import { MinigameLayout } from "./MinigameLayout";
import { useEffect } from "react";
import { useMinigame } from "@/context/MinigameContext";
import { MinigameMatchPairRepository } from "@/services/game/minigames/MinigameMatchPairRepository";

const MatchPairMinigameComponent = ({ words }: { words: WordSortedInterface[] }) => {
  const { data, game, input, startGame, handleChange } = useMinigame();

  useEffect(() => {
    startGame({ words, type: GameTypeEnum.MatchPair });
  }, []);

  if (!game?.game) return null;

  return (
    <MinigameLayout>
      <div className="grid md:grid-cols-2 gap-x-5 md:gap-x-20 gap-y-5">
        {(data as WordSortedInterface[][]).map((arr, i) => (
          <div key={i} className="flex flex-col gap-5 flex-1">
            {arr.map(([left, right], i2) => {
              const disabledLeft = (game as MinigameMatchPairRepository).checkDisabled(left);
              const disabledRight = (game as MinigameMatchPairRepository).checkDisabled(right);
              const activeLeft = (input as [string, string])[0] === left;
              const activeRight = (input as [string, string])[1] === right;

              return (
                <div key={i2} className="flex gap-x-5">
                  <button
                    className={`${disabledLeft ? "bg-secondary" : activeLeft ? "bg-accent" : "bg-primary"} w-full text-buttonNavText`}
                    disabled={disabledLeft}
                    value={left}
                    onClick={() => handleChange(left, "left")}
                  >
                    {left}
                  </button>
                  <button
                    className={`${disabledRight ? "bg-secondary" : activeRight ? "bg-accent" : "bg-primary"} w-full text-buttonNavText`}
                    disabled={disabledRight}
                    value={right}
                    onClick={() => handleChange(right, "right")}
                  >
                    {right}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </MinigameLayout>
  );
};

export const MatchPairMinigame = withMinigame(MatchPairMinigameComponent);
