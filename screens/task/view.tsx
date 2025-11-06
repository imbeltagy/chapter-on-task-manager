import { useTaskContext } from "@/context/task";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import TaskActionIcon from "./action-icon";
import TaskCard from "./card";

export default function TaskView() {
  const { deleting } = useTaskContext();

  const height = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => ({
    height: deleting.value === 1 ? undefined : deleting.value * height.value,
  }));

  return (
    <Animated.View
      style={[{ overflow: "hidden" }, containerStyle]}
      onLayout={(e) => {
        if (deleting.value === 1) height.value = e.nativeEvent.layout.height;
      }}
    >
      <TaskActionIcon name="edit" />
      <TaskActionIcon name="delete" />

      <TaskCard />
    </Animated.View>
  );
}
