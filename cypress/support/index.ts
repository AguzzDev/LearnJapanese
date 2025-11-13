import { GameTypeEnum, GuessGameTypeEnum, WordInterface } from "@/interfaces";

interface Errors {
  expectedText: string;
  expectedErrors?: string;
  expectedTime?: string;
}
interface Args extends Errors {
  data: WordInterface[];
  type?: GuessGameTypeEnum;
}
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      playClassicMode(gameType: GameTypeEnum, type?: GuessGameTypeEnum): Chainable<void>;
      playNoErrorsMode(gameType: GameTypeEnum, type?: GuessGameTypeEnum): Chainable<void>;
      playWithTimeMode(gameType: GameTypeEnum, type?: GuessGameTypeEnum): Chainable<void>;
      playNoErrorsWithTimeMode(gameType: GameTypeEnum, type?: GuessGameTypeEnum): Chainable<void>;

      visitHome(): Chainable<void>;
      visitGames(gameType: GameTypeEnum): Chainable<void>;

      ButtonPlayAgain(): Chainable<void>;
      ButtonGoHome(): Chainable<void>;

      GamePerfectMethod(args: Args): Chainable<void>;
      GameValidAndErrorMethod(args: Args): Chainable<void>;

      ClassicModeHalfErrorsMethod(args: Args): Chainable<void>;
      ClassicModeRandomPosMethod(args: Args): Chainable<void>;

      NoErrorsModeValidErrorMethod(args: Args): Chainable<void>;
      NoErrorsModeRandomPosMethod(args: Args): Chainable<void>;
      TimeModeWait5sAndEndGame(args: Errors): Chainable<void>;
    }
  }
}

export {};
