import { SharedValue } from "react-native-reanimated";
import { DragListContext } from ".";

export default function DragListProvider({
  children,
  offsetY,
  draggedOverCount,
  dragIndex,
  ignoredCount,
}: {
  children: React.ReactNode;
  offsetY: SharedValue<number>;
  draggedOverCount: SharedValue<number>;
  dragIndex: SharedValue<number>;
  ignoredCount: SharedValue<number>;
}) {
  return (
    <DragListContext.Provider
      value={{ dragIndex, draggedOverCount, offsetY, ignoredCount }}
    >
      {children}
    </DragListContext.Provider>
  );
}
