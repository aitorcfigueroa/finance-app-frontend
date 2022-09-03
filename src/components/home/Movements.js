import React, { useState, useEffect } from 'react';
import sinfulMath from 'sinful-math.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import Totals from './Totals';
import Accounts from './Accounts';

import { useNavigate } from 'react-router-dom';
import { userGlobalData } from '../../services/userService';
import { InputLabel, OutlinedInput, Typography } from '@mui/material';

const add = sinfulMath.add;

export default function Movements(props) {

  const loggedIn = props.security.loggedIn;
  const hashedId = props.security.hashedId;
  const id = props.security.id;
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const navigate = useNavigate();

  const year = new Date().getFullYear();
  const month = months[new Date().getMonth()];

  const [date, setDate] = useState({
    year,
    month
  });

  const years = [];
  for (let i = 2020; i <= year; i++) {
    years.unshift(i);
  };

  const listMonths = months.map((value) => 
    <MenuItem value={value}>{value}</MenuItem>
  );

  const listYears = years.map((value) =>
    <MenuItem value={value}>{value}</MenuItem>
  );

  const handleChange = (event) => {
    const {name, value} = event.target;
    setDate((prevState) => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  return (
    <Box sx={{
      my: 8,
      mx: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Grid container  sx={{marginTop: 2, backgroundColor: 'white', minHeight: '60vh'}}>
        <Grid item  sx={{border: 'solid blue', width: '100%'}} >
          <Grid container justifyContent={'space-evenly'} sx={{mt: 2}}>
            <FormControl sx={{m: 2, minWidth: 90}}>
              <InputLabel id="year">Year</InputLabel>
              <Select 
                name='year'
                labelId='year'
                label='Year'
                value={date.year}
                onChange={handleChange}
              >
                {listYears}
              </Select>
            </FormControl>
            <FormControl sx={{m: 2, minWidth: 140}}>
              <InputLabel id="month">Month</InputLabel>
              <Select 
                name='month'
                labelId='month'
                label='Month'
                value={date.month}
                onChange={handleChange}
              >
                {listMonths}
              </Select>
            </FormControl>
          </Grid>
          <Grid container sx={{justifyContent:'space-evenly', alignItems:'center', mt: 2}} >
            <Grid item xs={0.5}>
              <Typography component='h1' variant='h5'>Add</Typography>
            </Grid>
            <Grid item xs={0.65}>   
              <TextField
                id="day"
                label="Day"
                name="day"
                autoFocus
                // value={formik.values.email}
                // onChange={formik.handleChange}
                // error={formik.touched.email && Boolean(formik.errors.name)}
                // helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                xs={8}
                name="description"
                label="Description"
                id="description"
                // value={formik.values.password}
                // onChange={formik.handleChange}
                // error={formik.touched.password && Boolean(formik.errors.password)}
                // helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item>
              <FormControl xs={2}>
                <InputLabel id="category">Category</InputLabel>
                <Select 
                  name='category'
                  labelId='category'
                  label='Category'
                  value={date.month}
                  onChange={handleChange}
                >
                  {listMonths}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl xs={2}>
                <InputLabel id="subcategory">Subcategory</InputLabel>
                <Select 
                  name='subcategory'
                  labelId='subcategory'
                  label='Subcategory'
                  value={date.month}
                  onChange={handleChange}
                >
                  {listMonths}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl xs={2}>
                <InputLabel id="account">Account</InputLabel>
                <Select 
                  name='account'
                  labelId='account'
                  label='Account'
                  value={date.month}
                  onChange={handleChange}
                >
                  {listMonths}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1.3}>   
              <FormControl>
                <InputLabel id='amount'>Amount</InputLabel>
                <OutlinedInput
                  id="amount"
                  label="Amount"
                  name="amount"
                  endAdornment={<InputAdornment position='end'>€</InputAdornment>}
                />
              </FormControl>
            </Grid>
            <Grid item xs={1}>
              <FormControlLabel
                control={<Checkbox value="transfer" color="primary" />}
                label="Transfer"
                labelPlacement='top'
              />
            </Grid>
            <Grid item xs={0.5}>
              <IconButton
                type="submit"
                variant="contained"
              >
                <AddBoxIcon />  
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}