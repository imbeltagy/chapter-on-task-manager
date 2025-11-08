import Headding from "@/components/headding";
import DragListProvider from "@/context/drag-list/provider";
import Filters from "@/screens/filters";
import { Task } from "@/screens/task";
import TaskModal from "@/screens/task-modal";
import { useTaskManagerStore } from "@/store/task-manager.store";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { useSharedValue } from "react-native-reanimated";

export default function Index() {
  const { tasks, filter } = useTaskManagerStore();

  const offsetY = useSharedValue(0);
  const draggedOverCount = useSharedValue(0);
  const dragIndex = useSharedValue(-1);
  const ignoredIds = useSharedValue<string[]>([]);

  useEffect(() => {
    offsetY.value = 0;
    draggedOverCount.value = 0;
    dragIndex.value = -1;
    ignoredIds.value = [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  return (
    <>
      <Headding
        title="Tasks List"
        subtitle="Create, Edit, Order, and Delete your Tasks freely"
      />

      <Filters />

      <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingBottom: 90 }}>
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
                filter !== "all" && task.completed !== (filter === "completed")
              }
              index={index}
            />
          ))}
        </DragListProvider>
      </ScrollView>

      <TaskModal />
    </>
  );
}
