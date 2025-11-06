import { useTaskManagerStore } from "@/store/task-manager.store";
import { View } from "react-native";
import { Chip } from "react-native-paper";

export default function Filters() {
  const { tasks, filter, setFilter } = useTaskManagerStore();
  const all = tasks.length;
  const completed: number = tasks.filter((task) => task.completed).length;
  const incomplete: number = all - completed;

  const filters: { label: string; value: typeof filter; icon: string }[] = [
    {
      label: "All",
      value: "all",
      icon: "format-list-bulleted",
    },
    {
      label: "Completed",
      value: "completed",
      icon: "check",
    },
    {
      label: "Incomplete",
      value: "incomplete",
      icon: "progress-clock",
    },
  ];

  return (
    <View
      style={{ flexDirection: "row", gap: 10, flexWrap: "wrap", padding: 16 }}
    >
      {filters.map((item) => (
        <Chip
          key={item.value}
          icon={item.icon}
          onPress={() => setFilter(item.value)}
          mode={item.value === filter ? "flat" : "outlined"}
          style={{ borderColor: item.value === filter ? "black" : undefined }}
        >
          {item.value === "all"
            ? all
            : item.value === "completed"
            ? completed
            : incomplete}
        </Chip>
      ))}
    </View>
  );
}
