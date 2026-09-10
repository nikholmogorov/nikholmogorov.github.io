import { type TaskType } from '../App';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

interface TaskProps {
  task: TaskType;
  isAdmin: boolean;
  onToggleTaskDone: (idValue: string, isDoneValue: boolean) => void;
  onDeleteTask: (idValue: string) => void;
  onEditText: (idValue: string, newTextValue: string) => void;
}

const label = { slotProps: { input: { 'aria-label': 'Checkbox done task' } } };

export function Task(props: TaskProps) {
  const { task, isAdmin, onToggleTaskDone, onDeleteTask, onEditText } = props;

  return (
    <Stack sx={{ flexDirection: `row`, alignItems: `center`, gap: 2 }}>
      <Checkbox
        {...label}
        checked={task.isDone}
        onChange={() => onToggleTaskDone(task.id, task.isDone)}
        disabled={!isAdmin}
      />
      <Typography
        sx={{
          borderRadius: 1,
          p: `3px`,
          border: () => {
            if (isAdmin) return 1;
          },
        }}
        variant="body1"
        contentEditable={isAdmin}
        onBlur={(e) => onEditText(task.id, e.currentTarget.textContent)}
        suppressContentEditableWarning={true}
        spellCheck={false}
      >
        {task.text}
      </Typography>
      <Typography variant="body1">{task.name}</Typography>
      <Typography variant="body1">{task.email}</Typography>
      {isAdmin && (
        <IconButton onClick={() => onDeleteTask(task.id)} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      )}
      {task.isEdited && (
        <Tooltip title="Edited by admin" arrow>
          <EditIcon />
        </Tooltip>
      )}
    </Stack>
  );
}
