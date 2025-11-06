import Headding from "@/components/headding";
import Filters from "@/screens/filters";
import TaskModal from "@/screens/task-modal";
import Task from "@/screens/task/index";
import { useTaskManagerStore } from "@/store/task-manager.store";
import { ScrollView, View } from "react-native";

export default function Index() {
  const { tasks, filter } = useTaskManagerStore();

  return (
    <>
      <Headding
        title="Tasks List"
        subtitle="Create, Edit, Order, and Delete your Tasks freely"
      />

      <Filters />

      <ScrollView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 16, paddingBottom: 90 }}>
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              hidden={
                filter !== "all" && task.completed !== (filter === "completed")
              }
            />
          ))}
        </View>
      </ScrollView>

      <TaskModal />
    </>
  );
}
