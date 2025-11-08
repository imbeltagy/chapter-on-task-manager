import { createContext, useContext } from "react";
import { SharedValue } from "react-native-reanimated";

interface DragListContextType {
  dragIndex: SharedValue<number>;
  draggedOverCount: SharedValue<number>;
  ignoredIds: SharedValue<string[]>;
  offsetY: SharedValue<number>;
}

export const DragListContext = createContext<DragListContextType>(
  {} as DragListContextType
);

export const useDragListContext = () => useContext(DragListContext);
