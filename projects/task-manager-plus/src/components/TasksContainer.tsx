import { useState } from 'react';
import { type TaskType } from '../App';
import { type SortConfigType } from '../App';
import { Task } from '../components/Task';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

interface TasksContainerProps {
  tasks: TaskType[];
  isAdmin: boolean;
  sortConfig: SortConfigType;
  onToggleTaskDone: (idValue: string, isDoneValue: boolean) => void;
  onDeleteTask: (idValue: string) => void;
  onEditText: (idValue: string, newTextValue: string) => void;
  handleSortTasks: (sortByValue: SortConfigType[`key`]) => void;
}

export function TasksContainer(props: TasksContainerProps) {
  const {
    tasks,
    isAdmin,
    sortConfig,
    onToggleTaskDone,
    onDeleteTask,
    onEditText,
    handleSortTasks,
  } = props;

  const [page, setPage] = useState<number>(1);

  const handleChange = (
    _e: React.ChangeEvent<unknown, Element>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const tasksPerPage = 10;
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const tasksList = tasks
    .slice((page - 1) * tasksPerPage, page * tasksPerPage)
    .map((task) => (
      <ListItem key={task.id}>
        <Task
          task={task}
          isAdmin={isAdmin}
          onToggleTaskDone={onToggleTaskDone}
          onDeleteTask={onDeleteTask}
          onEditText={onEditText}
        />
      </ListItem>
    ));

  function getSortIcon(sortKey: string) {
    if (sortConfig.key !== sortKey) return <HorizontalRuleIcon />;
    return sortConfig.direction === `asc` ? (
      <ArrowDownwardIcon />
    ) : (
      <ArrowUpwardIcon />
    );
  }

  return (
    <Paper sx={{ p: 2, width: `fit-content` }}>
      <Stack sx={{ flexDirection: `column`, alignItems: `center`, gap: 2 }}>
        {tasks.length === 0 ? (
          <>
            <Typography variant="body1">There are no tasks!</Typography>
          </>
        ) : (
          <>
            <Box sx={{ display: `flex`, gap: `2rem` }}>
              <Button
                variant="contained"
                onClick={() => handleSortTasks(`isDone`)}
                endIcon={getSortIcon(`isDone`)}
              >
                DONE
              </Button>
              <Button
                variant="contained"
                onClick={() => handleSortTasks(`text`)}
                endIcon={getSortIcon(`text`)}
              >
                TEXT
              </Button>
              <Button
                variant="contained"
                onClick={() => handleSortTasks(`name`)}
                endIcon={getSortIcon(`name`)}
              >
                NAME
              </Button>
              <Button
                variant="contained"
                onClick={() => handleSortTasks(`email`)}
                endIcon={getSortIcon(`email`)}
              >
                EMAIL
              </Button>
            </Box>
            <List>{tasksList}</List>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChange}
              showFirstButton
              showLastButton
            />
          </>
        )}
      </Stack>
    </Paper>
  );
}
