import { TaskProvider } from "@/context/task/provider";
import { Task as TTask } from "@/store/task.store";
import TaskView from "./view";

export default function Task(task: TTask) {
  return (
    <TaskProvider {...task}>
      <TaskView />
    </TaskProvider>
  );
}
