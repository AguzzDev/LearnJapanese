import { KanaGameTypeEnum, KanaGameKanaTypeEnum, GameBaseClientArgs } from "@/interfaces";
import {
  hiraganaMainKanaData,
  hiraganaDakutenKanaData,
  hiraganaYouonKanaData,
  katakanaMainKanaData,
  katakanaDakutenKanaData,
  katakanaYouonKanaData,
  allHiraganaData,
  allKatakanaData,
  allKanasData,
} from "@/lib/data";
import { GameBaseRepository } from "./GameBaseRepository";

class GameModeSylAndGroupFactory {
  static create(type: KanaGameTypeEnum, subType: KanaGameKanaTypeEnum) {
    switch (type) {
      case KanaGameTypeEnum.HIRAGANA:
        if (subType === KanaGameKanaTypeEnum.MAIN) {
          return hiraganaMainKanaData;
        } else if (subType === KanaGameKanaTypeEnum.DAKUTEN) {
          return hiraganaDakutenKanaData;
        } else if (subType === KanaGameKanaTypeEnum.YOUON) {
          return hiraganaYouonKanaData;
        } else {
          return allHiraganaData;
        }
      case KanaGameTypeEnum.KATAKANA:
        if (subType === KanaGameKanaTypeEnum.MAIN) {
          return katakanaMainKanaData;
        } else if (subType === KanaGameKanaTypeEnum.DAKUTEN) {
          return katakanaDakutenKanaData;
        } else if (subType === KanaGameKanaTypeEnum.YOUON) {
          return katakanaYouonKanaData;
        } else {
          return allKatakanaData;
        }
      case KanaGameTypeEnum.ALL:
        if (subType === KanaGameKanaTypeEnum.MAIN) {
          return [...hiraganaMainKanaData, ...katakanaMainKanaData];
        } else if (subType === KanaGameKanaTypeEnum.DAKUTEN) {
          return [...hiraganaDakutenKanaData, ...katakanaDakutenKanaData];
        } else if (subType === KanaGameKanaTypeEnum.YOUON) {
          return [...hiraganaYouonKanaData, ...katakanaYouonKanaData];
        } else {
          return allKanasData;
        }
      default:
        return [];
    }
  }
}

export class KanaGameRepository extends GameBaseRepository<KanaGameTypeEnum, KanaGameKanaTypeEnum> {
  constructor({ isTest = false, ...options }: GameBaseClientArgs<KanaGameTypeEnum, KanaGameKanaTypeEnum>) {
    const raw = GameModeSylAndGroupFactory.create(options.type, options.subType);
    super({ data: raw, options, isTest });
  }

  checkAnswer({ input }: { input: string; response?: boolean }): boolean {
    const quiz = this.data[this.current];
    const r = quiz.romaji == input.toLowerCase();

    return super.checkAnswer({ input, response: r }) as boolean;
  }
}
