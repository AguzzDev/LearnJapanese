import { WordSortedInterface } from "@/interfaces";
import { MinigameBaseRepository } from "./MinigameBaseRepository";

export class MinigameMatchPairRepository extends MinigameBaseRepository<WordSortedInterface> {
  shuffledWords: WordSortedInterface[];

  constructor({ words, onUpdate }: { words: WordSortedInterface[]; onUpdate: () => void }) {
    super({ words, onUpdate });
    this.shuffledWords = this.createShuffledWords(words);
  }

  shuffle(words: WordSortedInterface[] | string[]): (WordSortedInterface | string)[] {
    const arr = [...words];

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  }

  createShuffledWords(words: WordSortedInterface[]): WordSortedInterface[] {
    const firstCol = words.map(([first]) => first);
    const secondCol = words.map(([, second]) => second);

    const shuffledFirst = this.shuffle(firstCol);
    const shuffledSecond = this.shuffle(secondCol);

    return shuffledFirst.map((first, i) => [first, shuffledSecond[i]]) as WordSortedInterface[];
  }

  getData() {
    return this.shuffledWords;
  }

  checkAnswer({ input }: { input: string | [string, string]; response?: boolean }): boolean {
    const [left, right] = input as [string, string];
    const same = this.words.some((data) => data[0] === left && data[1] === right);
    if (same) {
      this.game.disabled.push(left, right);
      this.updateGame({ current: this.game.current + 1 });

      if (this.game.current === this.words.length) {
        this.updateGame({ finish: true });
      }
      return true;
    }

    return false;
  }

  checkDisabled(word: string) {
    return this.game.disabled.includes(word);
  }
}
