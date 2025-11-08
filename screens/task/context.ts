import { Task } from "@/store/task-manager.store";
import { createContext, useContext } from "react";
import { PanGesture } from "react-native-gesture-handler";
import { SharedValue } from "react-native-reanimated";

interface TaskContextType extends Task {
  toggleComplete: () => void;

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
