"use client";
import { ThemeContextInterface, ThemeTypeProps } from "@/interfaces";
import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext<ThemeContextInterface | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const themes: ThemeTypeProps[] = [
    "lightBlue",
    "lightEmerald",
    "lightCrimson",
    "lightOlive",
    "lightSunset",
    "lightPurple",
    "darkBlue",
    "darkCrimson",
    "darkEmerald",
    "darkOlive",
    "darkSunset",
    "darkPurple",
  ];
  const [theme, setTheme] = useState<ThemeContextInterface["theme"]>("darkPurple");

  const updateTheme = (theme: ThemeTypeProps) => {
    localStorage.removeItem("theme");
    localStorage.setItem("theme", theme);
    setTheme(theme);
  };

  useEffect(() => {
    document.documentElement.classList.remove(...themes);
    document.documentElement.classList.add(theme as ThemeTypeProps);
  }, [theme]);

  useEffect(() => {
    const getTheme = localStorage.getItem("theme");
    if (getTheme && themes.includes(getTheme as ThemeTypeProps)) {
      setTheme(getTheme as ThemeTypeProps);
    }
  }, []);

  return <ThemeContext.Provider value={{ theme, themes, updateTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) throw new Error("useThemeContext must be used within ThemeProvider");
  return context;
};
