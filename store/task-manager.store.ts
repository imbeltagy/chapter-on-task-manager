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

  heights: number[];
  setTaskHeight: (index: number, height: number) => void;

  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  updateTask: (task: Task) => void;

  taskToEdit: Task | null;
  setTaskToEdit: (task: Task | null) => void;

  filter: Filter;
  setFilter: (filter: Filter) => void;

  moveDownAfter: (from: string, to: string) => void;
  moveUpBefore: (from: string, to: string) => void;
}

export const useTaskManagerStore = create<TaskManagerStore>((set, get) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),

  heights: [],
  setTaskHeight: (index, height) => {
    set(({ heights }) => {
      const old = [...heights];
      old[index] = height;
      return { heights: old };
    });
  },

  addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),
  removeTask: (id) =>
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
  updateTask: (task) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    })),

  taskToEdit: null,
  setTaskToEdit: (task) => set({ taskToEdit: task }),

  filter: "all",
  setFilter: (filter) => set({ filter }),

  moveDownAfter: (from, to) =>
    set((state) => {
      const newTasks = [...state.tasks];
      let swap = false;

      for (let i = 0; i < newTasks.length; i++) {
        if (swap) {
          const curId = newTasks[i].id;
          [newTasks[i], newTasks[i - 1]] = [newTasks[i - 1], newTasks[i]];

          if (curId === to) {
            break;
          }
        }

        if (newTasks[i].id === from) {
          swap = true;
        }
      }

      return { tasks: newTasks };
    }),
  moveUpBefore: (from, to) =>
    set((state) => {
      const newTasks = [...state.tasks];
      let swap = false;

      for (let i = newTasks.length - 1; i >= 0; i--) {
        if (swap) {
          const curId = newTasks[i].id;
          [newTasks[i], newTasks[i + 1]] = [newTasks[i + 1], newTasks[i]];

          if (curId === to) {
            break;
          }
        }

        if (newTasks[i].id === from) {
          swap = true;
        }
      }

      return { tasks: newTasks };
    }),
}));
