import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { List } from "./src/components/ui/mdx/List";
import { Table } from "@/components/ui/mdx/table/Table";
import { DialogJSXProps, KanaJSXProps, ListJSXProps, TableJSXProps } from "@/interfaces";
import { IconLg } from "@/components/ui/icon/Icon";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const components = {
  Video: (props) => (
    <section className="w-full sm:w-3/4 py-2 my-5">
      <iframe
        className="h-[40vh] sm:h-[60vh] w-full"
        src={`https://www.youtube.com/embed/${props.id}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      {props?.author ? components.LinkTo({ to: `https://www.youtube.com/watch?v=${props.id}`, name: `Credits: ${props.author}` }) : null}
    </section>
  ),
  Container: (props) => <div className="my-10">{...props.children}</div>,
  h1: (props) => <h1 className="pb-6 text-center" {...props} />,
  h2: (props) => <h2 className="py-3" {...props} />,
  h3: (props) => <h3 className="py-1" {...props} />,
  p: (props) => <p className="py-1" {...props} />,
  Kana: (props: KanaJSXProps) => (
    <ruby>
      {props.kana}
      <rt>{props.romaji}</rt>
    </ruby>
  ),
  LinkTo: ({ to, name }) => (
    <Link className="py-1 font-bold text-primary/80 hover:text-primary" href={to} target="_blank">
      {name}
    </Link>
  ),
  List: (props: ListJSXProps) => (
    <div className="flex flex-col">
      <List {...props} />
    </div>
  ),
  br: () => <br />,
  hr: () => <br />,
  ul: (props) => <ul className="list-disc" {...props} />,
  Table: (props: TableJSXProps) => <Table {...props} />,
  Dialog: (props: DialogJSXProps) => (
    <div className="flex flex-col gap-y-10 sm:w-3/4">
      <h3>Dialogues</h3>

      {props.items.map((dialog, key) => {
        const [furigana, romaji, meaning] = dialog.items[0];
        const [furigana2, romaji2, meaning2] = dialog.items[1];

        return (
          <div key={key} className="grid grid-cols-5">
            <div className="col-span-2 bg-secondary p-5 rounded-md">
              <p>{furigana}</p>
              <p>{romaji}</p>
              <p>{meaning}</p>
            </div>

            <div className="flex items-center justify-center">
              <IconLg className={`${dialog.direction === "left" && "rotate-180"}`} Icon={ChevronRightIcon} />
            </div>

            <div className="col-span-2 bg-secondary p-5 rounded-md">
              <p>{furigana2}</p>
              <p>{romaji2}</p>
              <p>{meaning2}</p>
            </div>
          </div>
        );
      })}
    </div>
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
