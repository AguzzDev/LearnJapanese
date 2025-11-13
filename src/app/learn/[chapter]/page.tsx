"use client";
import { Menu } from "@/components/menus/Menu";
import { JLPTTypeEnum } from "@/interfaces";
import { usePathname } from "next/navigation";

export default function Page() {
  const path = usePathname();
  const isHiraganaPath = path.includes("hiragana");
  const title = JLPTTypeEnum[path.split("-")[1].toUpperCase()];

  return (
    <>
      {isHiraganaPath ? (
        <Menu title="Hiragana-Katakana Chapters" cols={1} items={[{ name: "Introduction", to: `${path}/introduction?page=1`, colSize: 2 }]} />
      ) : (
        <Menu
          title={`${title} Chapters`}
          cols={2}
          items={[
            { name: "Introduction", to: `${path}/introduction?page=1` },
            { name: "Grammar", to: `${path}/grammar?page=1` },
            { name: "Vocabulary", to: `${path}/vocabulary?page=1` },
            // { name: "Kanji", to: `${path}/kanji?page=1` },
            // { name: "Reading", to: `${path}/reading?page=1` },
            { name: "Conversation", to: `${path}/conversation?page=1` },
          ]}
        />
      )}
    </>
  );
}
