import React, { useEffect, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ProfileMenu } from './Profile';
import { Copyright } from '../copyright/CopyRight';
import Home from './pages/home/Home';
import Movements from './pages/movements/Movements';
import Configuration from './pages/configuration/Configuration';
import Details from './pages/details/Details';

import { useNavigate, useParams } from "react-router-dom";

import { useSessionStorage } from '../../hooks/useSessionStorage';

const drawerWidth = 400;

// TODO: Change this:
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const mdTheme = createTheme();

function DashboardContent() {

  const loggedIn = useSessionStorage('sessionJWTToken');
  const hashedId = useSessionStorage('sessionId');
  const { id } = useParams();
  const navigate = useNavigate();

  const security = {
    loggedIn,
    hashedId,
    id
  };
  
  useEffect(() => {
    if(!loggedIn || !hashedId || !id) {
      return navigate('/login');
    } 
  }, [loggedIn, hashedId, id, navigate]);
  
  const [main, setMain] = useState(<Home security={security}/>)

  const handleClick = (event) => {
    switch (event){
      case 'home':
        setMain(<Home security={security}/>);
        break;
      case 'details':
        setMain(<Details security={security}/>);
        break;
      case 'movements':
        setMain(<Movements security={security}/>);
        break;
      case 'configuration':
        setMain(<Configuration security={security}/>);
        break;
      default:
        setMain(<Home security={security}/>);
        break;
    }
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Be Conscious Finance App
            </Typography>
            {/* TODO: change to black mode toggle */}
            <IconButton color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ minWidth: 350}} >
          <Toolbar />
          <ProfileMenu clickHandler={handleClick}/>
        </Box>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="false" sx={{ mt: 4, mb: 4 }}>
            {main}
          </Container>
          <Copyright />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}