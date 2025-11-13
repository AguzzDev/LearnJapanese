import { Menu } from "@/components/menus/Menu";

export default function Page() {
  return (
    <>
      <h1 className="block sm:hidden mb-2">LearnJapanese</h1>
      <Menu
        title="Home"
        items={[
          { name: "Learn", to: "/learn" },
          { name: "Games", to: "/games" },
        ]}
      />
    </>
  );
}
