import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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

export const ProfileMenu = () => {

  const loggedIn = useSessionStorage('sessionJWTToken');
  const hashedId = useSessionStorage('sessionId');
  const { id } = useParams()
  const navigate = useNavigate();
  let cardId = id.replace(/\D+/g, "").match(/.{1,4}/g).join(' ').substring(0, 19);

  const [user, setUser] = useState({name: 'John', lastname: 'Doe', dob: '16/03'});
  console.log(hashedId)

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
  
  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Paper elevation={3} sx={{backgroundColor: "aqua", p: 3, height: 170, borderRadius: 5, marginBottom: 4}}>
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
      <Grid container sx={{ maxWidth: 300, p: 1, gap: 3}} direction="column" alignItems="flex-start">
        <Grid item>
          <Button sx={{gap: 1}}>
            <HomeIcon />
            Home
          </Button>
        </Grid>
        <Grid item>
          <Button sx={{gap: 1}}>
            <DashboardIcon />
            Details
          </Button>
        </Grid>
        <Grid item>
          <Button sx={{gap: 1}}>
            <ReorderIcon />
            Movements
          </Button>
        </Grid>
        <Grid item>
          <Button sx={{gap: 1}}>
            <SettingsIcon />
            Configuration
          </Button>
        </Grid>
        <Grid item>
          <Button sx={{gap: 1}}>
            <LogoutIcon />
            Log Out
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}