import { useDragListContext } from "@/context/drag-list";
import { useTaskManagerStore } from "@/store/task-manager.store";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS, withTiming } from "react-native-reanimated";

export default function DragButton({ index }: { index: number }) {
  const { dragIndex, draggedOverCount, offsetY } = useDragListContext();
  const { heights, tasks, setTasks } = useTaskManagerStore();

  const calculateTasksDraggedOver = (
    y: number,
    currentIndex: number,
    taskHeights: number[]
  ) => {
    if (y === 0) {
      draggedOverCount.value = 0;
      return;
    }

    let count = 0;
    let cumulativeHeight = 0;
    const absY = Math.abs(y);

    if (y > 0) {
      // Dragging down - count tasks below
      for (let i = currentIndex + 1; i < taskHeights.length; i++) {
        const height = taskHeights[i] || 0;
        cumulativeHeight += height;
        if (cumulativeHeight - height / 2 <= absY) {
          count++;
        } else {
          break;
        }
      }
    } else {
      // Dragging up - count tasks above
      for (let i = currentIndex - 1; i >= 0; i--) {
        const height = taskHeights[i] || 0;
        cumulativeHeight += height;
        if (cumulativeHeight - height / 2 <= absY) {
          count++;
        } else {
          break;
        }
      }
    }

    draggedOverCount.value = count;
  };

  const dragGesture = Gesture.Pan()
    .onBegin(() => {
      dragIndex.value = index;
    })
    .onUpdate((event) => {
      // if (dragIndex.value !== index) return;
      const y = event.translationY;

      offsetY.value = y;
      runOnJS(calculateTasksDraggedOver)(y, index, heights);
    })
    .onEnd(() => {
      const newTasks = [...tasks];

      if (offsetY.value > 0) {
        for (
          let i = dragIndex.value;
          i < dragIndex.value + draggedOverCount.value;
          i++
        ) {
          [newTasks[i], newTasks[i + 1]] = [newTasks[i + 1], newTasks[i]];
        }

        offsetY.value = withTiming(
          draggedOverCount.value * heights[dragIndex.value],
          { duration: 150 }
        );
      } else {
        let accumulatedHeight = 0;
        for (
          let i = dragIndex.value;
          i > dragIndex.value - draggedOverCount.value;
          i--
        ) {
          [newTasks[i], newTasks[i - 1]] = [newTasks[i - 1], newTasks[i]];
          accumulatedHeight += heights[i - 1] || 0;
        }

        offsetY.value = withTiming(-accumulatedHeight, { duration: 150 });
      }

      runOnJS(setTasks)(newTasks);
    });
  // .activeOffsetY([-30, 30]);

  return (
    <GestureDetector gesture={dragGesture}>
      <View style={{ paddingInlineEnd: 10 }}>
        <Ionicons name="menu" size={24} color="black" />
      </View>
    </GestureDetector>
  );
}
