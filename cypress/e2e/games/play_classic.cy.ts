import { GameTypeEnum, GuessGameTypeEnum } from "../../../src/interfaces";
import { hiraganaMainKanaData } from "../../../src/lib/data";
import { GuessGameMock } from "../../../src/mocks/GuessGameMock";

describe("Game KanaQuiz: Play classic mode", () => {
  const data = hiraganaMainKanaData;
  beforeEach(() => {
    cy.visitGames(GameTypeEnum.KanaQuiz);
    cy.window().then((win) => {
      (win as Window).CYPRESS_TEST = true;
    });
    cy.playClassicMode(GameTypeEnum.KanaQuiz);
  });

  it("perfect", () => {
    cy.GamePerfectMethod({ data, expectedText: "46/46 (100.00%)" });
  });

  it("50% errors", () => {
    cy.ClassicModeHalfErrorsMethod({ data, expectedText: "23/46 (50.00%)" });
  });

  it("randomly positions", () => {
    cy.ClassicModeRandomPosMethod({ data, expectedText: "2/46 (4.35%)", expectedErrors: "2" });
  });

  it("check playAgain button", () => {
    cy.ButtonPlayAgain();
  });

  it("check goHome button", () => {
    cy.ButtonGoHome();
  });
});

describe("Game GuessGame(Furigana mode): Play classic mode", async () => {
  const data = GuessGameMock;
  beforeEach(() => {
    cy.visitGames(GameTypeEnum.Guess);
    cy.window().then((win) => {
      (win as Window).CYPRESS_TEST = true;
    });
    cy.playClassicMode(GameTypeEnum.Guess);
  });

  it("perfect", () => {
    cy.GamePerfectMethod({ data, expectedText: "20/20 (100.00%)" });
  });

  it("50% errors", () => {
    cy.ClassicModeHalfErrorsMethod({ data, expectedText: "10/20 (50.00%)" });
  });

  it("randomly positions", () => {
    cy.ClassicModeRandomPosMethod({ data, expectedText: "2/20 (10.00%)", expectedErrors: "2" });
  });

  it("check playAgain button", () => {
    cy.ButtonPlayAgain();
  });

  it("check goHome button", () => {
    cy.ButtonGoHome();
  });
});

describe("Game GuessGame(Meaning mode): Play classic mode", async () => {
  const data = GuessGameMock;
  beforeEach(() => {
    cy.visitGames(GameTypeEnum.Guess);
    cy.window().then((win) => {
      (win as Window).CYPRESS_TEST = true;
    });
    cy.playClassicMode(GameTypeEnum.Guess, GuessGameTypeEnum.MEANING);
  });

  it("perfect", () => {
    cy.GamePerfectMethod({ data, expectedText: "20/20 (100.00%)", type: GuessGameTypeEnum.MEANING });
  });

  it("50% errors", () => {
    cy.ClassicModeHalfErrorsMethod({ data, expectedText: "10/20 (50.00%)", type: GuessGameTypeEnum.MEANING });
  });

  it("randomly positions", () => {
    cy.ClassicModeRandomPosMethod({ data, expectedText: "2/20 (10.00%)", expectedErrors: "2", type: GuessGameTypeEnum.MEANING });
  });

  it("check playAgain button", () => {
    cy.ButtonPlayAgain();
  });

  it("check goHome button", () => {
    cy.ButtonGoHome();
  });
});
