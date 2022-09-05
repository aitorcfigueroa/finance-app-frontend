import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReorderIcon from '@mui/icons-material/Reorder';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import { useNavigate, useParams } from "react-router-dom";

import { useSessionStorage } from '../../hooks/useSessionStorage';
import { userInfo } from '../../services/userService';

export const ProfileMenu = (props) => {

  const loggedIn = useSessionStorage('sessionJWTToken');
  const hashedId = useSessionStorage('sessionId');
  const { id } = useParams();
  const navigate = useNavigate();
  let cardId = id.replace(/\D+/g, "").match(/.{1,4}/g).join(' ').substring(0, 19);
  const fullWidthButton = {pl: 2, gap: 3, width: '100%', justifyContent:'flex-start'};

  const [user, setUser] = useState({name: 'John', lastname: 'Doe', dob: '16/03'});

  useEffect(() => {
    if(!loggedIn || !hashedId || !id) {
      return navigate('/login');
    } else {
      userInfo(loggedIn, hashedId, id).then((response) => {
        if (response.status === 200 && response.data) {
          let date = new Date(response.data.dob).getDate();
          let month = new Date(response.data.dob).getMonth();

          let userInfo = {
            name: response.data.name,
            lastname: response.data.lastname,
            dob: date + '/' + month
          }
          
          setUser(userInfo);
        } else {
          throw new Error(`[Error Obtaining User Info] ${response.data}`)
        }
      }).catch((error) => console.error(`[USER INFO] ${error}`))
    }
  }, [loggedIn, hashedId, id, navigate]);
  
  const handleLogout = () => {
    if (window.sessionStorage) {
      sessionStorage.removeItem('sessionJWTToken');
      sessionStorage.removeItem('sessionId');
    } else {
      throw new Error('Error deleting session storage');
    }

    navigate('/login');
  }

  return (
    <Box
      sx={{
        my: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 300
      }}
    >
      <Paper elevation={3} sx={{backgroundColor: "aqua", p: 3, height: 180, borderRadius: 5, marginBottom: 4, maxWidth: 300}}>
        <Grid 
          container 
          sx={{height: "100%"}} 
          direction="column" 
          justifyContent="flex-end"
        >
          <Grid container item sx={{px:1, gap: 1}}>
            <Grid item>
              <Typography>
                {cardId}
              </Typography>
            </Grid>
            <Grid item container justifyContent="space-between">
              <Grid item>
                <Typography>
                  {user.name + ' ' + user.lastname}
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  {user.dob}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Divider sx={{ my: 1 }} />
      <Grid container sx={{ maxWidth: 300, p: 1, gap:0}} direction="column" alignItems="flex-start">
        <Button sx={fullWidthButton} onClick={() => props.clickHandler('home')}>
          <HomeIcon />
          <h3>Home</h3>
        </Button>
        <Button sx={fullWidthButton} onClick={() => props.clickHandler('details')}>
          <DashboardIcon />
          <h3>Details</h3>
        </Button>
        <Button sx={fullWidthButton} onClick={() => props.clickHandler('movements')}>
          <ReorderIcon />
          <h3>Movements</h3>
        </Button>
        <Button sx={fullWidthButton} onClick={() => props.clickHandler('configuration')}>
          <SettingsIcon />
          <h3>Configuration</h3>
        </Button>
        <Button sx={fullWidthButton} color='error' onClick={handleLogout}>
          <LogoutIcon />
          <h3>Log Out</h3>
        </Button>
      </Grid>
    </Box>
  )
}