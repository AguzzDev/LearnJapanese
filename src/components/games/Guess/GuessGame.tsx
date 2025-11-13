"use client";
import { GameTypeEnum } from "@/interfaces";
import { MainLayout } from "../layouts/MainLayout";

export const GuessGame = () => {
  return <MainLayout id={GameTypeEnum.Guess} title="Guess Game" />;
};

