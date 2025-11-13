import { GuessNumbersGameTypeEnum, MinigameArgs, WordStringStringInterface } from "@/interfaces";
import { MinigameBaseRepository } from "./MinigameBaseRepository";

export class MinigameGuessNumbersRepository extends MinigameBaseRepository<WordStringStringInterface, GuessNumbersGameTypeEnum> {
  remainingWords: WordStringStringInterface[];

  constructor({ mode, words, onUpdate }: MinigameArgs<WordStringStringInterface[], GuessNumbersGameTypeEnum>) {
    super({ mode, words, onUpdate });
    this.remainingWords = words;
  }

  getRandomWord() {
    const randomIndex = Math.floor(Math.random() * this.remainingWords.length);
    const randomWord = this.remainingWords[randomIndex];

    this.remainingWords = this.remainingWords.filter((_, i) => i !== randomIndex);
    if (this.remainingWords.length === 0) {
      this.updateGame({ finish: true });
      return;
    }

    this.updateGame({ word: randomWord });
  }

  handleSkip(): void {
    if (this.remainingWords.length === 0) {
      this.updateGame({ finish: true });
    } else {
      this.getRandomWord();
    }
  }

  handleRestart(): void {
    this.remainingWords = this.words;
    super.handleRestart();
  }

  validResponse(input: string): boolean {
    const word = this.game.word!;
    const wordFormatted = input.replace(/ /g, "").toLowerCase();
    const selectWordType = (this.game.mode === GuessNumbersGameTypeEnum.TEXT ? word[0] : word[1]) as string;
    const wordResponseFormatted = selectWordType.replace(/ /g, "").toLowerCase();

    return wordResponseFormatted.includes(wordFormatted);
  }

  handleResponseType(correct: boolean): void {
    if (correct) {
      this.updateGame({ correct: false });
      this.getRandomWord()!;
    } else {
      this.updateGame({ incorrect: false });
    }
  }

  checkAnswer({ input }: { input: string | [string, string]; response?: boolean }): boolean {
    if (this.validResponse(input as string)) {
      this.updateGame({ correct: true });
      return true;
    } else {
      this.updateGame({ incorrect: true });
      return false;
    }
  }

  startGame(): void {
    this.getRandomWord();
    super.startGame();
  }
}
