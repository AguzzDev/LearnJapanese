import { Menu } from "@/components/menus/Menu";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Games - LearnJapanese",
};

const Page = () => {
  return (
    <Menu
      title="Games"
      cols={1}
      items={[
        { name: "Kana Quiz", to: "games/kanaQuiz" },
        { name: "Guess Game", to: "games/guessGame" },
      ]}
    />
  );
};
export default Page;
