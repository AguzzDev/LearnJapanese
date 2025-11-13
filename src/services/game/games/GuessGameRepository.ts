import { JLPTTypeEnum, GuessGameTypeEnum, GuessGameGuessType2Enum, GuessGameArgs } from "@/interfaces";
import { GameBaseRepository } from "./GameBaseRepository";

export class GuessGameRepository extends GameBaseRepository<GuessGameTypeEnum, JLPTTypeEnum, GuessGameGuessType2Enum> {
  constructor({ isTest = false, words, ...options }: GuessGameArgs) {
    super({ data: words, options, isTest });
  }

  validResponse(input: string) {
    const word = this.data[this.current];
    const wordFormatted = input.replace(/ /g, "").toLowerCase();
    const selectWordType = (this.options.type === GuessGameTypeEnum.FURIGANA ? word.romaji : word.meaning) as string;
    const wordResponseFormatted = selectWordType.split(";").map((d) => d.replace(/ /g, "").toLowerCase());

    return wordResponseFormatted.includes(wordFormatted);
  }

  override checkAnswer({ input }: { input: string; response?: boolean }): boolean {
    const response = this.validResponse(input);
    return super.checkAnswer({ input, response }) as boolean;
  }
}
