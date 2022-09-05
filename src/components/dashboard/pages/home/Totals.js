import React from 'react';
import Typography from '@mui/material/Typography';

export default function Totals(props) {
  const totals = props.totals;

  const listTotals = totals.map((value) =>
    <div key={value.name}>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {value.name}
      </Typography>
      <Typography component="p" variant="h4">
        {value.amount + ' €'}
      </Typography>
    </div>
  );

  return (
    <React.Fragment>
      <h2>Totals last months</h2>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', flex: 1, paddingLeft: '15px'}}>{listTotals}</div>
    </React.Fragment>
  );
}