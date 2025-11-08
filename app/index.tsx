import Headding from "@/components/headding";
import DragListProvider from "@/context/drag-list/provider";
import Filters from "@/screens/filters";
import { Task } from "@/screens/task";
import TaskModal from "@/screens/task-modal";
import { useTaskManagerStore } from "@/store/task-manager.store";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { useSharedValue } from "react-native-reanimated";

export default function Index() {
  const { tasks, filter } = useTaskManagerStore();

  const offsetY = useSharedValue(0);
  const draggedOverCount = useSharedValue(0);
  const dragIndex = useSharedValue(-1);
  const ignoredIds = useSharedValue<string[]>([]); // the hidden tasks that are passed by the dragged task

  useEffect(() => {
    offsetY.value = 0;
    draggedOverCount.value = 0;
    dragIndex.value = -1;
    ignoredIds.value = [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  const hasTasks = tasks.length > 0;

  return (
    <>
      <Headding
        title="Tasks List"
        subtitle="Create, Edit, Order, and Delete your Tasks freely"
      />

      {hasTasks ? (
        <>
          <Filters />

          <ScrollView
            style={{ flex: 1, paddingHorizontal: 16, paddingBottom: 90 }}
          >
            <DragListProvider
              offsetY={offsetY}
              draggedOverCount={draggedOverCount}
              dragIndex={dragIndex}
              ignoredIds={ignoredIds}
            >
              {tasks.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  hidden={
                    filter !== "all" &&
                    task.completed !== (filter === "completed")
                  }
                  index={index}
                />
              ))}
            </DragListProvider>
          </ScrollView>
        </>
      ) : (
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
              <Ionicons name="add-circle" size={20} /> button to create your
              first task
            </Text>
          </View>
        </View>
      )}

      <TaskModal />
    </>
  );
}
