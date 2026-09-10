import { useAppTheme, type ModeType } from '../ThemeContext';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export function ThemeSwitcher() {
  const { mode, setMode } = useAppTheme();

  function getButtonStyle(targetMode: ModeType) {
    return {
      flexGrow: 1,
      bgcolor: mode === targetMode ? 'primary.dark' : 'primary.main',
      '&:hover': {
        bgcolor: 'primary.dark',
      },
    };
  }

  return (
    <Paper sx={{ mt: 2, p: 2, width: 200 }}>
      <ButtonGroup variant="contained" sx={{ display: 'flex' }}>
        <Button sx={getButtonStyle(`light`)} onClick={() => setMode('light')}>
          <LightModeIcon />
        </Button>
        <Button sx={getButtonStyle(`system`)} onClick={() => setMode('system')}>
          <SettingsBrightnessIcon />
        </Button>
        <Button sx={getButtonStyle(`dark`)} onClick={() => setMode('dark')}>
          <DarkModeIcon />
        </Button>
      </ButtonGroup>
    </Paper>
  );
}
