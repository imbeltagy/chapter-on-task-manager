import Headding from "@/components/headding";
import Task from "@/screens/task";
import { ScrollView } from "react-native";

export default function Index() {
  return (
    <>
      <Headding
        title="Tasks List"
        subtitle="Create, Edit, Order, and Delete your Tasks freely"
      />

      <ScrollView style={{ flex: 1, padding: 16 }}>
        <Task
          id="1"
          title="Task 1"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris posuere ligula vitae nulla cursus, a dictum tortor hendrerit."
        />
      </ScrollView>
    </>
  );
}
