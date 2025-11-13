import { MenuProps, MenuItemProps } from "@/interfaces";
import { ButtonOne } from "../ui/button/ButtonOne";

export const Menu = (props: MenuProps) => {
  const { title, items, cols = 2, rows = 3, direction = "col" } = props;
  const finalItems: (MenuItemProps | null)[] = Array.isArray(items) ? items : [items];

  const totalSlots = cols * rows;
  if (finalItems.length < totalSlots) {
    const emptySlots = totalSlots - finalItems.length;
    for (let i = 0; i < emptySlots; i++) finalItems.push(null);
  }

  const Item = (props: MenuItemProps) => (
    <ButtonOne to={props.to} className={`${props.className} col-span-${props.colSize}`}>
      {props.name}
    </ButtonOne>
  );

  return (
    <div className="flex flex-col w-full h-full">
      <h2>{title}</h2>
      <div style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }} className={`grid grid-cols grid-rows-${rows} sm:grid-flow-${direction} gap-5 w-full h-full mt-3`}>
        {finalItems.map((values, key) => {
          if (!values) return <div key={key}></div>;

          return <Item key={key} {...values} />;
        })}
      </div>
    </div>
  );
};
