import { styled } from '@mui/material/styles';
import {
  AppBar as MuiAppBar,
  AppBarProps,
  IconButton,
  Toolbar,
  Typography,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { FC } from 'react';
import { useUiState } from '../store/ui.state';
import { Link, useLocation } from 'react-router-dom';

export const TopBar: FC = () => {
  const ui = useUiState();
  const route = useLocation();

  return (
    <AppBar position="sticky" open={ui.drawerOpen} drawerWidth={ui.drawerWidth}>
      <Toolbar>
        <IconButton
          id="appbar-sidedrawer-toggle-btn"
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={{
            marginRight: 5,
            ...(ui.drawerOpen && { display: 'none' })
          }}
          onClick={() => ui.setDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <Box>
          <Link
            to="/"
            style={{
              color: 'white',
              textDecoration: 'none'
            }}
          >
            {route.pathname === '/' && (
              <Typography variant="h6" noWrap component="div">
                Transaction List
              </Typography>
            )}
            {route.pathname === '/crews/' && (
              <Typography variant="h6" noWrap component="div">
                Crew List
              </Typography>
            )}
            {route.pathname === '/rejected-card-list/' && (
              <Typography variant="h6" noWrap component="div">
                Rejected Card List
              </Typography>
            )}
          </Link>
        </Box>

        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => !['open', 'drawerWidth'].includes(prop as any)
})<AppBarProps & { open?: boolean; drawerWidth: number }>(
  ({ theme, open, drawerWidth }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    })
  })
);
