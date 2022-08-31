import React, { useState, useEffect } from 'react';
import sinfulMath from 'sinful-math.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import Totals from './Totals';
import Accounts from './Accounts';

import { useNavigate } from 'react-router-dom';
import { userGlobalData } from '../../services/userService';
import { InputLabel, Typography } from '@mui/material';

const add = sinfulMath.add;

export default function Movements(props) {

  const loggedIn = props.security.loggedIn;
  const hashedId = props.security.hashedId;
  const id = props.security.id;
  const navigate = useNavigate();

  const [year, setYear] = useState(new Date().getFullYear())

  const years = [];
  for (let i = 2020; i < year; i++) {
    years.unshift(i);
  }

  const listYears = years.map((value) =>
    <MenuItem value={value}>{value}</MenuItem>
  ); 

  return (
    <Box>
      <Grid container>
        <Grid item container>
          <Grid item>
            <InputLabel id="year">Year</InputLabel>
            <Select 
              labelId="year"
              value={year}
              label='Age'
              onChange={handleChange}
            >
              {listYears}
            </Select>
          </Grid>
          <Grid item>
            <Typography>Month</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}