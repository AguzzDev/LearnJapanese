import { GameTypeEnum, GuessGameTypeEnum } from "../../../src/interfaces";
import { hiraganaMainKanaData } from "../../../src/lib/data";
import { GuessGameMock } from "../../../src/mocks/GuessGameMock";

describe("Game KanaQuiz: Play with time mode", () => {
  const data = hiraganaMainKanaData;

  beforeEach(() => {
    cy.visitGames(GameTypeEnum.KanaQuiz);
    cy.window().then((win) => {
      (win as Window).CYPRESS_TEST = true;
    });
    cy.playWithTimeMode(GameTypeEnum.KanaQuiz);
  });

  it("perfect", () => {
    cy.GamePerfectMethod({ data, expectedText: "Overall Correct: 46/46 (100.00%)", expectedErrors: "0" });
  });

  it("wait 10s and ends the game", () => {
    cy.TimeModeWait5sAndEndGame({ expectedText: "0/46 (0.00%)", expectedTime: "00:10" });
  });
});

describe("Game GuessGame(Furigana mode): Play with time mode", () => {
  const data = GuessGameMock;

  beforeEach(() => {
    cy.visitGames(GameTypeEnum.Guess);
    cy.window().then((win) => {
      (win as Window).CYPRESS_TEST = true;
    });
    cy.playWithTimeMode(GameTypeEnum.Guess);
  });

  it("perfect", () => {
    cy.GamePerfectMethod({ data, expectedText: "Overall Correct: 20/20 (100.00%)", expectedErrors: "0" });
  });

  it("wait 10s and ends the game", () => {
    cy.TimeModeWait5sAndEndGame({ expectedText: "0/20 (0.00%)", expectedTime: "00:10" });
  });
});

describe("Game GuessGame(Meaning mode): Play with time mode", () => {
  const data = GuessGameMock;

  beforeEach(() => {
    cy.visitGames(GameTypeEnum.Guess);
    cy.window().then((win) => {
      (win as Window).CYPRESS_TEST = true;
    });
    cy.playWithTimeMode(GameTypeEnum.Guess, GuessGameTypeEnum.MEANING);
  });

  it("perfect", () => {
    cy.GamePerfectMethod({ data, expectedText: "Overall Correct: 20/20 (100.00%)", expectedErrors: "0", type: GuessGameTypeEnum.MEANING });
  });

  it("wait 10s and ends the game", () => {
    cy.TimeModeWait5sAndEndGame({ expectedText: "0/20 (0.00%)", expectedTime: "00:10" });
  });
});
