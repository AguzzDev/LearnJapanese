import fs from "fs";
import path from "path";
import { redirect } from "next/navigation";
import { ButtonLesson } from "@/components/ui/button/ButtonLesson";
import LessonLayout from "@/components/LessonLayout";

export default async function Page({ params }: { params: Promise<{ chapter: string; chapterType: string; slug: string }> }) {
  const { chapter, chapterType, slug } = await params;
  if (!slug) return redirect(`/learn/${chapter}`);
  const number = parseInt(slug.split("?")[0]);

  let Component = null;
  try {
    const { default: Lesson } = await import(`../../../../../lib/mdx/learn/${chapter}/${chapterType}/${slug}.mdx`);
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
