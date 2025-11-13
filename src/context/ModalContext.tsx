"use client";
import { ModalContextInterface } from "@/interfaces";
import { createContext, useContext, useState } from "react";

export const ModalContext = createContext<ModalContextInterface | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalActive, setModalActive] = useState<ModalContextInterface["modalActive"]>(null);

  const openModal = (id: ModalContextInterface["modalActive"]) => {
    setModalActive(id);
  };

  const closeModal = () => setModalActive(null);

  return <ModalContext.Provider value={{ modalActive, openModal, closeModal }}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) throw new Error("useModalContext must be used within ModalProvider");
  return context;
};
