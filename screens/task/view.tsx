import Animated from "react-native-reanimated";
import TaskActionIcon from "./action-icon";
import TaskCard from "./card";

import { View } from "react-native";

export default function TaskView({ hidden }: { hidden: boolean }) {
  return (
    <Animated.View
      style={[
        {
          overflowY: "hidden",
          flexDirection: "row",
          display: hidden ? "none" : "flex",
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <TaskActionIcon name="edit" />
        <TaskActionIcon name="delete" />

        <TaskCard />
      </View>
    </Animated.View>
  );
}
