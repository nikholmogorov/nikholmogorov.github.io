import { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { AddTaskForm } from './components/AddTaskForm';
import { TasksContainer } from './components/TasksContainer';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { AppThemeProvider } from './AppThemeProvider';
import { type InputValuesType } from './components/AddTaskForm';
import { initialTaskList } from './initialTaskList';
import { DesktopOnlyGuard } from './components/DesktopOnlyGuard';
import { LIGHT_GRADIENT, DARK_GRADIENT } from './constants';

import Box from '@mui/material/Box';
import { type Theme } from '@mui/material/styles';

export interface SortConfigType {
  key: `isDone` | `text` | `name` | `email` | null;
  direction: `asc` | `desc` | null;
}

export interface TaskType {
  id: string;
  name: string;
  email: string;
  text: string;
  isDone: boolean;
  isEdited: boolean;
}

const adminPanel = {
  position: `fixed`,
  p: 2,
};

const workArea = {
  display: `flex`,
  flexDirection: 'column',
  alignItems: `center`,
  gap: 2,
  ml: 31,
  p: 2,
};

const getTaskManagerStyle = (theme: Theme) => ({
  minHeight: `100dvh`,
  background: theme.palette.mode === `dark` ? DARK_GRADIENT : LIGHT_GRADIENT,
});

export default function App() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TaskType[]>(initialTaskList);
  const [sortConfig, setSortConfig] = useState<SortConfigType>({
    key: null,
    direction: null,
  });

  function addTask(inputValuesObject: InputValuesType) {
    const taskId = crypto.randomUUID?.() ?? String(Date.now());
    const clearedText = inputValuesObject.text.replace(/[{}<>$]/g, ``);
    const clearedName = inputValuesObject.name.replace(/[{}<>$]/g, ``);
    const clearedEmail = inputValuesObject.email.replace(/[{}<>$]/g, ``);
    setTasks((prevTasks) => [
      {
        id: taskId,
        text: clearedText,
        name: clearedName,
        email: clearedEmail,
        isDone: false,
        isEdited: false,
      },
      ...prevTasks,
    ]);
    setSortConfig({ key: null, direction: null });
  }

  function toggleTaskDone(taskId: string, isDone: boolean) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isDone: !isDone, isEdited: true } : task
      )
    );
  }

  function deleteTask(taskId: string) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }

  function editText(taskId: string, newText: string) {
    const oldText = tasks.find((task) => task.id === taskId)?.text;
    if (oldText === newText) return;
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, text: newText, isEdited: true } : task
      )
    );
  }

  function sortTasksHandler(sortBy: SortConfigType[`key`]) {
    let newConfig: SortConfigType = { key: null, direction: null };
    if (sortConfig.key === sortBy) {
      const newDirection = sortConfig.direction === `asc` ? `desc` : `asc`;
      newConfig = { key: sortBy, direction: newDirection };
    } else {
      newConfig = { key: sortBy, direction: `asc` };
    }
    setSortConfig(newConfig);
    const orderModifier = newConfig.direction === `asc` ? 1 : -1;
    setTasks((prevTasks) =>
      prevTasks.slice().sort((a, b) => {
        if (!newConfig.key) return 0;
        if (newConfig.key === `isDone`)
          return (Number(a.isDone) - Number(b.isDone)) * orderModifier;
        const valueA = String(a[newConfig.key]);
        const valueB = String(b[newConfig.key]);
        return valueA.localeCompare(valueB) * orderModifier;
      })
    );
  }

  return (
    <AppThemeProvider>
      <DesktopOnlyGuard>
        <Box sx={getTaskManagerStyle}>
          <Box sx={adminPanel}>
            <LoginForm isAdmin={isAdmin} onSetIsAdmin={setIsAdmin} />
            <ThemeSwitcher />
          </Box>
          <Box sx={workArea}>
            <AddTaskForm onAddTask={addTask} />
            <TasksContainer
              isAdmin={isAdmin}
              tasks={tasks}
              onToggleTaskDone={toggleTaskDone}
              onDeleteTask={deleteTask}
              onEditText={editText}
              handleSortTasks={sortTasksHandler}
              sortConfig={sortConfig}
            />
          </Box>
        </Box>
      </DesktopOnlyGuard>
    </AppThemeProvider>
  );
}
