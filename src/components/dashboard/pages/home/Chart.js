import React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts';

export default function Chart(props) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <h2><center>Last 12 Months Movements</center></h2> {/*TODO: Title on primary color */}
      <ResponsiveContainer>
        <LineChart
          data={props.data}
          margin={{
            top: 16,
            right: 24,
            bottom: 0,
            left: 10,
          }}
        >
          <XAxis
            dataKey="month"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
            padding={{left: 30, right: 30}}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <Tooltip />
          <Legend />
          {/* TODO: Try to do the lines bigger */}
          <Line 
            type="monotone"
            dataKey="income"
            stroke={theme.palette.primary.main}
          />
          <Line 
            type="monotone"
            dataKey="outcome"
            stroke={theme.palette.secondary.main}
          />
          <Line 
            type="monotone"
            dataKey="total"
            stroke={theme.palette.secondary.main}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}