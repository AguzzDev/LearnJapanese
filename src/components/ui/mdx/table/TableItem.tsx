"use client";
import { useState } from "react";
import { CheckboxInput } from "../../input/CheckboxInput";
import { ShowTypeProps, WordInterface } from "@/interfaces";

const TableItem = (props: { data: WordInterface | string[]; includeCheckbox: boolean; hiddenType: ShowTypeProps | undefined; showMeanings: boolean }) => {
  const [show, setShow] = useState(true);
  const hiddenMeaning = !props.hiddenType || props.hiddenType === "meaning";
  const hiddenFurigana = !props.hiddenType ? props.showMeanings && !!props.hiddenType : !props.hiddenType || props.hiddenType == "furigana";
  const hiddenRomaji = props.hiddenType === "furigana";
  const hiddenValues = !show || !props.showMeanings;
  const styles = "border px-2 py-1";

  return (
    <tr>
      {props.includeCheckbox && (
        <td className="border px-2 py-1 text-center">
          <CheckboxInput show={show} setShow={setShow} />
        </td>
      )}

      {Array.isArray(props.data) ? (
        <>
          <td className={styles}>{props.data[0]}</td>
          <td className={`${hiddenValues && hiddenFurigana ? "opacity-0" : "opacity-100"} ${styles}`}>{props.data[1]}</td>
          <td className={`${hiddenValues && hiddenRomaji ? "opacity-0" : "opacity-100"} ${styles}`}>{props.data[2]}</td>
        </>
      ) : (
        <>
          <td className={styles}>{props.data.kanji}</td>
          <td className={`${hiddenValues && hiddenFurigana ? "opacity-0" : "opacity-100"} ${styles}`}>{props.data.furigana}</td>
          <td className={`${hiddenValues && hiddenRomaji ? "opacity-0" : "opacity-100"} ${styles}`}>{props.data.romaji}</td>
          <td className={`${hiddenValues && hiddenMeaning ? "opacity-0" : "opacity-100"} ${styles}`}>{props.data.meaning}</td>
        </>
      )}
    </tr>
  );
};
export default TableItem;
