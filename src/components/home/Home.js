import React, { useState, useEffect } from 'react';
import sinfulMath from 'sinful-math.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import Totals from './Totals';
import Accounts from './Accounts';

import { useNavigate } from 'react-router-dom';
import { userGlobalData } from '../../services/userService';

const add = sinfulMath.add;

export default function Home(props) {

  const loggedIn = props.security.loggedIn;
  const hashedId = props.security.hashedId;
  const id = props.security.id;
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [totals, setTotals] = useState([{name: 'Income', amount: 0}, {name: 'Outcome', amount: 0}, {name: 'Total', amount: 0}]);
  const [accounts, setAccounts] = useState([{account: 'Cash', amount: 0}]);

  useEffect(() => {
    if(!loggedIn || !hashedId || !id) {
      return navigate('/login');
    } else {
      userGlobalData(loggedIn, hashedId, id).then((response) => {
        if (response.status === 200 && response.data) {
          if (response.data.movements) {
            const monthArr = Object.keys(response.data.movements);
            const monthData = [];
            let totalIncome = 0;
            let totalOutcome = 0;
            let total = 0;
  
            for (let m in monthArr) {
              let income = response.data.movements[monthArr[m]].income;
              let outcome = response.data.movements[monthArr[m]].outcome;
              let dif = add(income, -outcome);

              totalIncome = add(totalIncome, income);
              totalOutcome = add(totalOutcome, outcome);
              total = add(total, dif);

              let month = {
                month: monthArr[m],
                income: income,
                outcome: outcome,
                total: dif
              }
  
              monthData.unshift(month);
            }

            let dataTotals = [{name: 'Income', amount: totalIncome}, {name: 'Outcome', amount: totalOutcome}, {name: 'Total', amount: total}];

            setData(monthData);
            setTotals(dataTotals);
          }

          if (response.data.accounts) {
            const accArr = Object.keys(response.data.accounts);
            const accData = [];

            for (let a in accArr) {
              let acc = {
                account: accArr[a],
                amount: response.data.accounts[accArr[a]]
              }

              accData.push(acc);
            }

            setAccounts(accData);
          }

        } else {
          throw new Error(`[Error Obtaining User Info] ${response.data}`)
        }
      }).catch((error) => console.error(`[USER INFO] ${error}`))
    }
  }, [loggedIn, hashedId, id, navigate]);

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={8}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '50vh',
            }}
          >
            <Chart data={data} />
          </Paper>
        </Grid>
        {/* Totals */}
        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '50vh',
              pl: 5
            }}
          >
            <Totals totals={totals} />
          </Paper>
        </Grid>
        {/* Accounts */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Accounts accounts={accounts} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}