"use client";
import { ShowContextInterface, ShowTypeProps } from "@/interfaces";
import { createContext, useContext, useState } from "react";

export const ShowContext = createContext<ShowContextInterface | null>(null);

export const ShowProvider = ({ children }: { children: React.ReactNode }) => {
  const [active, setActive] = useState<ShowContextInterface["active"]>({ boolean: true });

  const updateShow = (type: ShowTypeProps) => {
    setActive((prev) => ({ boolean: !prev.boolean, type: type === "removeAll" ? undefined : type }));
  };

  return <ShowContext.Provider value={{ active, updateShow }}>{children}</ShowContext.Provider>;
};

export const useShow = () => {
  const context = useContext(ShowContext);

  if (!context) throw new Error("useShowContext must be used within ShowProvider");
  return context;
};
