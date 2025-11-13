"use client";
import { ButtonOneProps } from "@/interfaces";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const ButtonOne = ({ children, activeValue, variant = "default", ...props }: ButtonOneProps) => {
  const path = usePathname();
  const pathName = path === "/" ? "home" : path.split("/")[1];
  const isActive = pathName === props!.id || activeValue;
  const bgColor = variant === "default" ? "bg-button" : "bg-buttonNav";
  const bgHoverColor = variant === "default" ? "hover:bg-buttonActive" : "hover:bg-buttonNavActive";
  const bgActiveColor = variant === "default" ? "bg-buttonActive" : "bg-buttonNavActive";
  const textColor = variant === "default" ? "text-buttonText" : "text-buttonNavText";
  const styles = `${props.className} ${isActive ? bgActiveColor : bgColor} ${bgHoverColor} rounded-sm px-0 sm:px-5 py-2 w-full cursor-pointer flex font-bold items-center justify-center ${textColor}`;

  return (
    <>
      {props.to ? (
        <Link href={props.to} className={styles}>
          <span className={`${textColor} font-bold`}>{children}</span>
        </Link>
      ) : (
        <button {...props} className={styles}>
          {children}
        </button>
      )}
    </>
  );
};
