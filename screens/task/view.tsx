import { useTaskContext } from "@/screens/task/context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import TaskActionIcon from "./action-icon";
import TaskCard from "./card";

import { useDragListContext } from "@/context/drag-list";
import { useTaskManagerStore } from "@/store/task-manager.store";
import { View } from "react-native";
import DragButton from "./drag-button";

export default function TaskView({ hidden }: { hidden: boolean }) {
  const { deleting, currentIndex } = useTaskContext();
  const { dragIndex, draggedOverCount, offsetY } = useDragListContext();
  const { setTaskHeight, heights } = useTaskManagerStore();

  const height = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => ({
    height: deleting.value === 1 ? undefined : deleting.value * height.value,
    transform: [
      {
        translateY:
          offsetY.value === 0
            ? 0
            : // if current is dragged
            dragIndex.value === currentIndex
            ? offsetY.value
            : // if the dragged is going down and dragged over me
            offsetY.value > 0 &&
              currentIndex - dragIndex.value > 0 &&
              currentIndex - dragIndex.value <= draggedOverCount.value
            ? withTiming(-heights[dragIndex.value], { duration: 300 })
            : // if the dragged is going up and dragged over me
            offsetY.value < 0 &&
              dragIndex.value - currentIndex > 0 &&
              dragIndex.value - currentIndex <= draggedOverCount.value
            ? withTiming(heights[dragIndex.value], { duration: 300 })
            : // if I am not dragged and no drag over me
              withTiming(0, { duration: 300 }),
      },
    ],
    zIndex: dragIndex.value === currentIndex ? 10 : 1,
  }));

  return (
    <Animated.View
      style={[
        {
          overflowY: "hidden",
          flexDirection: "row",
          display: hidden ? "none" : "flex",
        },
        containerStyle,
      ]}
      onLayout={(e) => {
        if (deleting.value === 1) height.value = e.nativeEvent.layout.height;
        setTaskHeight(currentIndex, e.nativeEvent.layout.height);
      }}
    >
      <DragButton index={currentIndex} />

      <View style={{ flex: 1 }}>
        <TaskActionIcon name="edit" />
        <TaskActionIcon name="delete" />

        <TaskCard />
      </View>
    </Animated.View>
  );
}
