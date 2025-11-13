"use client";
import { GameTypeEnum } from "@/interfaces";
import { MainLayout } from "../layouts/MainLayout";

export const KanaQuizGame = () => {
  return <MainLayout id={GameTypeEnum.KanaQuiz} title="KanaQuiz" />;
};
