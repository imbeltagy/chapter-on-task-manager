import { TaskProvider } from "@/context/task/provider";
import TaskView from "./view";

interface Props {
  id: string;
  title: string;
  description?: string;
}

export default function Task({ id, title, description }: Props) {
  return (
    <TaskProvider id={id} title={title} description={description}>
      <TaskView />
    </TaskProvider>
  );
}
