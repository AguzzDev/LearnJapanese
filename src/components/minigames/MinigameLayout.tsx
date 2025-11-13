"use client";

import { useMinigame } from "@/context/MinigameContext";
import { ButtonOne } from "../ui/button/ButtonOne";

export const MinigameLayout = ({ children }: { children: React.ReactNode }) => {
  const { game, handleRestart } = useMinigame();
  if (!game?.game) return <></>;

  return (
    <div className="py-5 w-full">
      <div>
        {game.game.finish ? (
          <div className="flex flex-col space-y-2 w-3/4">
            <h5>Congratulations, you finished the minigame</h5>
            <ButtonOne onClick={handleRestart}>Restart?</ButtonOne>
          </div>
        ) : (
          <>{children}</>
        )}
      </div>
    </div>
  );
};
