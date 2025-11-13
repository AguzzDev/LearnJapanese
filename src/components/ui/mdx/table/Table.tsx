"use client";
import { getSheetData } from "@/services/csv";
import { useEffect, useState } from "react";
import TableItem from "./TableItem";
import { WordInterface, TableJSXProps } from "@/interfaces";
import { Minigames } from "../Minigames";
import { withTable } from "@/hoc/withTable";
import { CheckboxInput } from "../../input/CheckboxInput";
import { useShow } from "@/context/ShowContext";

const TableComponent = ({ includeCheckbox = false, ...props }: TableJSXProps) => {
  const [showMeanings, setShowMeanings] = useState(true);
  const [data, setData] = useState<WordInterface[]>([]);
  const [tableData, setTableData] = useState<WordInterface[][]>([]);

  const { active } = useShow();

  const tableDataChunks = (size: number) => {
    const result = [];
    for (let i = 0; i < data.length; i += size) {
      result.push(data.slice(i, i + size));
    }

    setTableData(result);
  };

  useEffect(() => {
    if (includeCheckbox === undefined) return;

    setTableData([]);
    const fetchData = async () => {
      if (props.externalData) {
        const res = await getSheetData({ sheetName: props!.externalData, start: props?.start, limit: props?.limit });
        setData(res!);
      } else {
        setData(props!.data!);
      }
    };
    fetchData();
  }, [includeCheckbox]);

  useEffect(() => {
    if (!data) return;

    tableDataChunks(Number(props.chunks) || data.length);
  }, [data]);

  if (tableData.length === 0) return <p>Loading...</p>;
  return (
    <section className="sm:w-3/4">
      {tableData.map((array, key) => (
        <div key={key}>
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr>
                {includeCheckbox && (
                  <th className="border px-2 py-1 sm:text-lg">
                    <label htmlFor="">Show?</label>
                    <CheckboxInput global={true} show={!active.boolean ? active.boolean : showMeanings} setShow={setShowMeanings} />
                  </th>
                )}

                {props?.headers ? (
                  props.headers.map((header, key) => (
                    <th key={key} className="border px-2 py-1 sm:text-lg">
                      {header}
                    </th>
                  ))
                ) : (
                  <>
                    {data[0].kanji && <th className="border px-2 py-1 sm:text-lg">Kanji</th>}
                    <th className="border px-2 py-1 sm:text-lg">Furigana</th>
                    <th className="border px-2 py-1 sm:text-lg">Romaji</th>
                    <th className="border px-2 py-1 sm:text-lg">Meaning</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {array.map((props, key) => (
                <TableItem key={key} includeCheckbox={includeCheckbox} hiddenType={active.type} showMeanings={!active.boolean ? active.boolean : showMeanings} data={props} />
              ))}
            </tbody>
          </table>

          <Minigames i={key} minigames={props.minigames} words={array} arrayLength={tableData.length} />
        </div>
      ))}
    </section>
  );
};

export const Table = withTable(TableComponent);
