import { useTaskContext } from "@/context/task";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import TaskActionIcon from "./action-icon";
import TaskCard from "./card";

export default function TaskView() {
  const {
    deleting,
    textInitialHeight,
    expanding,
    textLineHeight,
    titleHeight,
  } = useTaskContext();

  const containerStyle = useAnimatedStyle(() => ({
    height: withTiming(
      deleting.value *
        (titleHeight.value +
          1 +
          (expanding.value === 1 || textInitialHeight <= textLineHeight
            ? textInitialHeight
            : textLineHeight)),
      { duration: 300 }
    ),
  }));

  return (
    <Animated.View style={[{ overflow: "hidden" }, containerStyle]}>
      <TaskActionIcon name="edit" />
      <TaskActionIcon name="delete" />

      <TaskCard />
    </Animated.View>
  );
}
