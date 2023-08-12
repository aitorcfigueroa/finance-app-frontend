import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, TextField, Button, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { userAccountSettings } from "../../../../services/userService";

export default function AccountSettings(props) {

  const id = props.security.id;

  const [accounts, setAccounts] = useState({});
  const [categories, setCategories] = useState({});

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

  let listAccounts = Object.keys(accounts).sort();

  const listItemAccounts = listAccounts.map((value) => 
    <div>
      <ListItem secondaryAction={
        <IconButton edge='end' aria-label="delete">
          <DeleteIcon />
        </IconButton>
      } sx={{ flex: 1 }}>
        <ListItemText
          primary={value}
        />
      </ListItem>
    </div>
  )

  let listCategories = Object.keys(categories);

  const listItemCategories = listCategories.map((value) => 
    <div>
      <ListItem secondaryAction={
        <IconButton edge='end' aria-label="delete">
          <DeleteIcon />
        </IconButton>
      } sx={{ flex: 1 }}>
        <ListItemText
          primary={value}
        />
      </ListItem>
    </div>
  )

  return (
    <Grid item id='account' sx={{m: 2}}>
      <Typography variant='h5'>
        My Account
      </Typography>
      <Box>
        <Box >
          <Typography variant='h6' component='div'>
            Accounts
          </Typography>
          <List>
            {listItemAccounts}
          </List>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save Changes
          </Button>
        </Box>
        <Box>
          <Box>
            <Typography variant='h6' component='div'>
              Categories
            </Typography>
            
            <List>
              {listItemCategories}
            </List>
          </Box>
          <Box>
            <Typography variant='h6' component='div'>
              Subcategories
            </Typography>
            <List>

            </List>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Grid>
  )
}