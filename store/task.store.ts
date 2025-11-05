import { create } from "zustand";

export interface Task {
  id: string;
  title: string;
  description?: string;
}

export interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  updateTask: (task: Task) => void;

  taskToEdit: Task | null;
  setTaskToEdit: (task: Task | null) => void;
}

const initialTasks: Task[] = [
  { id: "1", title: "Task 1", description: "Description 1" },
  {
    id: "2",
    title: "Task 2",
    description:
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    id: "3",
    title: "Task 3",
    description:
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    id: "4",
    title: "Long task title to test the card width",
    description:
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    id: "5",
    title: "Task 5",
    description: "Review meeting notes and allocate next steps.",
  },
  {
    id: "6",
    title: "Task 6",
    description: "Refactor user authentication logic.",
  },
  {
    id: "7",
    title: "Task 7",
    description: "Update project documentation for onboarding.",
  },
  {
    id: "8",
    title: "Task 8",
    description: "Test app on different devices for compatibility.",
  },
  {
    id: "9",
    title: "Task 9",
    description: "Organize team standup for tomorrow morning.",
  },
  {
    id: "10",
    title: "Task 10",
    description: "Prepare demo slides for stakeholders.",
  },
  {
    id: "11",
    title: "Task 11",
    description: "Fix bug in payment integration module.",
  },
  {
    id: "12",
    title: "Task 12",
    description: "Push latest changes to the main branch.",
  },
  {
    id: "13",
    title: "Task 13",
    description: "Discuss sprint goals with the product manager.",
  },
  {
    id: "14",
    title: "Task 14",
    description: "Research new libraries for state management.",
  },
];

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: initialTasks,
  addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),
  removeTask: (id) =>
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
  updateTask: (task) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    })),

  taskToEdit: null,
  setTaskToEdit: (task) => set({ taskToEdit: task }),
}));
