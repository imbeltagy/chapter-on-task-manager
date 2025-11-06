import Headding from "@/components/headding";
import TaskModal from "@/screens/task-modal";
import Task from "@/screens/task/index";
import { useTaskManagerStore } from "@/store/task-manager.store";
import { ScrollView, View } from "react-native";

export default function Index() {
  const { tasks } = useTaskManagerStore();

  return (
    <>
      <Headding
        title="Tasks List"
        subtitle="Create, Edit, Order, and Delete your Tasks freely"
      />

      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 16, paddingBottom: 90 }}>
          {tasks.map((task) => (
            <Task key={task.id} {...task} />
          ))}
        </View>
      </ScrollView>

      <TaskModal />
    </>
  );
}
