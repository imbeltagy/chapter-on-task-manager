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

export const initialTasks: Task[] = [
  { id: "1", title: "Task 1", description: "Description 1", completed: false },
  {
    id: "2",
    title: "Task 2",
    description:
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    completed: true,
  },
  {
    id: "3",
    title: "Task 3",
    description:
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    completed: false,
  },
  {
    id: "4",
    title: "Long task title to test the card width",
    description:
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    completed: true,
  },
  {
    id: "5",
    title: "Task 5",
    description: "Review meeting notes and allocate next steps.",
    completed: false,
  },
  {
    id: "6",
    title: "Task 6",
    description: "Refactor user authentication logic.",
    completed: true,
  },
  {
    id: "7",
    title: "Task 7",
    description: "Update project documentation for onboarding.",
    completed: false,
  },
  {
    id: "8",
    title: "Task 8",
    description: "Test app on different devices for compatibility.",
    completed: true,
  },
  {
    id: "9",
    title: "Task 9",
    description: "Organize team standup for tomorrow morning.",
    completed: false,
  },
  {
    id: "10",
    title: "Task 10",
    description: "Prepare demo slides for stakeholders.",
    completed: true,
  },
  {
    id: "11",
    title: "Task 11",
    description: "Fix bug in payment integration module.",
    completed: false,
  },
  {
    id: "12",
    title: "Task 12",
    description: "Push latest changes to the main branch.",
    completed: true,
  },
  {
    id: "13",
    title: "Task 13",
    description: "Discuss sprint goals with the product manager.",
    completed: false,
  },
  {
    id: "14",
    title: "Task 14",
    description: "Research new libraries for state management.",
    completed: true,
  },
];

export const useTaskManagerStore = create<TaskManagerStore>((set, get) => ({
  tasks: initialTasks,
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
