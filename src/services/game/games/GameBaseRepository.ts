import { ErrorListInterface, GameBaseInterface, WordInterface, GameSumTypeEnum, GameModeEnum, GameBaseArgs } from "@/interfaces";
import { TimerRepository } from "@/services/timer/TimerService";

export class GameBaseRepository<TType, TSub, TSub2 = null> implements GameBaseInterface {
  private timerId?: number;
  current: number;
  data: WordInterface[];
  inputs: { el: HTMLInputElement | null; status: boolean }[];
  answers: Map<number, boolean>;
  options: { mode: GameModeEnum; type: TType; subType: TSub; subType2: TSub2 | null };
  timer: TimerRepository;
  errors: number;
  errorsList: ErrorListInterface[];
  valids: number;
  onEndGameEvent?: (() => void) | undefined;

  constructor({ data, options, isTest }: GameBaseArgs<TType, TSub, TSub2>) {
    const timer = new TimerRepository();
    timer.start();

    this.data = isTest ? data : this.shuffle(data);
    this.options = { ...options, subType2: !options.subType2 ? null : options.subType2 };
    this.timer = timer;
    this.current = 0;
    this.errors = 0;
    this.valids = 0;
    this.errorsList = [];
    this.inputs = [];
    this.answers = new Map<number, boolean>();
    this.timer = timer;

    if (this.options.mode === GameModeEnum.TIMED || this.options.mode === GameModeEnum.NO_ERRORS_AND_TIMED) {
      const time = isTest ? 10000 : 5 * 60 * 1000;
      this.timerId = window.setTimeout(() => {
        this.endGame();
      }, time);
    }
  }

  getData() {
    return this.data;
  }

  getInfo() {
    return `${this.options.mode} & ${this.options.type} & ${this.options.subType} ${this.options.subType2 ? `& ${this.options.subType2}` : ""}`;
  }

  private shuffle(array: WordInterface[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  endGame() {
    this.timer.stop();
    this.timer.getTime();
    this.onEndGame();

    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = undefined;
    }
  }

  updateCurrent(number: number) {
    this.current = number;
  }

  private updateValidsOrErrors(type: GameSumTypeEnum) {
    if (type == GameSumTypeEnum.VALID) {
      this.valids++;
    } else {
      this.errors++;
    }
  }

  private updateAnswers(answer: boolean) {
    this.answers.set(this.current, answer);
  }

  private updateInputs(answer: boolean) {
    const input = this.inputs[this.current];
    const updated = {
      ...input,
      status: answer,
    };

    this.inputs[this.current] = updated;
  }

  private checkIfNextElementIsValid() {
    const input = this.inputs[this.current + 1]?.status;
    return input == true;
  }

  private checkFinish() {
    return this.inputs.every((v) => v.status === true);
  }

  private findFirstInputError() {
    return this.inputs.findIndex((v) => v.status === false);
  }

  isThisElementValid() {
    return this.answers.get(this.current);
  }

  move() {
    const checkFinish = this.checkFinish();
    if (checkFinish) {
      this.endGame();
      return;
    }

    let to = this.current + 1;
    const lastElement = to === this.data.length;
    const inputStatus = this.checkIfNextElementIsValid();

    if (inputStatus || lastElement) {
      const findFirstNotCompleted = this.findFirstInputError();
      to = findFirstNotCompleted;
    }

    this.updateCurrent(to);
    return to;
  }

  checkAnswer({ input, response }: { input: string; response?: boolean }) {
    const data = this.data[this.current];

    if (!response) {
      this.errorsList.push({ ...data, you: input.toLowerCase() });
    }

    const alreadyPlayed = this.answers.get(this.current);
    if (alreadyPlayed === undefined) {
      this.updateValidsOrErrors(response ? GameSumTypeEnum.VALID : GameSumTypeEnum.ERROR);
    }

    this.updateInputs(response!);
    this.updateAnswers(response!);

    if (this.options.mode === GameModeEnum.TIMED || this.options.mode === GameModeEnum.NO_ERRORS_AND_TIMED) {
      if (!response) {
        return this.endGame();
      }
    }
    if (this.options.mode === GameModeEnum.NO_ERRORS && !response) {
      return this.endGame();
    }

    return response ?? false;
  }

  private onEndGame() {
    if (this.onEndGameEvent) {
      this.onEndGameEvent();
    }
  }
}
