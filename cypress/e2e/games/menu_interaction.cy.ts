import { GameTypeEnum } from "../../../src/interfaces";

describe("Game KanaQuiz: Menu interaction", () => {
  beforeEach(() => {
    cy.visitGames(GameTypeEnum.KanaQuiz);
    cy.window().then((win) => {
      (win as Window).CYPRESS_TEST = true;
    });
  });

  it("should return 'Select mode' error", () => {
    cy.get("[data-id='button-start']").click();
    cy.get("[data-id='error']").should("contain", "Select mode");
  });

  it("should return 'Select syllabary' error", () => {
    cy.get("[data-id='button-mode-1']").click();
    cy.get("[data-id='button-subType-1']").click();
    cy.get("[data-id='button-start']").click();
    cy.get("[data-id='error']").should("contain", "Select syllabary");
  });

  it("should return 'Select group' error", () => {
    cy.get("[data-id='button-mode-1']").click();
    cy.get("[data-id='button-type-1']").click();
    cy.get("[data-id='button-start']").click();
    cy.get("[data-id='error']").should("contain", "Select group");
  });

  it("should create a game in classic mode", () => {
    cy.playClassicMode(GameTypeEnum.KanaQuiz);
  });

  it("should create a game in no errors mode", () => {
    cy.playNoErrorsMode(GameTypeEnum.KanaQuiz);
  });

  it("should create a game in with time mode", () => {
    cy.playWithTimeMode(GameTypeEnum.KanaQuiz);
  });

  it("should create a game in no errors with time mode", () => {
    cy.playNoErrorsWithTimeMode(GameTypeEnum.KanaQuiz);
  });
});

describe("Game GuessGame: Menu interaction", () => {
  beforeEach(() => {
    cy.visitGames(GameTypeEnum.Guess);
    cy.window().then((win) => {
      (win as Window).CYPRESS_TEST = true;
    });
  });

  it("should return 'Select mode' error", () => {
    cy.get("[data-id='button-start']").click();
    cy.get("[data-id='error']").should("contain", "Select mode");
  });

  it("should return 'Select game type' error", () => {
    cy.get("[data-id='button-mode-1']").click();
    cy.get("[data-id='button-subType-1']").click();
    cy.get("[data-id='button-start']").click();
    cy.get("[data-id='error']").should("contain", "Select game type");
  });

  it("should return 'Select vocabulary' error", () => {
    cy.get("[data-id='button-mode-1']").click();
    cy.get("[data-id='button-type-1']").click();
    cy.get("[data-id='button-start']").click();
    cy.get("[data-id='error']").should("contain", "Select vocabulary");
  });

  it("should return 'Select group' error", () => {
    cy.get("[data-id='button-mode-1']").click();
    cy.get("[data-id='button-type-1']").click();
    cy.get("[data-id='button-subType-1']").click();
    cy.get("[data-id='button-start']").click();
    cy.get("[data-id='error']").should("contain", "Select group");
  });

  it("should create a game in classic mode", () => {
    cy.playClassicMode(GameTypeEnum.Guess);
  });

  it("should create a game in no errors mode", () => {
    cy.playNoErrorsMode(GameTypeEnum.Guess);
  });

  it("should create a game in with time mode", () => {
    cy.playWithTimeMode(GameTypeEnum.Guess);
  });

  it("should create a game in no errors with time mode", () => {
    cy.playNoErrorsWithTimeMode(GameTypeEnum.Guess);
  });
});
