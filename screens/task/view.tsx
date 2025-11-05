import { useTaskContext } from "@/context/task";
import { useState } from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import TaskActionIcon from "./action-icon";
import TaskCard from "./card";

export default function TaskView() {
  const { deleting, textCollapseHeightDiff, expanding } = useTaskContext();
  const [cardHeight, setCardHeight] = useState<number | null>(null);

  const containerStyle = useAnimatedStyle(() => ({
    height:
      cardHeight !== null
        ? deleting.value *
          (cardHeight - (1 - expanding.value) * (textCollapseHeightDiff ?? 0))
        : undefined,
  }));

  return (
    <Animated.View
      style={[{ overflow: "hidden" }, containerStyle]}
      onLayout={(e) => {
        if (cardHeight === null) setCardHeight(e.nativeEvent.layout.height);
      }}
    >
      <TaskActionIcon name="edit" />
      <TaskActionIcon name="delete" />

      <TaskCard />
    </Animated.View>
  );
}
