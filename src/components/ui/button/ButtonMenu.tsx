import { useGame } from "@/context/GameContext";
import { GameFiltersEnum, ButtonMenuProps } from "@/interfaces";
import { ButtonOne } from "./ButtonOne";

export const ButtonMenu = ({ children, mode, value, onClick, ...props }: ButtonMenuProps) => {
  const { selectMode, updateSelectMode } = useGame();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
    if (mode === GameFiltersEnum.START_BUTTON) return;
    updateSelectMode({ mode, value: value!, selectModeValue: value! });
  };

  const coincidence = selectMode?.mode === value || selectMode?.type === value || selectMode?.subType == value || selectMode?.subType2 == value;

  return (
    <ButtonOne {...props} onClick={handleClick} activeValue={coincidence}>
      {children}
    </ButtonOne>
  );
};
