import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// TODO: Petición para recibir los datos personales Nombre, ID, DOB

export const ProfileMenu = () => {
  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Paper elevation={3} sx={{backgroundColor: "skyblue", p: 3, height: 160, borderRadius: 5}}>
        <Grid 
          container 
          sx={{height: "100%"}} 
          direction="column" 
          justifyContent="flex-end"
        >
          <Grid container item sx={{px:1, gap: 1}}>
            <Grid item>
              <Typography>
                0000 0000 0000 0000
              </Typography>
            </Grid>
            <Grid item container justifyContent="space-between">
              <Grid item>
                <Typography>
                  Aitor Couñago
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  08/12
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Grid container>
        {/* TODO: Añadir Dashboard, Details, Movimientos, Configuración */}
      </Grid>
    </Box>
  )
}