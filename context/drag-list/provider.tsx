import { SharedValue } from "react-native-reanimated";
import { DragListContext } from ".";

export default function DragListProvider({
  children,
  offsetY,
  draggedOverCount,
  dragIndex,
  ignoredIds,
}: {
  children: React.ReactNode;
  offsetY: SharedValue<number>;
  draggedOverCount: SharedValue<number>;
  dragIndex: SharedValue<number>;
  ignoredIds: SharedValue<string[]>;
}) {
  return (
    <DragListContext.Provider
      value={{ dragIndex, draggedOverCount, offsetY, ignoredIds }}
    >
      {children}
    </DragListContext.Provider>
  );
}
