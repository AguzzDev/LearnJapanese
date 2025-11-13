"use client";
import { usePathname } from "next/navigation";
import { ButtonOne } from "./ButtonOne";

export const ButtonLesson = ({ number, quantity }: { number: number; quantity: number }) => {
  const path = usePathname();
  const parentPath = path.split("/").slice(0, -2).join();
  const showNextButton = number < quantity;
  const showPrevButton = number > 1;
  const showBackToHomeButton = number === quantity;

  const getNumber = (type: string) => {
    return type === "inc" ? number + 1 : number - 1;
  };

  return (
    <div className="flex flex-1 w-full justify-end space-x-5 rounded-md bg-secondary p-2">
      {showPrevButton && (
        <ButtonOne variant="nav" to={`${getNumber("dec")}`}>
          Back
        </ButtonOne>
      )}
      {showNextButton && (
        <ButtonOne variant="nav" to={`${getNumber("inc")}`}>
          Next
        </ButtonOne>
      )}
      {showBackToHomeButton && (
        <ButtonOne variant="nav" to={parentPath}>
          Back to home
        </ButtonOne>
      )}
    </div>
  );
};
