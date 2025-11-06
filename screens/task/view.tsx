import { useTaskContext } from "@/screens/task/context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import TaskActionIcon from "./action-icon";
import TaskCard from "./card";

import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";

export default function TaskView({ hidden }: { hidden: boolean }) {
  const { deleting } = useTaskContext();

  const height = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => ({
    height: deleting.value === 1 ? undefined : deleting.value * height.value,
  }));

  return (
    <Animated.View
      style={[
        {
          overflowY: "hidden",
          flexDirection: "row",
          gap: 10,
          display: hidden ? "none" : "flex",
        },
        containerStyle,
      ]}
      onLayout={(e) => {
        if (deleting.value === 1) height.value = e.nativeEvent.layout.height;
      }}
    >
      <Ionicons name="menu" size={24} color="black" />

      <View style={{ flex: 1 }}>
        <TaskActionIcon name="edit" />
        <TaskActionIcon name="delete" />

        <TaskCard />
      </View>
    </Animated.View>
  );
}
