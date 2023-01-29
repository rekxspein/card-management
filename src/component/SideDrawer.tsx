import { CSSObject, styled, Theme } from '@mui/material/styles';
import {
  Box,
  Divider,
  Drawer as MuiDrawer,
  DrawerProps,
  Icon,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { useUiState } from '../store/ui.state';
import { RouterLink } from './RouterLink';

export const SideDrawer: FC = () => {
  const ui = useUiState();
  const location = useLocation();

  return (
    <>
      <Drawer width={ui.drawerWidth} open={ui.drawerOpen} variant="permanent">
        <DrawerHeader>
          <IconButton
            id="sidebar-sidedrawer-toggle-btn"
            onClick={() => ui.setDrawerOpen(false)}
          >
            <MenuIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItemButton
            href="/"
            selected={location.pathname === '/'}
            component={RouterLink}
          >
            <ListItemIcon>
              <Tooltip title="Transaction List" placement="right">
                <IconButton>
                  <Icon>account_balance</Icon>
                </IconButton>
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Transaction List" />
          </ListItemButton>

          <ListItemButton
            href="/crews/"
            selected={location.pathname.startsWith('/crews')}
            component={RouterLink}
          >
            <ListItemIcon>
              <Tooltip title="Crew List" placement="right">
                <IconButton>
                  <Icon>people_alt</Icon>
                </IconButton>
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Crew List" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => !['open', 'width'].includes(prop as any)
})<DrawerProps & { width: CSSObject['width'] }>(({ theme, open, width }) => ({
  width: width,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme, width),
    '& .MuiDrawer-paper': openedMixin(theme, width)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const openedMixin = (theme: Theme, width: CSSObject['width']): CSSObject => ({
  width,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: 0,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});
