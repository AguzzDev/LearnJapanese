import { Menu } from "@/components/menus/Menu";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn - LearnJapanese",
};

export default async function Page() {
  return (
    <Menu
      title="Courses"
      cols={2}
      items={[
        { name: "Hiragana-Katakana", to: "learn/hiragana-katakana" },
        { name: "JLPT N5", to: "learn/jlpt-n5" },
        // { name: "JLPT N4", to: "learn/jlpt-n4" },
        // { name: "JLPT N3", to: "learn/jlpt-n3" },
        // { name: "JLPT N2", to: "learn/jlpt-n2" },
        // { name: "JLPT N1", to: "learn/jlpt-n1" },
      ]}
    />
  );
}
