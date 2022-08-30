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
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ProfileMenu } from './profile';
import { Copyright } from '../copyright/CopyRight';
import Chart from './Chart';
import Totals from './Totals';
import Accounts from './Accounts';

import { useNavigate, useParams } from "react-router-dom";

import { useSessionStorage } from '../../hooks/useSessionStorage';
import { userGlobalData } from '../../services/userService';

import sinfulMath from 'sinful-math.js';

const add = sinfulMath.add;

const drawerWidth = 400;

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
            console.log(response.data.accounts)
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

  console.log(accounts);

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
              Be Constious Finance App
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ width: 600}} >
          <Toolbar />
          <ProfileMenu />
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