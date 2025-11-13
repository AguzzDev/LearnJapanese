"use client";
import { DefaultLayoutProps, GameFiltersEnum, KanaGameKanaTypeEnum, KanaGameTypeEnum } from "@/interfaces";
import { DefaultLayout } from "../../layouts/DefaultLayout";

const Default = () => {
  const menu: DefaultLayoutProps["menu"] = [
    {
      title: "Which syllabary do you want to practice?",
      items: [
        { mode: GameFiltersEnum.TYPE, title: "Practice Hiragana", value: KanaGameTypeEnum.HIRAGANA },
        { mode: GameFiltersEnum.TYPE, title: "Practice Katakana", value: KanaGameTypeEnum.KATAKANA },
        { mode: GameFiltersEnum.TYPE, title: "Practice All", value: KanaGameTypeEnum.ALL },
      ],
    },
    {
      title: "Which group do you want to practice?",
      items: [
        { mode: GameFiltersEnum.SUBTYPE, title: "All Main Kana", value: KanaGameKanaTypeEnum.MAIN },
        { mode: GameFiltersEnum.SUBTYPE, title: "All Dakuten Kana", value: KanaGameKanaTypeEnum.DAKUTEN },
        { mode: GameFiltersEnum.SUBTYPE, title: "All Combination Kana", value: KanaGameKanaTypeEnum.YOUON },
        { mode: GameFiltersEnum.SUBTYPE, title: "All Kana", value: KanaGameKanaTypeEnum.ALL },
      ],
    },
  ];

  return <DefaultLayout menu={menu} />;
};
export default Default;
