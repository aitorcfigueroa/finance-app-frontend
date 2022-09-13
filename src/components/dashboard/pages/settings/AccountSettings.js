import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import { userAccountSettings } from "../../../../services/userService";

export default function AccountSettings(props) {

  const id = props.security.id;

  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    userAccountSettings(id).then((response) => {
      if (response.status === 200 && response.data) {
        setAccounts(response.data.accounts);
        setCategories(response.data.categories);
      } else {
        throw new Error(`[Error Obtaining User Info] ${response.data}`)
      }
    }).catch((error) => console.error(`[USER INFO] ${error}`))
  }, [id]);

  return (
    <Grid item id='account' sx={{m: 2}}>
      <Typography variant='h5'>
        My Account
      </Typography>
    </Grid>
  )
}