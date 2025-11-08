import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function NoTasks() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 32,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <Text
          variant="bodyLarge"
          style={{ textAlign: "center", color: "gray" }}
        >
          It seems that you don&apos;t have tasks yet. Press{" "}
          <Ionicons name="add-circle" size={20} /> button to create your first
          task
        </Text>
      </View>
    </View>
  );
}
