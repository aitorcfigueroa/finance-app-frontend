import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import ProfileSettings from './ProfileSettings';
import AccountSettings from './AccountSettings';

export default function Settings(props) {

  return (
    <Box sx={{
      my: 8,
      mx: 4,
      display: 'flex',
      backgroundColor: 'white'
      }}
    >
      <Grid item container xs={2}>
        <Grid item container direction={'column'} sx={{height: '100%'}}>
          <Button size='large' sx={{width: '100%', justifyContent: 'flex-start'}}>
            Profile
          </Button>
          <Button size='large' sx={{width: '100%', justifyContent: 'flex-start'}}>
            Account
          </Button>
          <Button size='large' sx={{width: '100%', justifyContent: 'flex-start'}}>
            Appearance
          </Button>
        </Grid>
      </Grid>
      <Grid container direction={'column'} >
        <ProfileSettings security={props.security} />
        <Divider sx={{ my: 1, mr: 5 }} />
        <AccountSettings security={props.security} />
        <Divider sx={{ my: 1, mr: 5 }} />
        <Grid item id='appearance' sx={{m: 2}}>
          <Typography variant='h5'>
            My Appearance
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}