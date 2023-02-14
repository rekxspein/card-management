import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
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
  Tooltip,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { useUiState } from '../store/ui.state';
import { RouterLink } from './RouterLink';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
const names = ['Air Asia', 'Go Fast', 'Go Air'];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export const SideDrawer: FC = () => {
  const ui = useUiState();
  const location = useLocation();

  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value }
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <>
      <Drawer width={ui.drawerWidth} open={ui.drawerOpen} variant="permanent">
        <DrawerHeader>
          <Typography
            sx={{ flexGrow: 1, textAlign: 'center' }}
            fontWeight={500}
            fontSize={16}
          >
            CARD MANAGEMENT
          </Typography>
          <IconButton
            id="sidebar-sidedrawer-toggle-btn"
            onClick={() => ui.setDrawerOpen(false)}
          >
            <MenuIcon />
          </IconButton>
        </DrawerHeader>
        <FormControl
          sx={{
            m: 1,
            ...(!ui.drawerOpen && { display: 'none' })
          }}
        >
          <InputLabel id="demo-multiple-chip-label">Airlines</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={selected => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map(value => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {names.map(name => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
              <Tooltip title="Crew Transactions" placement="right">
                <IconButton>
                  <Icon>people_alt</Icon>
                </IconButton>
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Crew Transactions" />
          </ListItemButton>

          <ListItemButton
            href="/rejected-card-list/"
            selected={location.pathname.startsWith('/rejected-card-list')}
            component={RouterLink}
          >
            <ListItemIcon>
              <Tooltip title="Rejected Card List" placement="right">
                <IconButton>
                  <Icon>unpublished</Icon>
                </IconButton>
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Declined Card List" />
          </ListItemButton>

          <ListItemButton
            href="/grey-card-list/"
            selected={location.pathname.startsWith('/grey-card-list')}
            component={RouterLink}
          >
            <ListItemIcon>
              <Tooltip title="Grey List" placement="right">
                <IconButton>
                  <Icon>block</Icon>
                </IconButton>
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Grey List" />
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
