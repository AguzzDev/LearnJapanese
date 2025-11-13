"use client";
import { DefaultLayoutProps, GameFiltersEnum, GuessGameGuessType2Enum, JLPTTypeEnum, GuessGameTypeEnum } from "@/interfaces";
import { DefaultLayout } from "../../layouts/DefaultLayout";

const Default = () => {
  const menu: DefaultLayoutProps["menu"] = [
    {
      title: "Which game type do you want to practice?",
      items: [
        { mode: GameFiltersEnum.TYPE, title: GuessGameTypeEnum.FURIGANA, value: GuessGameTypeEnum.FURIGANA },
        { mode: GameFiltersEnum.TYPE, title: GuessGameTypeEnum.MEANING, value: GuessGameTypeEnum.MEANING },
      ],
    },
    {
      title: "Which vocabulary do you want to practice?",
      items: [
        { mode: GameFiltersEnum.SUBTYPE, title: JLPTTypeEnum.N5, value: JLPTTypeEnum.N5 },
        { mode: GameFiltersEnum.SUBTYPE, title: JLPTTypeEnum.N4, value: JLPTTypeEnum.N4 },
        { mode: GameFiltersEnum.SUBTYPE, title: JLPTTypeEnum.N3, value: JLPTTypeEnum.N3 },
        { mode: GameFiltersEnum.SUBTYPE, title: JLPTTypeEnum.N2, value: JLPTTypeEnum.N2 },
        { mode: GameFiltersEnum.SUBTYPE, title: JLPTTypeEnum.N1, value: JLPTTypeEnum.N1 },
      ],
    },
    {
      title: "Which group do you want to practice?",
      items: [
        { mode: GameFiltersEnum.SUBTYPE2, title: "Practice Nouns", value: GuessGameGuessType2Enum.NOUNS },
        { mode: GameFiltersEnum.SUBTYPE2, title: "Practice Verbs", value: GuessGameGuessType2Enum.VERBS },
      ],
    },
  ];

  return <DefaultLayout menu={menu} />;
};
export default Default;
