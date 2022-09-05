import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';

export default function Configuration() {

  const [accounts, setAccounts] = useState();
  const [categories, setCategories] = useState();
  const [subcategories, setSubcategories] = useState();

  

  return (
    <Box sx={{
      my: 8,
      mx: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
      }}
    >

    </Box>
  )
}