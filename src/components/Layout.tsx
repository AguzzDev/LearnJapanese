"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonOne } from "./ui/button/ButtonOne";
import { IconMd, IconSm } from "./ui/icon/Icon";
import { BookOpenIcon, ChevronLeftIcon, Cog6ToothIcon, HomeIcon, PuzzlePieceIcon } from "@heroicons/react/24/outline";
import { useModal } from "@/context/ModalContext";
import { SettingsModal } from "./modal/SettingsModal";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const pathSplit = path.split("/");
  const showButton = path !== "/";
  const parentPath = pathSplit.length === 2 ? "/" : pathSplit.slice(0, -1).join("/");

  const { openModal } = useModal();

  const NavItems = () => (
    <div className="flex flex-row sm:flex-col sm:space-y-5 bg-secondary rounded-md space-x-3 p-3 sm:p-0">
      <ButtonOne id="home" variant="nav" to="/">
        <div className="sm:w-24 flex flex-col sm:flex-row sm:space-x-2 items-center">
          <IconSm variant="nav" Icon={HomeIcon} />
          <span className="text-foregroundNav">Home</span>
        </div>
      </ButtonOne>
      <ButtonOne id="learn" variant="nav" to="/learn">
        <div className="sm:w-24 flex flex-col sm:flex-row sm:space-x-2 items-center">
          <IconSm variant="nav" Icon={BookOpenIcon} />
          <span className="text-foregroundNav">Learn</span>
        </div>
      </ButtonOne>
      <ButtonOne id="games" variant="nav" to="/games">
        <div className="sm:w-24 flex flex-col sm:flex-row sm:space-x-2 items-center">
          <IconSm variant="nav" Icon={PuzzlePieceIcon} />
          <span className="text-foregroundNav">Games</span>
        </div>
      </ButtonOne>
      <ButtonOne variant="nav" onClick={() => openModal("settings")}>
        <div className="sm:w-24 flex flex-col sm:flex-row sm:space-x-2 items-center">
          <IconSm variant="nav" Icon={Cog6ToothIcon} />
          <span className="text-foregroundNav">Settings</span>
        </div>
      </ButtonOne>
    </div>
  );

  return (
    <>
      <SettingsModal />

      <main className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 justify-center h-screen overflow-hidden bg-background px-5 py-5 sm:pl-4 sm:pr-1">
        <div className="hidden sm:flex flex-col space-y-5 px-10 py-5 bg-secondary rounded-md">
          {showButton && (
            <Link href={parentPath} className="w-max">
              <ButtonOne variant="nav" className="flex items-center space-x-1">
                <IconMd variant="nav" Icon={ChevronLeftIcon} />
                <span className="text-foregroundNav">Back</span>
              </ButtonOne>
            </Link>
          )}
          <>
            <h1 className="text-white">LearnJapanese</h1>
            <NavItems />
          </>
        </div>

        <div className="flex flex-col justify-between flex-1 overflow-hidden sm:pr-3">{children}</div>

        <div className="block sm:hidden">
          <NavItems />
        </div>
      </main>
    </>
  );
};
export default Layout;
