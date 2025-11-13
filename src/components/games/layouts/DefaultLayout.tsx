"use client";
import { ButtonMenu } from "@/components/ui/button/ButtonMenu";
import { useGame } from "@/context/GameContext";
import { GameFiltersEnum, GameTypeEnum, DefaultLayoutProps, GameModeEnum } from "@/interfaces";
import { useState } from "react";

export const DefaultLayout = ({ menu }: DefaultLayoutProps) => {
  const [data] = useState<DefaultLayoutProps["menu"]>([
    {
      title: "Game Modes",
      items: [
        { mode: GameFiltersEnum.MODE, title: GameModeEnum.CLASSIC, value: GameModeEnum.CLASSIC },
        { mode: GameFiltersEnum.MODE, title: GameModeEnum.NO_ERRORS, value: GameModeEnum.NO_ERRORS },
        { mode: GameFiltersEnum.MODE, title: GameModeEnum.TIMED, value: GameModeEnum.TIMED },
        { mode: GameFiltersEnum.MODE, title: GameModeEnum.NO_ERRORS_AND_TIMED, value: GameModeEnum.NO_ERRORS_AND_TIMED },
      ],
    },
    ...menu,
  ]);
  const { startGame, selectMode, currentGame, error, updateError } = useGame();

  const handleClick = async () => {
    if (!selectMode?.mode) {
      return await updateError("Select mode");
    }

    switch (currentGame) {
      case GameTypeEnum.KanaQuiz:
        if (!selectMode?.type) {
          return await updateError("Select syllabary");
        } else if (!selectMode?.subType) {
          return await updateError("Select group");
        }
        break;

      case GameTypeEnum.Guess:
        if (!selectMode?.type) {
          return await updateError("Select game type");
        } else if (!selectMode?.subType) {
          return await updateError("Select vocabulary");
        } else if (!selectMode?.subType2) {
          return await updateError("Select group");
        }

      default:
        break;
    }

    startGame();
  };

  return (
    <>
      <div data-id="default-view" className="flex flex-1 flex-col justify-center">
        <div className="flex flex-col space-y-5">
          {data?.map(({ title, items }, key) => (
            <div key={key}>
              <h4>{title}</h4>
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-2">
                {items.map((props, key) => (
                  <ButtonMenu key={key} mode={props.mode} title={props.title} value={props.value} data-id={`button-${props.mode}-${key + 1}`}>
                    {props.title}
                  </ButtonMenu>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col flex-1">
          <div className="h-10">
            {error ? (
              <p data-id="error" className="text-sm text-red-800 pt-2">
                {error}
              </p>
            ) : null}
          </div>

          <ButtonMenu className="py-4 bg-buttonActive/90 hover:bg-button" mode={GameFiltersEnum.START_BUTTON} onClick={handleClick} data-id="button-start">
            Start Quiz
          </ButtonMenu>
        </div>
      </div>
    </>
  );
};
