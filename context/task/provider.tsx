import useBoolean from "@/hooks/use-boolean";
import { useTaskStore } from "@/store/task.store";
import { useState } from "react";
import { Dimensions } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import { runOnJS, useSharedValue, withTiming } from "react-native-reanimated";
import { TaskContext } from ".";

const screen = Dimensions.get("screen");
const slideMax = Math.min(screen.width * 0.8, 500);

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
  const { removeTask, setTaskToEdit } = useTaskStore();

  const completed = useBoolean();
  const expanded = useBoolean(true);
  const [textInitialHeight, setTextInitialHeight] = useState<number | null>(
    null
  );
  const [textCollapseHeightDiff, setTextCollapseHeightDiff] = useState<
    number | null
  >(null);

  const expanding = useSharedValue(1);
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
          runOnJS(setTaskToEdit)({ id, title, description });
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
    textCollapseHeightDiff,
    setTextCollapseHeightDiff,

    isSliding,
    expanding,
    offsetX,
    slidePercent,
    slidingGesture,

    deleting,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
