import { useShow } from "@/context/ShowContext";
import { Dispatch, SetStateAction } from "react";

export const CheckboxInput = ({ show, setShow, global = false }: { global?: boolean; show: boolean; setShow?: Dispatch<SetStateAction<boolean>> }) => {
  const { updateShow } = useShow();

  const handleChange = () => {
    if (setShow) {
      setShow(!show);
    }
    if (!global) return;
    updateShow("removeAll");
  };

  return (
    <label className="flex justify-center items-center m-auto w-5 h-5 bg-gray-100 border rounded cursor-pointer">
      <input type="checkbox" className="hidden" onChange={handleChange} />
      <span className="checkmark w-full h-full flex justify-center items-center text-accent">{!show ? "✔" : ""}</span>
    </label>
  );
};
