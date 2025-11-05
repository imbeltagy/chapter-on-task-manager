import { TaskProvider } from "@/context/task/provider";
import { View } from "react-native";
import TaskActionIcon from "./action-icon";
import TaskCard from "./card";

interface Props {
  id: string;
  title: string;
  description?: string;
}

export default function Task({ id, title, description }: Props) {
  return (
    <TaskProvider id={id} title={title} description={description}>
      <View>
        <TaskActionIcon name="edit" />
        <TaskActionIcon name="delete" />

        <TaskCard />
      </View>
    </TaskProvider>
  );
}
