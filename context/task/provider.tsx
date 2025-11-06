import { useTaskStore } from "@/store/task.store";
import { useState } from "react";
import { Dimensions } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import { runOnJS, useSharedValue, withTiming } from "react-native-reanimated";
import { TaskContext } from ".";

const screen = Dimensions.get("screen");
const slideMax = Math.min(screen.width * 0.8, 500);
const textLineHeight = 20;

export const TaskProvider = ({
  children,
  id,
  title,
  description,
  completed: initialCompleted,
}: {
  children: React.ReactNode;
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}) => {
  const { removeTask, setTaskToEdit } = useTaskStore();

  const [completed, setCompleted] = useState(initialCompleted);
  const titleHeight = useSharedValue(0);
  const [textInitialHeight, setTextInitialHeight] = useState<number>(
    description?.trim() ? textLineHeight : 0
  );

  const expanding = useSharedValue(0);
  const isSliding = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const slidePercent = useSharedValue(0);

  const deleting = useSharedValue(1);

  const slidingGesture = Gesture.Pan()
    .onBegin(() => {
      isSliding.value = true;
    })
    .onUpdate((event) => {
      // console.log("update", event.translationX);
      offsetX.value = event.translationX;
      slidePercent.value = event.translationX / slideMax;
    })
    .onEnd(() => {
      if (deleting.value < 1) return;

      if (slidePercent.value > 0.6) {
        // delete task
        deleting.value = withTiming(0, {
          duration: 200,
        });
        offsetX.value = withTiming(screen.width * 1.2, {
          duration: 200,
        });
        slidePercent.value = withTiming(screen.width * 1.2, {
          duration: 200,
        });

        setTimeout(() => {
          runOnJS(removeTask)(id);
        }, 200);
      } else {
        if (slidePercent.value < -0.6) {
          // Edit Task
          runOnJS(setTaskToEdit)({
            id,
            title,
            description,
            completed,
          });
        }

        // cancel
        offsetX.value = withTiming(0, {
          duration: 300,
        });
        slidePercent.value = withTiming(0, {
          duration: 300,
        });
      }
    })
    .onFinalize(() => {
      isSliding.value = false;
    })
    .activeOffsetX([-30, 30]);

  const value = {
    id,
    title,
    description,

    completed,
    setCompleted,

    titleHeight,

    textLineHeight,
    textInitialHeight,
    setTextInitialHeight,

    isSliding,
    expanding,
    offsetX,
    slidePercent,
    slidingGesture,

    deleting,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
