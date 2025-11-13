import { WordInterface } from "@/interfaces";

export async function getSheetData({ sheetName, start, limit }: { sheetName: string; start?: string | number; limit?: string | number }): Promise<WordInterface[]> {
  const sheetsDict = {
    "JLPT N5-Verbs": "0",
    "JLPT N5-Nouns": "1999041531",
    "JLPT N5-Adjectives": "136946592",
  } as const;
  const itemsFormated: WordInterface[] = [];
  const getSheet = sheetsDict[sheetName as keyof typeof sheetsDict];
  if (!getSheet) throw new Error("Select JLPT N5 Vocabulary");

  const baseUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL!;
  const startValue = start ? Number(start) : 0;
  const limitValue = limit ? Number(limit) : 100;

  const res = await fetch(`${baseUrl}?gid=${getSheet}&single=true&output=csv`);
  const text = await res.text();
  const rows = text
    .split("\n")
    .map((r) => r.split(","))
    .slice(startValue, startValue + limitValue);

  for (const [kanji, furigana, romaji, meaning] of rows) {
    itemsFormated.push({ kanji, furigana, romaji, meaning: meaning.replace(/[\r"]/g, "") });
  }
  return itemsFormated;
}
