import { create } from "zustand";

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

export type Filter = "all" | "completed" | "incomplete";

export interface TaskManagerStore {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;

  // add/remove/update tasks
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  updateTask: (task: Partial<Task>) => void;

  // function to call when a task is added
  onAddTask: () => void;
  setOnAddTask: (onAddTask: () => void) => void;

  // set task for editing - opens form modal
  taskToEdit: Partial<Task> | null;
  setTaskToEdit: (task: Partial<Task> | null) => void;

  filter: Filter;
  setFilter: (filter: Filter) => void;
}

export const useTaskManagerStore = create<TaskManagerStore>((set, get) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),

  addTask: (task) => {
    set((state) => ({ tasks: [task, ...state.tasks] }));
    get().onAddTask();
  },
  removeTask: (id) =>
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
  updateTask: (task) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === task.id ? { ...t, ...task } : t)),
    })),

  onAddTask: () => {},
  setOnAddTask: (onAddTask) => set({ onAddTask }),

  taskToEdit: null,
  setTaskToEdit: (task) => set({ taskToEdit: task }),

  filter: "all",
  setFilter: (filter) => set({ filter }),
}));
