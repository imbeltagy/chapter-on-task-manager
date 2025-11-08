import Headding from "@/components/headding";
import Filters from "@/screens/filters";
import NoTasks from "@/screens/no-tasks";
import { Task } from "@/screens/task";
import TaskModal from "@/screens/task-modal";
import { Task as TTask, useTaskManagerStore } from "@/store/task-manager.store";
import { useCallback, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useAnimatedRef } from "react-native-reanimated";
import Sortable, { SortableGridRenderItem } from "react-native-sortables";

export default function Index() {
  const { tasks, filter, setTasks, setOnAddTask } = useTaskManagerStore();
  const hasTasks = tasks.length > 0;

  const scrollableRef = useAnimatedRef<ScrollView>();

  useEffect(() => {
    setOnAddTask(() => {
      scrollableRef.current?.scrollTo({ y: 0, animated: true });
    });
  }, [scrollableRef, setOnAddTask]);

  const renderItem = useCallback<SortableGridRenderItem<TTask>>(
    ({ item }) => (
      <Task
        key={item.id}
        task={item}
        hidden={filter !== "all" && item.completed !== (filter === "completed")}
      />
    ),
    [filter]
  );

  return (
    <>
      <Headding
        title="Tasks List"
        subtitle="Create, Edit, Order, and Delete your Tasks freely"
      />

      {hasTasks ? (
        <>
          <Filters />

          <ScrollView
            style={{
              flex: 1,
              paddingHorizontal: 16,
              paddingBottom: 90,
            }}
            ref={scrollableRef}
          >
            <Sortable.Grid
              columns={1}
              data={tasks}
              renderItem={renderItem}
              onDragEnd={(params) => {
                setTimeout(() => {
                  setTasks(params.data);
                }, 300);
              }}
            />
          </ScrollView>
        </>
      ) : (
        <NoTasks />
      )}

      <TaskModal />
    </>
  );
}
