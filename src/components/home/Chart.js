import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts';

import { useNavigate, useParams } from "react-router-dom";

import { useSessionStorage } from '../../hooks/useSessionStorage';
import { userGlobalData } from '../../services/userService';

export default function Chart() {
  const theme = useTheme();

  const loggedIn = useSessionStorage('sessionJWTToken');
  const hashedId = useSessionStorage('sessionId');
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState();

  useEffect(() => {
    if(!loggedIn || !hashedId || !id) {
      return navigate('/login');
    } else {
      userGlobalData(loggedIn, hashedId, id).then((response) => {
        if (response.status === 200 && response.data.movements) {
          const monthArr = Object.keys(response.data.movements);
          const monthData = [];

          for (let m in monthArr) {
            let income = response.data.movements[monthArr[m]].income;
            let outcome = response.data.movements[monthArr[m]].outcome;

            let month = {
              month: monthArr[m],
              income: income,
              outcome: outcome,
              total: income - outcome
            }

            monthData.unshift(month);
          }

          setData(monthData);
        } else {
          throw new Error(`[Error Obtaining User Info] ${response.data}`)
        }
      }).catch((error) => console.error(`[USER INFO] ${error}`))
    }
  }, [loggedIn, hashedId, id, navigate]);

  return (
    <React.Fragment>
      <h2><center>Last 12 Months Movements</center></h2>
      <ResponsiveContainer>
        <LineChart
          data={data}
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