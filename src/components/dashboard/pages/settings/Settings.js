import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { useSessionStorage } from '../../../../hooks/useSessionStorage';
import { useNavigate, useParams } from "react-router-dom";

import { userInfo, updateInfo } from '../../../../services/userService';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const registerSchema = Yup.object().shape(
  {
    name: Yup.string(),
    lastname: Yup.string(),
    dob: Yup.date()
  }
);

export default function Settings(props) {
  const [user, setUser] = useState({name: '', lastname: '', dob: ''});
  const [accounts, setAccounts] = useState();
  const [categories, setCategories] = useState();
  const [subcategories, setSubcategories] = useState();
  
  const loggedIn = useSessionStorage('sessionJWTToken');
  const hashedId = useSessionStorage('sessionId');
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!loggedIn || !hashedId || !id) {
      return navigate('/login');
    } else {
      userInfo(loggedIn, hashedId, id).then((response) => {
        if (response.status === 200 && response.data) {
          let date = new Date(response.data.dob).getDate();
          let month = new Date(response.data.dob).getMonth();
          let year = new Date(response.data.dob).getFullYear();
          
          let userInfo = {
            name: response.data.name,
            lastname: response.data.lastname,
            dob: date + '/' + month + '/' + year
          }

          setUser(userInfo);
        } else {
          throw new Error(`[Error Obtaining User Info] ${response.data}`)
        }
      }).catch((error) => console.error(`[USER INFO] ${error}`))
    }
  }, [loggedIn, hashedId, id, navigate]);

  const handleSubmit = async (values) => {
    updateInfo(values.name, values.lastname, values.dob).then((response) => {
      if (response.status === 200) {
        console.log('User registered correctly');
        console.log(response.data);
        alert('User registered correctly');
      } else {
        throw new Error('Error in registry');
      }
    }).catch((error) => {
      console.error(`[REGISTER ERROR]: ${error}`);
      alert(error.response.data.error);
    })
  };

  const formik = useFormik({
    initialValues: {
      name: user.name,
      lastname: user.lastname,
      dob: user.dob,
      email: '',
      password: ''
    },
    validationSchema: registerSchema,
    onSubmit: handleSubmit
  })

  console.log(formik.initialValues.name)

  return (
    <Box sx={{
      my: 8,
      mx: 4,
      display: 'flex',
      backgroundColor: 'white'
      }}
    >
      <Grid item container xs={2}>
        <Grid item container direction={'column'} sx={{height: '100%'}}>
          <Button size='large' sx={{width: '100%', justifyContent: 'flex-start'}}>
            Profile
          </Button>
          <Button size='large' sx={{width: '100%', justifyContent: 'flex-start'}}>
            Account
          </Button>
          <Button size='large' sx={{width: '100%', justifyContent: 'flex-start'}}>
            Appearance
          </Button>
        </Grid>
      </Grid>
      <Grid container direction={'column'} >
        <Grid item id='profile' sx={{m: 2}}>
          <Typography variant='h5'>
            My Profile
          </Typography>
          <Box component="form" noValidate onSubmit={() => console.log('actualizado')} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              size='small'
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              value={formik.values.name}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.name)}
              helperText={formik.errors.email}
            />
            <TextField
              margin="normal"
              size='small'
              fullWidth
              id="lastname"
              label="Lastname"
              name="lastname"
              autoFocus
              value={formik.values.lastname}
              onChange={formik.handleChange}
              // error={formik.touched.email && Boolean(formik.errors.name)}
              // helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              size='small'
              fullWidth
              name="date"
              label="Birthday"
              type="date"
              id="date"
              value={formik.values.dob}
              onChange={formik.handleChange}
              // error={formik.touched.password && Boolean(formik.errors.password)}
              // helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save Changes
            </Button>
          </Box>
        </Grid>
        <Divider sx={{ my: 1, mr: 5 }} />
        <Grid item id='account' sx={{m: 2}}>
          <Typography variant='h5'>
            My Account
          </Typography>
        </Grid>
        <Divider sx={{ my: 1, mr: 5 }} />
        <Grid item id='appearance' sx={{m: 2}}>
          <Typography variant='h5'>
            My Appearance
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}