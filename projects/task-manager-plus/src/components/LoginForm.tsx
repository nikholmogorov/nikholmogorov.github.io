import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface LoginFormProps {
  isAdmin: boolean;
  onSetIsAdmin: (value: boolean) => void;
}

const textFieldSlotProps = {
  formHelperText: { sx: { position: 'absolute', bottom: `-18px` } },
};

export function LoginForm(props: LoginFormProps) {
  const { isAdmin, onSetIsAdmin } = props;

  const [login, setLogin] = useState<string>(``);
  const [password, setPassword] = useState<string>(``);
  const [hasError, setHasError] = useState<boolean>(false);

  function getAdminAccess() {
    onSetIsAdmin(true);
    setLogin(``);
    setPassword(``);
  }

  function validateLoginForm() {
    if (login === `admin` && password === `admin`) {
      getAdminAccess();
      return;
    }
    setHasError(true);
  }

  return (
    <Paper sx={{ p: 2, width: 200 }}>
      <Stack sx={{ alignItems: `center`, gap: 2 }}>
        {isAdmin ? (
          <>
            <Typography variant="body1">Welcome back, admin!</Typography>
            <Button
              onClick={() => onSetIsAdmin(false)}
              variant="contained"
              fullWidth
            >
              LOGOUT
            </Button>
          </>
        ) : (
          <>
            <TextField
              sx={{ position: 'relative' }}
              slotProps={textFieldSlotProps}
              value={login}
              onChange={(e) => {
                setLogin(e.target.value);
                setHasError(false);
              }}
              id="login"
              label="Login"
              variant="standard"
              error={hasError}
              helperText={hasError ? `Invalid credentials` : ``}
            />
            <TextField
              sx={{ position: 'relative' }}
              slotProps={textFieldSlotProps}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setHasError(false);
              }}
              id="password"
              label="Password"
              variant="standard"
              type="password"
              autoComplete="current-password"
              error={hasError}
              helperText={hasError ? `Invalid credentials` : ``}
            />
            <Button onClick={validateLoginForm} variant="contained" fullWidth>
              SIGN IN
            </Button>
          </>
        )}
      </Stack>
    </Paper>
  );
}
