import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { PieChart, Pie, Cell } from 'recharts';


export default function Accounts(props) {
  const accounts = props.accounts;

  const listAccounts = accounts.map((value) =>
    <div key={value.account}>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {value.account}
      </Typography>
      <Typography component="p" variant="h4">
        {value.amount + ' €'}
      </Typography>
    </div>
  );

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <React.Fragment>
      <Box sx={{ width: 500 }}>
        <h2>Accounts</h2>
        <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-evenly', flex: 1, paddingLeft: '15px'}}>{listAccounts}</div>
      </Box>
      <Box height="100%" sx={{pr: 10}}>
        <PieChart width={400} height={250} >
          <Pie
            data={accounts}
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={60}
            fill="#8884d8"
            dataKey="amount"
            label
          >
            {accounts.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </Box>
    </React.Fragment>
  );
}