import { GuessGameMock } from "../../../src/mocks/GuessGameMock";
import { GameTypeEnum, GuessGameTypeEnum } from "../../../src/interfaces";
import { hiraganaMainKanaData } from "../../../src/lib/data";

describe("Game KanaQuiz: Play no errors mode", () => {
  const data = hiraganaMainKanaData;
  beforeEach(() => {
    cy.visitGames(GameTypeEnum.KanaQuiz);
    cy.window().then((win) => {
      (win as Window).CYPRESS_TEST = true;
    });
    cy.playNoErrorsMode(GameTypeEnum.KanaQuiz);
  });

  it("perfect", () => {
    cy.GamePerfectMethod({ data, expectedText: "46/46 (100.00%)" });
  });

  it("valid and error", () => {
    cy.GameValidAndErrorMethod({ data, expectedText: "1/46 (2.17%)", expectedErrors: "1" });
  });

  it("valid, error and try one more", () => {
    cy.NoErrorsModeValidErrorMethod({ data, expectedText: "1/46 (2.17%)", expectedErrors: "1" });
  });

  it("randomly positions", () => {
    cy.NoErrorsModeRandomPosMethod({ data, expectedText: "2/46 (4.35%)", expectedErrors: "1" });
  });
});

describe("Game GuessGame(Furigana mode): Play no errors mode", () => {
  const data = GuessGameMock;
  beforeEach(() => {
    cy.visitGames(GameTypeEnum.Guess);
    cy.window().then((win) => {
      (win as Window).CYPRESS_TEST = true;
    });
    cy.playNoErrorsMode(GameTypeEnum.Guess);
  });

  it("perfect", () => {
    cy.GamePerfectMethod({ data, expectedText: "20/20 (100.00%)" });
  });

  it("valid and error", () => {
    cy.GameValidAndErrorMethod({ data, expectedText: "1/20 (5.00%)", expectedErrors: "1" });
  });

  it("valid, error and try one more", () => {
    cy.NoErrorsModeValidErrorMethod({ data, expectedText: "1/20 (5.00%)", expectedErrors: "1" });
  });

  it("randomly positions", () => {
    cy.NoErrorsModeRandomPosMethod({ data, expectedText: "2/20 (10.00%)", expectedErrors: "1" });
  });
});

describe("Game GuessGame(Meaning mode): Play no errors mode", () => {
  const data = GuessGameMock;
  beforeEach(() => {
    cy.visitGames(GameTypeEnum.Guess);
    cy.window().then((win) => {
      (win as Window).CYPRESS_TEST = true;
    });
    cy.playNoErrorsMode(GameTypeEnum.Guess, GuessGameTypeEnum.MEANING);
  });

  it("perfect", () => {
    cy.GamePerfectMethod({ data, expectedText: "20/20 (100.00%)", type: GuessGameTypeEnum.MEANING });
  });

  it("valid and error", () => {
    cy.GameValidAndErrorMethod({ data, expectedText: "1/20 (5.00%)", expectedErrors: "1", type: GuessGameTypeEnum.MEANING });
  });

  it("valid, error and try one more", () => {
    cy.NoErrorsModeValidErrorMethod({ data, expectedText: "1/20 (5.00%)", expectedErrors: "1", type: GuessGameTypeEnum.MEANING });
  });

  it("randomly positions", () => {
    cy.NoErrorsModeRandomPosMethod({ data, expectedText: "2/20 (10.00%)", expectedErrors: "1", type: GuessGameTypeEnum.MEANING });
  });
});
