import { DragAndOrderContext } from "./context";

export function DragAndOrderProvider<Item>({
  items,
  setItems,
  renderItem,
}: {
  items: Item[];
  setItems: (items: Item[]) => void;
  renderItem: (item: Item, isActive: boolean) => React.ReactNode;
}) {
  return (
    <DragAndOrderContext.Provider
      value={{ items, setItems }}
    ></DragAndOrderContext.Provider>
  );
}
