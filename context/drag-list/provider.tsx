import { SharedValue } from "react-native-reanimated";
import { DragListContext } from ".";

export default function DragListProvider({
  children,
  offsetY,
  draggedOverCount,
  dragIndex,
}: {
  children: React.ReactNode;
  offsetY: SharedValue<number>;
  draggedOverCount: SharedValue<number>;
  dragIndex: SharedValue<number>;
}) {
  return (
    <DragListContext.Provider value={{ dragIndex, draggedOverCount, offsetY }}>
      {children}
    </DragListContext.Provider>
  );
}
