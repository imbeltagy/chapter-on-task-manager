# Task Management App

A feature-rich task management application built with React Native and Expo, providing an intuitive interface for organizing and tracking your daily tasks.

## Setup and Installation

### Prerequisites

##### skip this section and the following one if you will download the prebuild APK version

- Node.js (v14 or higher)
- npm or pnpm package manager
- Expo Go app on your mobile device (for testing on physical device)
- Android Studio (optional, for Android emulator)

### Installation Steps

#### Using npm:

```bash
npm install
npx expo start
```

#### Using pnpm:

```bash
pnpm install
pnpm expo start
```

### Running the App

After starting the development server, you have several options:

1. **Pre-built APK**:

   - Download the APK directly from: [here](https://expo.dev/accounts/imbeltagy/projects/chapterone/builds/389458fe-d664-4ee8-831e-73e097805406)
   - Install on any Android device

2. **Physical Device**:

   - Install the Expo Go app from your device's app store
   - Scan the QR code displayed in the terminal
   - The app will open automatically in Expo Go

3. **Android Emulator**:
   - Ensure Android Studio is installed and configured
   - Press `a` in the terminal to launch on Android emulator

## Features

### Task Operations

- **Create Tasks**: Tap the `+` button in the bottom right corner to add a new task
- **Edit Tasks**: Swipe a task to the left to edit its details
- **Delete Tasks**: Swipe a task to the right to remove it
- **Toggle Completion**: Tap on a task to mark it as complete or incomplete
- **Expand Details**: Press the `+` button on a task to expand and view its full content
- **Reorder Tasks**: Press and hold a task to drag and reorder it in your list

### Filtering

- Use the filter options at the top to view:
  - **All**: Display all tasks
  - **Completed**: Show only completed tasks
  - **Incomplete**: Show only pending tasks

## Technology Stack

### Core Framework

- **React Native** with **Expo** for cross-platform mobile development

### Third-Party Libraries

| Library                          | Purpose                                                                         |
| -------------------------------- | ------------------------------------------------------------------------------- |
| `react-native-paper`             | Material Design UI component library for consistent and polished interface      |
| `react-native-safe-area-context` | Ensures content avoids status bar and navigation bar areas on different devices |
| `react-native-gesture-handler`   | Handles complex gesture interactions for swiping and dragging                   |
| `react-native-reanimated`        | Provides smooth, performant animations for gesture-based interactions           |
| `react-native-sortable-list`     | Enables drag-and-drop functionality for task reordering                         |
| `zustand`                        | Lightweight state management solution for global app state                      |

## State Management Architecture

The app uses a hybrid approach to state management:

### React Context

- **Purpose**: Manages shared state between a component and its children
- **Use Case**: `taskContext` handles task-specific state to force re-renders on status changes and simplify hook definitions
- **Scope**: Local to task components and their descendants

### Zustand

- **Purpose**: Manages shared state across multiple components
- **Use Case**: `taskManagementStore` handles all tasks and filter states globally
- **Scope**: Application-wide state accessible from any component

---

Built with ❤️ using React Native and Expo
