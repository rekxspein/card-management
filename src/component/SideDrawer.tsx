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
import { Link, useLocation } from 'react-router-dom';
import { RouterLink } from './RouterLink';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useUiState } from '../store/ui.state';
import { useActiveAirline } from '../store/activeAirline';
import { AIRLINES } from '../constant';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200
    }
  }
};

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
  const activeAirline = useActiveAirline(e => e.activeAirline);
  const setActiveAirline = useActiveAirline(e => e.setActiveAirline);
  const handleChange = (event: SelectChangeEvent<typeof activeAirline>) => {
    const {
      target: { value }
    } = event;
    if (typeof value !== 'string') {
      setActiveAirline(value);
    }
  };

  return (
    <>
      <Drawer width={ui.drawerWidth} open={ui.drawerOpen} variant="permanent">
        <DrawerHeader>
          <Link
            to={'/'}
            style={{
              color: 'white',
              textDecoration: 'none'
            }}
          >
            <Typography
              sx={{ flexGrow: 1, textAlign: 'center' }}
              fontWeight={500}
              fontSize={16}
            >
              CARD MANAGEMENT
            </Typography>
          </Link>
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
            labelId="multiple-airline-chip-label"
            id="multiple-airline-id-chip"
            multiple
            value={activeAirline}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={selected => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map(value => (
                  <Chip
                    key={value}
                    label={AIRLINES[value as keyof typeof AIRLINES]}
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {Object.entries(AIRLINES).map(([key, name]) => (
              <MenuItem
                key={key}
                value={key}
                style={getStyles(name, activeAirline, theme)}
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
              <Tooltip title="Transactions" placement="right">
                <IconButton>
                  <Icon>account_balance</Icon>
                </IconButton>
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Transactions" />
          </ListItemButton>

          <ListItemButton
            href="/crew-transactions/"
            selected={location.pathname.startsWith('/crew-transactions')}
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
            href="/declined-cards/"
            selected={location.pathname.startsWith('/declined-cards')}
            component={RouterLink}
          >
            <ListItemIcon>
              <Tooltip title="Declined Cards" placement="right">
                <IconButton>
                  <Icon>unpublished</Icon>
                </IconButton>
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Declined Cards" />
          </ListItemButton>

          <ListItemButton
            href="/grey-cards/"
            selected={location.pathname === '/grey-cards/'}
            component={RouterLink}
          >
            <ListItemIcon>
              <Tooltip title="Grey Cards" placement="right">
                <IconButton>
                  <Icon>block</Icon>
                </IconButton>
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Grey Cards" />
          </ListItemButton>

          <ListItemButton
            href="/grey-cards-history/"
            selected={location.pathname === '/grey-cards-history/'}
            component={RouterLink}
          >
            <ListItemIcon>
              <Tooltip title="Grey Cards" placement="right">
                <IconButton>
                  <Icon>history</Icon>
                </IconButton>
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary="Grey Cards History" />
          </ListItemButton>

          <ListItemButton
            href="/csv-upload/"
            selected={location.pathname.startsWith('/csv-upload/')}
            component={RouterLink}
          >
            <ListItemIcon>
              <Tooltip title="CSV Upload" placement="right">
                <IconButton>
                  <Icon>upload_file</Icon>
                </IconButton>
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary="CSV Upload" />
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
