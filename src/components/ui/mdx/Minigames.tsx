import { MatchPairMinigame } from "@/components/minigames/MatchPairMinigame";
import { GuessMinigame } from "@/components/minigames/GuessMinigame";
import { GameTypeEnum, GuessGameTypeEnum, GuessNumbersGameTypeEnum, MinigamesJSXProps, WordInterface, WordSortedInterface } from "@/interfaces";
import { GuessNumbersGameMock } from "@/mocks/GuessNumbersGameMock";
import { GuessNumbersMinigame } from "@/components/minigames/GuessNumbersMinigame";

export const Minigames = (props: MinigamesJSXProps & { i?: number; arrayLength?: number; words: WordInterface[] | WordSortedInterface[] }) => {
  const titleDict = {
    [GameTypeEnum.Guess]: "Guess Game",
    [GameTypeEnum.GuessNumbers]: "Guess Game",
    [GameTypeEnum.KanaQuiz]: "Kana Quiz",
    [GameTypeEnum.MatchPair]: "Match the Pair",
  } as const;
  const title = props?.minigames ? titleDict[Object.keys(props?.minigames)[0] as GameTypeEnum] : null;

  if (!props.minigames) return null;
  return (
    <div className="py-10">
      <h3>Minigame: {title}</h3>
      <div className="flex flex-col sm:flex-row sm:space-x-32 justify-between w-full">
        {props?.minigames[GameTypeEnum.Guess]?.meaning && <GuessMinigame mode={GuessGameTypeEnum.MEANING} words={props.words as WordInterface[]} />}
        {props?.minigames[GameTypeEnum.Guess]?.furigana && <GuessMinigame mode={GuessGameTypeEnum.FURIGANA} words={props.words as WordInterface[]} />}
        {props?.minigames[GameTypeEnum.MatchPair] && <MatchPairMinigame words={props.words as WordSortedInterface[]} />}
        {props?.minigames[GameTypeEnum.GuessNumbers]?.numbers && <GuessNumbersMinigame mode={GuessNumbersGameTypeEnum.NUMBER} words={GuessNumbersGameMock} />}
        {props?.minigames[GameTypeEnum.GuessNumbers]?.text && <GuessNumbersMinigame mode={GuessNumbersGameTypeEnum.TEXT} words={GuessNumbersGameMock} />}
      </div>
    </div>
  );
};
