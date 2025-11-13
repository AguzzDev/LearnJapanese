import { useTheme } from "@/context/ThemeContext";
import { ModalLayout } from "./ModalLayout";
import { ButtonOne } from "../ui/button/ButtonOne";

export const SettingsModal = () => {
  const { theme, themes, updateTheme } = useTheme();

  const getText = (str: string) => {
    const pos = str[0] === "l" ? 5 : 4;
    const text = `${str[0].toUpperCase()}${str.slice(1, pos)} ${str.slice(pos)}`;
    return text;
  };

  return (
    <ModalLayout id="settings" title="Settings">
      <h4 className="text-foregroundNav">Theme</h4>
      <div className="grid grid-cols-3 gap-5 mt-2">
        {themes.map((data, key) => (
          <ButtonOne activeValue={theme === data} variant="nav" key={key} onClick={() => updateTheme(data)}>
            {getText(data)}
          </ButtonOne>
        ))}
      </div>
    </ModalLayout>
  );
};
