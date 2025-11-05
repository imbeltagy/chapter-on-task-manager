import useBoolean, { UseBoolean } from "@/hooks/use-boolean";
import { createContext, useContext, useState } from "react";
import { Gesture, PanGesture } from "react-native-gesture-handler";
import {
  SharedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface TaskContextType {
  id: string;
  title: string;
  description?: string;

  completed: UseBoolean;
  expanded: UseBoolean;
  toggleExpanding: () => void;

  textInitialHeight: number | null;
  setTextInitialHeight: (height: number | null) => void;

  taskWidth: number;
  setTaskWidth: (width: number) => void;

  expanding: SharedValue<number>;
  isSliding: SharedValue<boolean>;
  offsetX: SharedValue<number>;
  slidePercent: SharedValue<number>;
  slidingGesture: PanGesture;
}

export const TaskContext = createContext<TaskContextType>(
  {} as TaskContextType
);
export const useTaskContext = () => useContext<TaskContextType>(TaskContext);

export const TaskProvider = ({
  children,
  id,
  title,
  description,
}: {
  children: React.ReactNode;
  id: string;
  title: string;
  description?: string;
}) => {
  const completed = useBoolean();
  const expanded = useBoolean(true);
  const [textInitialHeight, setTextInitialHeight] = useState<number | null>(
    null
  );
  const [taskWidth, setTaskWidth] = useState(0);

  const expanding = useSharedValue(1);
  const isSliding = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const slidePercent = useSharedValue(0);

  const slidingGesture = Gesture.Pan()
    .onBegin(() => {
      isSliding.value = true;
    })
    .onUpdate((event) => {
      // console.log("update", event.translationX);
      offsetX.value = event.translationX;
      slidePercent.value = event.translationX / (taskWidth || 1);
    })
    .onEnd(() => {
      offsetX.value = withTiming(0, {
        duration: 300,
      });
      slidePercent.value = withTiming(0, {
        duration: 300,
      });
    })
    .onFinalize(() => {
      isSliding.value = false;
    })
    .activeOffsetX([-10, 10]);

  const toggleExpanding = () => {
    expanded.setValue((prev) => {
      const newVal = !prev;

      expanding.value = withTiming(newVal ? 1 : 0, {
        duration: 300,
      });

      return newVal;
    });
  };

  const value = {
    id,
    title,
    description,

    completed,
    expanded,
    toggleExpanding,

    textInitialHeight,
    setTextInitialHeight,

    taskWidth,
    setTaskWidth,

    isSliding,
    expanding,
    offsetX,
    slidePercent,
    slidingGesture,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
