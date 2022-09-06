import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export default function Settings() {

  const [accounts, setAccounts] = useState();
  const [categories, setCategories] = useState();
  const [subcategories, setSubcategories] = useState();

  

  return (
    <Box sx={{
      my: 8,
      mx: 4,
      display: 'flex',
      backgroundColor: 'white'
      }}
    >
      <Grid container xs={2}>
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
        <Grid item id='profile' sx={{m: 2}}>
          <Typography variant='h5'>
            My Profile
          </Typography>
        </Grid>
        <Divider sx={{ my: 1, mr: 5 }} />
        <Grid item id='account' sx={{m: 2}}>
          <Typography variant='h5'>
            My Account
          </Typography>
        </Grid>
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