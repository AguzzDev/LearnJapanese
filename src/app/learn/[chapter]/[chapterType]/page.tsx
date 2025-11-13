import fs from "fs";
import path from "path";
import { redirect } from "next/navigation";
import { ButtonLesson } from "@/components/ui/button/ButtonLesson";
import LessonLayout from "@/components/LessonLayout";

export default async function Page({ params, searchParams }: { params: Promise<{ chapter: string; chapterType: string }>; searchParams: { page: string } }) {
  const { chapter, chapterType } = await params;
  const { page: slug } = await searchParams;

  if (!slug) return redirect(`/learn/${chapter}`);
  const number = parseInt(slug.split("?")[0]);

  let Component = null;
  try {
    const { default: Lesson } = await import(`@/lib/mdx/learn/${chapter}/${chapterType}/${slug}.mdx`);
    Component = Lesson;
  } catch (error) {
    return redirect(`/learn/${chapter}`);
  }

  const learnDir = path.resolve(`src/lib/mdx/learn/${chapter}/${chapterType}`);
  const files = fs.readdirSync(learnDir).length;

  return (
    <>
      <LessonLayout>
        <Component />
      </LessonLayout>
      <ButtonLesson number={number} quantity={files} />
    </>
  );
}

export function generateStaticParams() {
  const learnRoot = path.resolve("src/lib/mdx/learn");
  const params: { chapter: string; slug: string }[] = [];

  const chapters = fs.readdirSync(learnRoot).filter((d) => fs.statSync(path.join(learnRoot, d)).isDirectory());

  for (const chapter of chapters) {
    const chapterPath = path.join(learnRoot, chapter);
    const chapterTypes = fs.readdirSync(chapterPath).filter((d) => fs.statSync(path.join(chapterPath, d)).isDirectory());

    for (const chapterType of chapterTypes) {
      const files = fs.readdirSync(path.join(chapterPath, chapterType));
      for (const file of files) {
        if (file.endsWith(".mdx")) {
          const slug = path.basename(file, ".mdx");
          params.push({ chapter, slug });
        }
      }
    }
  }
  return params;
}

export const dynamicParams = false;
