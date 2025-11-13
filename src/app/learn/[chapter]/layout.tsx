import { Children } from "@/interfaces";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn - LearnJapanese",
};

export default function RootLayout({ children }: Children) {
    return children
}