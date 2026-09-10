import { useState, useRef } from 'react';

import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface ErrorsType {
  text: boolean;
  name: boolean;
  email: boolean;
}

export interface InputValuesType {
  text: string;
  name: string;
  email: string;
}

interface AddTaskFormProps {
  onAddTask: (inputValuesObject: InputValuesType) => void;
}

const textFieldSlotProps = {
  formHelperText: { sx: { position: 'absolute', bottom: `-18px` } },
};

export function AddTaskForm(props: AddTaskFormProps) {
  const { onAddTask } = props;

  const [inputValues, setInputValues] = useState<InputValuesType>({
    text: ``,
    name: ``,
    email: ``,
  });
  const [errors, setErrors] = useState<ErrorsType>({
    text: false,
    name: false,
    email: false,
  });

  const textInputElement = useRef<HTMLInputElement>(null);

  function handleAddTask() {
    const newErrorState: ErrorsType = { ...errors };
    const inputValuesArr = Object.entries(inputValues);
    for (const [key, value] of inputValuesArr as [
      keyof InputValuesType,
      string,
    ][]) {
      const isInvalid = value.trim() === ``;
      newErrorState[key] = isInvalid;
    }
    setErrors(newErrorState);
    if (Object.values(newErrorState).includes(true)) return;
    onAddTask(inputValues);
    setInputValues({ text: ``, name: ``, email: `` });
    textInputElement.current?.focus();
  }

  function handleChange(fieldName: keyof InputValuesType, value: string) {
    setInputValues((prev) => ({ ...prev, [fieldName]: value }));
    setErrors((prev) => ({ ...prev, [fieldName]: false }));
  }

  return (
    <Paper sx={{ p: 2, width: `fit-content` }}>
      <Stack
        sx={{ flexDirection: `row`, alignItems: `center`, gap: 2, mb: `2px` }}
      >
        <TextField
          value={inputValues.text}
          onChange={(e) => handleChange(`text`, e.target.value)}
          id="text"
          label="Text"
          variant="standard"
          error={errors.text}
          helperText={errors.text ? `Text is required` : ` `}
          inputRef={textInputElement}
          slotProps={textFieldSlotProps}
        />
        <TextField
          value={inputValues.name}
          onChange={(e) => handleChange(`name`, e.target.value)}
          id="name"
          label="Name"
          variant="standard"
          error={errors.name}
          helperText={errors.name ? `Name is required` : ` `}
          slotProps={textFieldSlotProps}
        />
        <TextField
          value={inputValues.email}
          onChange={(e) => handleChange(`email`, e.target.value)}
          id="email"
          label="Email"
          variant="standard"
          error={errors.email}
          helperText={errors.email ? `Email is required` : ` `}
          slotProps={textFieldSlotProps}
        />
        <Button onClick={handleAddTask} variant="contained">
          ADD
        </Button>
      </Stack>
    </Paper>
  );
}
