import { TaskProvider } from "@/context/task/provider";
import { Task as TTask } from "@/store/task-manager.store";
import TaskView from "./view";

export default function Task({
  task,
  hidden,
}: {
  task: TTask;
  hidden: boolean;
}) {
  return (
    <TaskProvider {...task}>
      <TaskView hidden={hidden} />
    </TaskProvider>
  );
}
