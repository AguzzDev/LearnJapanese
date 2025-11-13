import { GuessGameRepository } from "@/services/game/games/GuessGameRepository";
import { KanaGameRepository } from "@/services/game/games/KanaGameRepository";
import { MinigameGuessGameRepository } from "@/services/game/minigames/MinigameGuessGameRepository";
import { MinigameGuessNumbersRepository } from "@/services/game/minigames/MinigameGuessNumbersRepository";
import { MinigameMatchPairRepository } from "@/services/game/minigames/MinigameMatchPairRepository";
import { NextPage } from "next";
import { Dispatch, FormEvent, ForwardRefExoticComponent, RefAttributes, SetStateAction, SVGProps } from "react";

declare global {
  interface Window {
    CYPRESS_TEST?: boolean;
    game: KanaGameRepository | GuessGameRepository;
  }
}
export interface Children {
  children: React.ReactNode;
}
export interface IconProps {
  Icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & { title?: string | undefined; titleId?: string | undefined } & RefAttributes<SVGSVGElement>>;
  className?: string;
  variant?: "nav";
}
export type Directions = "row" | "col";
export interface MenuItemProps {
  name: string;
  to?: string;
  className?: string;
  colSize?: number;
}
export interface MenuProps {
  title?: string;
  cols?: number;
  rows?: number;
  direction?: Directions;
  items: MenuItemProps[] | MenuItemProps;
}
export interface ButtonMenuProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  mode: GameFiltersEnum;
  title?: string;
  value?: AllSelectModeInterface;
}
export interface ButtonOneProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id?: string;
  to?: string;
  activeValue?: boolean;
  variant?: "nav" | "default";
}
export interface MinigamesJSXProps {
  minigames: {
    [GameTypeEnum.Guess]: {
      meaning?: true;
      furigana?: true;
    };
    [GameTypeEnum.MatchPair]: boolean;
    [GameTypeEnum.GuessNumbers]: {
      numbers?: true;
      text?: true;
    };
  };
}
export interface KanaJSXProps {
  kana: string;
  romaji: string;
}
export interface ListJSXProps extends MinigamesJSXProps {
  includeCheckbox: boolean;
  highlightFirstLetter?: string;
  className?: string;
  cols?: string;
  title?: string;
  items: {
    title: string;
    description?: string;
    sound: boolean;
  }[];
}
export interface TableJSXProps extends MinigamesJSXProps {
  includeCheckbox: boolean;
  externalData?: string;
  chunks?: string;
  start?: string;
  limit?: string;
  data?: WordInterface[];
  headers?: string[];
}
export interface DialogJSXProps {
  items: {
    direction: "right" | "left";
    items: string[][];
  }[];
}
//interfaces
export type WordStringStringInterface = [string, string];
export type WordSortedInterface = [string, string];
export interface WordInterface {
  kanji?: string;
  furigana?: string;
  romaji?: string;
  meaning?: string;
}
export interface ErrorListInterface extends WordInterface {
  you: string;
}
export type AnswerType = Map<number, boolean>;
export type InputsType = { el: HTMLInputElement | null; status: boolean }[];
export type AllSelectModeInterface = KanaGameKanaTypeEnum | GameModeEnum | GuessGameTypeEnum | KanaGameTypeEnum | JLPTTypeEnum | GuessGameGuessType2Enum;
export type SelectModeInterface = {
  mode: GameModeEnum | null;
  type: GuessGameTypeEnum | KanaGameTypeEnum | null;
  subType: JLPTTypeEnum | KanaGameKanaTypeEnum | null;
  subType2: GuessGameGuessType2Enum | null;
};

export type ThemeTypeProps =
  | "lightBlue"
  | "lightEmerald"
  | "lightCrimson"
  | "lightOlive"
  | "lightSunset"
  | "lightPurple"
  | "darkBlue"
  | "darkEmerald"
  | "darkCrimson"
  | "darkOlive"
  | "darkSunset"
  | "darkPurple";
export type ModalTypeProps = "settings" | null;
export interface ThemeContextInterface {
  theme: ThemeTypeProps;
  themes: ThemeTypeProps[];
  updateTheme: (theme: ThemeTypeProps) => void;
}
export type ShowTypeProps = "furigana" | "meaning" | "all" | "removeAll";
export interface ShowContextInterface {
  active: {
    type?: ShowTypeProps;
    boolean: boolean;
  };
  updateShow: (type: ShowTypeProps) => void;
}
export interface ModalContextInterface {
  modalActive: ModalTypeProps;
  openModal: (id: ModalContextInterface["modalActive"]) => void;
  closeModal: () => void;
}
export interface MinigameContextInterface {
  data: WordInterface | WordSortedInterface[][];
  game: MinigameMatchPairRepository | MinigameGuessGameRepository | MinigameGuessNumbersRepository | null;
  input: string | [string, string] | null;
  startGame: (
    args?:
      | {
          words?: WordInterface[] | WordSortedInterface[] | undefined;
          type: GameTypeEnum;
          mode?: GuessGameTypeEnum | GuessNumbersGameTypeEnum;
        }
      | undefined
  ) => void;
  handleChange: (value: string, type?: "left" | "right") => void;
  handleRestart: () => void;
  handleClick: () => void;
  handleSkip: () => void;
  handleSubmit: (e?: FormEvent<HTMLFormElement>) => Promise<void>;
}
export interface GameContextInterface {
  error: string | null;
  state: GameStatesEnum;
  currentGame: GameTypeEnum | null;
  game: GameTypeMap[GameTypeEnum] | null;
  input: string;
  answers: AnswerType;
  inputs: InputsType;
  selectMode: SelectModeInterface;
  isKanaGame: boolean;
  isGuessGame: boolean;
  updateCurrent: (i: number) => void;
  updateInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateSelectMode: (args: UpdateSelectModeProps) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  startGame: (args?: SelectModeInterface) => void;
  goHome: () => void;
  endGame: () => void;
  updateCurrentGame: (key: GameTypeEnum) => void;
  updateError: (error: string) => Promise<void>;
}
export interface GuessGameArgs extends GameBaseClientArgs<GuessGameTypeEnum, JLPTTypeEnum, GuessGameGuessType2Enum> {
  words: WordInterface[];
}
export interface MinigameArgs<TWords, TMode> {
  onUpdate: () => void;
  mode?: TMode;
  words: TWords;
}
export interface MinigameGuessGameInterface<TWord, TMode> {
  current: number;
  mode?: TMode | undefined;
  type?: JLPTTypeEnum;
  restart: boolean;
  correct: boolean;
  incorrect: boolean;
  finish: boolean;
  word: TWord | null;
  disabled: string[];
}
export interface GameBaseInterface {
  getData: () => WordInterface[];
  getInfo: () => string;
}
export interface GameBaseMethodsInterface {
  checkAnswer: (args: { input: string; response?: boolean }) => boolean;
}
//props
export interface MainLayoutProps {
  id: GameTypeEnum;
  title: string;
}
export interface DefaultLayoutProps {
  menu: {
    title: string;
    items: { mode: GameFiltersEnum; title: string; value: AllSelectModeInterface }[];
  }[];
}
export type PageStatesProps = NextPage<{
  updateState: Dispatch<SetStateAction<GameStatesEnum>>;
}>;
export interface StartGameProps {
  mode?: KanaGameTypeEnum;
  type?: KanaGameTypeEnum;
  kanaType?: KanaGameKanaTypeEnum;
}
export type UpdateSelectModeProps = {
  mode: GameFiltersEnum;
  selectModeValue: AllSelectModeInterface;
  value: string;
};
export type GameTypeMap = {
  [GameTypeEnum.KanaQuiz]: KanaGameRepository;
  [GameTypeEnum.Guess]: GuessGameRepository;
  [GameTypeEnum.GuessNumbers]: null;
  [GameTypeEnum.MatchPair]: null;
};
export enum GameTypeEnum {
  KanaQuiz = "KanaQuiz",
  Guess = "Guess",
  MatchPair = "MatchPair",
  GuessNumbers = "GuessNumbers",
}
export enum GameStatesEnum {
  DEFAULT = "DEFAULT",
  GAME = "GAME",
  RESULTS = "RESULTS",
}
export enum GameSumTypeEnum {
  VALID = "VALID",
  ERROR = "ERROR",
}
export enum GameFiltersEnum {
  MODE = "mode",
  START_BUTTON = "startButton",
  TYPE = "type",
  SUBTYPE = "subType",
  SUBTYPE2 = "subType2",
}

//Games
export interface GameBaseClientArgs<TType, TSub, TSub2 = null> {
  mode: GameModeEnum;
  type: TType;
  subType: TSub;
  subType2?: TSub2;
  isTest: boolean;
}
export interface GameBaseArgs<TType, TSub, TSub2> {
  data: WordInterface[];
  options: { mode: GameModeEnum; type: TType; subType: TSub; subType2?: TSub2 };
  isTest: boolean;
}
export enum GameModeEnum {
  CLASSIC = "Classic",
  NO_ERRORS = "No errors",
  TIMED = "With time (5min)",
  NO_ERRORS_AND_TIMED = "No errors with time (5min)",
}
//KanaGame
export enum KanaGameTypeEnum {
  ALL = "All syllabaries",
  KATAKANA = "Katakana",
  HIRAGANA = "Hiragana",
}
export enum KanaGameKanaTypeEnum {
  ALL = "All groups",
  MAIN = "Main",
  DAKUTEN = "Dakuten",
  YOUON = "Combinations",
}
//GuessGame
export enum GuessGameTypeEnum {
  MEANING = "Meaning",
  FURIGANA = "Furigana",
  ROMAJI = "Romaji",
  KANJI = "Kanji",
}
export enum JLPTTypeEnum {
  N5 = "JLPT N5",
  N4 = "JLPT N4",
  N3 = "JLPT N3",
  N2 = "JLPT N2",
  N1 = "JLPT N1",
}
export enum GuessGameGuessType2Enum {
  VERBS = "Verbs",
  NOUNS = "Nouns",
}
//GuessNumbersGame
export enum GuessNumbersGameTypeEnum {
  NUMBER = "Number",
  TEXT = "Text",
}
