import { UseBoolean } from "@/hooks/use-boolean";
import { createContext, useContext } from "react";
import { PanGesture } from "react-native-gesture-handler";
import { SharedValue } from "react-native-reanimated";

interface TaskContextType {
  id: string;
  title: string;
  description?: string;

  completed: UseBoolean;
  expanded: UseBoolean;
  toggleExpanding: () => void;

  titleHeight: SharedValue<number>;

  textLineHeight: number;
  textInitialHeight: number;
  setTextInitialHeight: (height: number) => void;

  expanding: SharedValue<number>;
  isSliding: SharedValue<boolean>;
  offsetX: SharedValue<number>;
  slidePercent: SharedValue<number>;
  slidingGesture: PanGesture;

  deleting: SharedValue<number>;
}

export const TaskContext = createContext<TaskContextType>(
  {} as TaskContextType
);
export const useTaskContext = () => useContext<TaskContextType>(TaskContext);
