import React, {useState, useEffect} from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {es} from 'dayjs/locale/es';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useSessionStorage } from '../../../../hooks/useSessionStorage';
import { useNavigate, useParams } from "react-router-dom";

import { userInfo, updateInfo } from '../../../../services/userService';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const registerSchema = Yup.object().shape(
  {
    name: Yup.string(),
    lastname: Yup.string(),
    dob: Yup.date()
  }
);

export default function Settings(props) {

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [dob, setDob] = useState('');
  const [accounts, setAccounts] = useState();
  const [categories, setCategories] = useState();
  const [subcategories, setSubcategories] = useState();
  
  const loggedIn = useSessionStorage('sessionJWTToken');
  const hashedId = useSessionStorage('sessionId');
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!loggedIn || !hashedId || !id) {
      return navigate('/login');
    } else {
      userInfo(loggedIn, hashedId, id).then((response) => {
        if (response.status === 200 && response.data) {
          let newDate = new Date(response.data.dob);
          let day = newDate.getDate().toString().length === 2 ? newDate.getDate() : `0${newDate.getDate()}`;
          let month = newDate.getMonth() + 1;
          let newMonth = month.toString().length === 2 ? month : `0${month}`;
          let year = newDate.getFullYear();
          let date = `${year}-${newMonth}-${day}`;

          setName(response.data.name);
          setLastname(response.data.lastname);
          setDob(date);
        } else {
          throw new Error(`[Error Obtaining User Info] ${response.data}`)
        }
      }).catch((error) => console.error(`[USER INFO] ${error}`))
    }
  }, [loggedIn, hashedId, id, navigate]);

  const handleSubmit = (values) => {
    updateInfo(values.name, values.lastname, values.dob).then((response) => {
      if (response.status === 200) {
        console.log('User registered correctly');
        console.log(response.data);
        alert('User registered correctly');
      } else {
        throw new Error('Error in registry');
      }
    }).catch((error) => {
      console.error(`[REGISTER ERROR]: ${error}`);
      alert(error.response.data.error);
    })
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    if (e.target.name === 'name') {
      setName(input);
    };
    if (e.target.name === 'lastname'){
      setLastname(input);
    };
    if (e.target.name === 'dob'){
      setDob(input);
    };
  }

  console.log(dob)

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
        <Grid item id='profile' sx={{m: 2}}>
          <Typography variant='h5'>
            My Profile
          </Typography>
          <Box component="form" noValidate onSubmit={() => console.log('actualizado')} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              size='small'
              fullWidth
              id="name"
              label="Name"
              InputLabelProps={{shrink: true}}
              name="name"
              value={name}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              size='small'
              fullWidth
              id="lastname"
              label="Lastname"
              InputLabelProps={{shrink: true}}
              name="lastname"
              value={lastname}
              onChange={handleInputChange}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'es'}>
              <DesktopDatePicker
                label="Birthday"
                value={dob}
                onChange={(newValue) => {
                  setDob(newValue);
                }}
                renderInput={(params) => <TextField {...params} margin='normal' size='small' InputLabelProps={{shrink: true}}/>}
              />
            </LocalizationProvider>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save Changes
            </Button>
          </Box>
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