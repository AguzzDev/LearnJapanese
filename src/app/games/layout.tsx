import { GameProvider } from "@/context/GameContext";
import { Children } from "@/interfaces";

const Layout = ({ children }: Children) => {
  return <GameProvider>{children}</GameProvider>;
};
export default Layout;
