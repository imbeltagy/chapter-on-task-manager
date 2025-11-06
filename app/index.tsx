import Headding from "@/components/headding";
import Filters from "@/screens/filters";
import { Task } from "@/screens/task";
import TaskModal from "@/screens/task-modal";
import { useTaskManagerStore } from "@/store/task-manager.store";
import { ScrollView } from "react-native";

export default function Index() {
  const { tasks, filter } = useTaskManagerStore();

  return (
    <>
      <Headding
        title="Tasks List"
        subtitle="Create, Edit, Order, and Delete your Tasks freely"
      />

      <Filters />

      <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingBottom: 90 }}>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            hidden={
              filter !== "all" && task.completed !== (filter === "completed")
            }
          />
        ))}
      </ScrollView>

      <TaskModal />
    </>
  );
}
