import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { userInfo, updateInfo } from "../../../../services/userService";

export default function ProfileSettings(props) {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [dob, setDob] = useState('');

  const {loggedIn, hashedId, id} = props.security;

  useEffect(() => {
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
  }, [loggedIn, hashedId, id]);
  

  //TODO: Implement Sumit event.
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
  }

  return (
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
        {/* <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'es'}>
          <DesktopDatePicker
            label="Birthday"
            value={dob}
            onChange={(newValue) => {
              setDob(newValue);
            }}
            renderInput={(params) => <TextField {...params} margin='normal' size='small' InputLabelProps={{shrink: true}}/>}
          />
        </LocalizationProvider> */}
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
  )
}