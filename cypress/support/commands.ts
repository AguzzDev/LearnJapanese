/* eslint-disable @typescript-eslint/no-unused-expressions */
/// <reference types="cypress" />

import { GameTypeEnum, GuessGameTypeEnum } from "../../src/interfaces";

Cypress.Commands.add("visitHome", () => {
  cy.visit("/");
});

Cypress.Commands.add("visitGames", (gameType: GameTypeEnum) => {
  const dict = {
    [GameTypeEnum.KanaQuiz]: "kanaQuiz",
    [GameTypeEnum.Guess]: "guessGame",
  };
  cy.visit(`/games/${dict[gameType]}`);
});

Cypress.Commands.add("playClassicMode", (gameType: GameTypeEnum, type?: GuessGameTypeEnum) => {
  cy.get("[data-id='button-mode-1']").click();
  cy.get("[data-id='button-type-1']").click();
  if (type === GuessGameTypeEnum.MEANING) {
    cy.get("[data-id='button-type-2']").click();
  } else {
    cy.get("[data-id='button-type-1']").click();
  }
  cy.get("[data-id='button-subType-1']").click();
  if (gameType === GameTypeEnum.Guess) {
    cy.get("[data-id='button-subType2-1']").click();
  }
  cy.get("[data-id='button-start']").click();
  cy.get("[data-id='game-view']").should("exist");
});

Cypress.Commands.add("playNoErrorsMode", (gameType: GameTypeEnum, type?: GuessGameTypeEnum) => {
  cy.get("[data-id='button-mode-2']").click();
  if (type === GuessGameTypeEnum.MEANING) {
    cy.get("[data-id='button-type-2']").click();
  } else {
    cy.get("[data-id='button-type-1']").click();
  }
  cy.get("[data-id='button-subType-1']").click();
  if (gameType === GameTypeEnum.Guess) {
    cy.get("[data-id='button-subType2-1']").click();
  }
  cy.get("[data-id='button-start']").click();
  cy.get("[data-id='game-view']").should("exist");
});

Cypress.Commands.add("playWithTimeMode", (gameType: GameTypeEnum, type?: GuessGameTypeEnum) => {
  cy.get("[data-id='button-mode-3']").click();
  if (type === GuessGameTypeEnum.MEANING) {
    cy.get("[data-id='button-type-2']").click();
  } else {
    cy.get("[data-id='button-type-1']").click();
  }
  cy.get("[data-id='button-subType-1']").click();
  if (gameType === GameTypeEnum.Guess) {
    cy.get("[data-id='button-subType2-1']").click();
  }
  cy.get("[data-id='button-start']").click();
  cy.get("[data-id='game-view']").should("exist");
});

Cypress.Commands.add("playNoErrorsWithTimeMode", (gameType: GameTypeEnum, type?: GuessGameTypeEnum) => {
  cy.get("[data-id='button-mode-4']").click();
  if (type === GuessGameTypeEnum.MEANING) {
    cy.get("[data-id='button-type-2']").click();
  } else {
    cy.get("[data-id='button-type-1']").click();
  }
  cy.get("[data-id='button-subType-1']").click();
  if (gameType === GameTypeEnum.Guess) {
    cy.get("[data-id='button-subType2-1']").click();
  }
  cy.get("[data-id='button-start']").click();
  cy.get("[data-id='game-view']").should("exist");
});

Cypress.Commands.add("ButtonPlayAgain", () => {
  cy.get("[data-id='button-endGame']").click();
  cy.get("[data-id='button-play-again']").click();
  cy.get("[data-id='game-view']").should("exist");
});
Cypress.Commands.add("ButtonGoHome", () => {
  cy.get("[data-id='button-endGame']").click();
  cy.get("[data-id='button-go-home']").click();
  cy.get("[data-id='default-view']").should("exist");
});

Cypress.Commands.add("GamePerfectMethod", ({ data, expectedText, type }) => {
  data.forEach((d) => {
    const word = type === GuessGameTypeEnum.MEANING ? d.meaning?.split(";")[0] : d.romaji;
    cy.focused().type(`${word}{enter}`);
  });
  cy.get("[data-id='overall-correct']").should("contain", expectedText);
});
Cypress.Commands.add("GameValidAndErrorMethod", ({ data, expectedText, expectedErrors, type }) => {
  let i = 0;
  const word = type === GuessGameTypeEnum.MEANING ? data[i].meaning?.split(";")[0] : data[i].romaji;

  while (i < 2) {
    const cond = i % 2 === 0;
    const char = cond ? word : "asd";
    cy.focused().type(`${char}{enter}`);
    i++;
  }

  cy.get("[data-id='overall-correct']").should("contain", expectedText);
  cy.get("[data-id='errors']").should("contain", expectedErrors);
});
//Game classic mode methods
Cypress.Commands.add("ClassicModeHalfErrorsMethod", ({ data, expectedText, type }) => {
  data.forEach((_, i: number) => {
    const cond = i % 2 === 0;
    const word = type === GuessGameTypeEnum.MEANING ? data[i].meaning?.split(";")[0] : data[i].romaji;
    const char = cond ? word : "asd";

    cy.focused().type(`${char}{enter}`);
  });

  cy.get("[data-id='button-endGame']").click();
  cy.get("[data-id='overall-correct']").should("contain", expectedText);
});
Cypress.Commands.add("ClassicModeRandomPosMethod", ({ data, expectedText, expectedErrors, type }) => {
  let i = 0;
  let tryTrues = 0;
  const positions = [2, 5, 7, 10];

  const attempt = (): void => {
    if (i === positions.length) {
      return;
    }
    const cond = positions[i] === 2 || positions[i] === 5;
    const pos = positions[i];
    const word = type === GuessGameTypeEnum.MEANING ? data[pos].meaning?.split(";")[0] : data[pos].romaji;
    const char = cond ? word : "asd";

    cy.get("body").then(($body) => {
      const hasInput = $body.find("input").length > 0;
      if (hasInput) {
        cy.get("input")
          .eq(tryTrues > 0 ? pos - tryTrues : pos)
          .type(`${char}{enter}`)
          .then(() => {
            i++;
            tryTrues++;
            attempt();
          });
      }
    });
  };

  attempt();

  cy.get("[data-id='button-endGame']").click();
  cy.get("[data-id='overall-correct']").should("contain", expectedText);
  cy.get("[data-id='errors']").should("contain", expectedErrors);
});
// Game No Errors methods
Cypress.Commands.add("NoErrorsModeValidErrorMethod", ({ data, expectedText, expectedErrors, type }) => {
  let i = 0;

  const attempt = (): void => {
    const cond = i % 2 === 0;
    const word = type === GuessGameTypeEnum.MEANING ? data[i].meaning?.split(";")[0] : data[i].romaji;
    const char = cond ? word : "asd";

    cy.get("body").then(($body) => {
      const hasInput = $body.find("input").length > 0;
      if (hasInput) {
        cy.focused()
          .type(`${char}{enter}`)
          .then(() => {
            i++;
            attempt();
          });
      }
    });
  };

  attempt();

  cy.get("[data-id='overall-correct']").should("contain", expectedText);
  cy.get("[data-id='errors']").should("contain", expectedErrors);
});
Cypress.Commands.add("NoErrorsModeRandomPosMethod", ({ data, expectedText, expectedErrors, type }) => {
  let i = 0;
  let tryTrues = 0;
  const positions = [2, 5, 7, 10];

  const attempt = (): void => {
    const cond = positions[i] === 2 || positions[i] === 5;
    const pos = positions[i];
    const word = type === GuessGameTypeEnum.MEANING ? data[pos].meaning?.split(";")[0] : data[pos].romaji;
    const char = cond ? word : "asd";

    cy.get("body").then(($body) => {
      const hasInput = $body.find("input").length > 0;
      if (hasInput) {
        cy.get("input")
          .eq(tryTrues > 0 ? pos - tryTrues : pos)
          .type(`${char}{enter}`)
          .then(() => {
            i++;
            tryTrues++;
            attempt();
          });
      }
    });
  };

  attempt();

  cy.get("[data-id='overall-correct']").should("contain", expectedText);
  cy.get("[data-id='errors']").should("contain", expectedErrors);
});
Cypress.Commands.add("TimeModeWait5sAndEndGame", ({ expectedText, expectedTime }) => {
  cy.wait(10000);
  cy.get("[data-id='overall-correct']").should("contain", expectedText);
  cy.get("[data-id='time']").should("contain", expectedTime);
});
