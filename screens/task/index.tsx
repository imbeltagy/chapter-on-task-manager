import { TaskProvider } from "@/context/task/provider";
import { Task as TTask } from "@/store/task-manager.store";
import TaskView from "./view";

export default function Task(task: TTask) {
  return (
    <TaskProvider {...task}>
      <TaskView />
    </TaskProvider>
  );
}
