"use client";
import { ListJSXProps, WordSortedInterface } from "@/interfaces";
import { Minigames } from "./Minigames";
import { CheckboxInput } from "../input/CheckboxInput";
import { withTable } from "@/hoc/withTable";
import { useShow } from "@/context/ShowContext";

const ListComponent = ({ includeCheckbox = false, ...props }: ListJSXProps) => {
  const { active } = useShow();

  const parseText = (text: string) => {
    return props?.highlightFirstLetter == "true" ? (
      <h4>
        <span className="text-2xl pr-1">{text.split(" ")[0]}</span>
        {text.split(" ").slice(1)}
      </h4>
    ) : (
      <h4>{text}</h4>
    );
  };

  const words: WordSortedInterface[] = props.items
    .filter((data) => data.description)
    .map((data) => {
      const word = data.description!.split(" ").slice(1).join("").replace(/[()]/g, "");

      return [data.title, word];
    });

  return (
    <>
      {includeCheckbox && (
        <div className="w-max">
          <label htmlFor="">Show?</label>
          <CheckboxInput key={props.title} global={true} show={!active.boolean} />
        </div>
      )}

      <div style={{ gridTemplateColumns: `repeat(${props.cols}, minmax(0, 1fr))` }} className={`${props.cols ? "grid" : "flex flex-wrap space-x-5"} ${props.className} gap-5 py-5`}>
        {props.items.map((d, key) => (
          <div key={key} className={`${active.boolean ? "opacity-100" : "opacity-0"} text-center`}>
            {parseText(d?.title)}
            <p>{d?.description}</p>
          </div>
        ))}
      </div>

      <Minigames minigames={props.minigames} words={words} />
    </>
  );
};
export const List = withTable(ListComponent);
