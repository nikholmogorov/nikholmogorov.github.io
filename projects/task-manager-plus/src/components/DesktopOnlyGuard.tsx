import React from 'react';
import { LIGHT_GRADIENT, DARK_GRADIENT } from '../constants';

import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

interface DesktopOnlyGuardProps {
  children: React.ReactNode;
}

export function DesktopOnlyGuard({ children }: DesktopOnlyGuardProps) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const theme = useTheme();

  if (!isDesktop) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100dvh',
          background:
            theme.palette.mode === `dark` ? DARK_GRADIENT : LIGHT_GRADIENT,
          color: theme.palette.text.primary,
        }}
      >
        <Paper
          sx={{
            p: 2,
            width: `fit-content`,
          }}
        >
          <Typography variant="h5" component="h1">
            Mobiles not supported.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return <>{children}</>;
}
