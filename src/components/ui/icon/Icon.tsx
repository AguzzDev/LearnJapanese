import { IconProps } from "@/interfaces";

export const IconSm = ({ Icon, variant, className }: IconProps) => {
  return <Icon className={`w-5 h-5 ${variant === "nav" ? "stroke-foregroundNav" : "stroke-foreground"} ${className}`} />;
};
export const IconMd = ({ Icon, variant, className }: IconProps) => {
  return <Icon className={`w-7 h-7 ${variant === "nav" ? "stroke-foregroundNav" : "stroke-foreground"} ${className}`} />;
};
export const IconLg = ({ Icon, variant, className }: IconProps) => {
  return <Icon className={`w-10 h-10 ${variant === "nav" ? "stroke-foregroundNav" : "stroke-foreground"} ${className}`} />;
};
