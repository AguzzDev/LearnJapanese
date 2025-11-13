import { MinigameArgs, MinigameGuessGameInterface } from "@/interfaces";

export class MinigameBaseRepository<TWords, TMode = null> {
  game: MinigameGuessGameInterface<TWords, TMode>;
  protected words: TWords[];
  onUpdate: () => void;

  constructor({ mode, words, onUpdate }: MinigameArgs<TWords[], TMode>) {
    this.words = words;
    this.game = {
      current: 0,
      mode,
      restart: true,
      correct: false,
      incorrect: false,
      finish: false,
      word: null,
      disabled: [],
    };
    this.onUpdate = onUpdate;
  }

  startGame() {
    this.updateGame({ restart: false });
  }

  handleRestart() {
    this.updateGame({ restart: true, finish: false });
  }

  checkAnswer({ input }: { input: string | [string, string]; response?: boolean }): boolean {}

  updateGame(values: Partial<MinigameGuessGameInterface<TWords, TMode>>) {
    this.game = { ...this.game, ...values };
    this.onUpdate?.();
  }
}
