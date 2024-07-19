'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Header from '@/components/Header/Header';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';


const Item = styled( Paper )( ( { theme } ) => ( {
 backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
 ...theme.typography.body2,
 padding: theme.spacing( 1 ),
 textAlign: 'center',
 color: theme.palette.text.secondary,
} ) );

const cities = [
 'London',
 'Birmingham',
 'Manchester',
 'Liverpool',
 'Bristol',
 'Newcastle',
 'Sheffield',
 'Leeds',
 'Glasgow',
 'Edinburgh',
];

export default function Checkout () {
 return (
  <>
   <Header />
   <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={2} padding={4}>
     <Grid item xs={12} lg={6}>
      {/* Person info */}
      <Typography variant="h4" component="h2">
       Person info
      </Typography>
      <Grid container spacing={2}>
       <Grid item xs={12} lg={6}>
        <TextField fullWidth label="First name" variant="outlined" type="text" />
       </Grid>
       <Grid item xs={12} lg={6}>
        <TextField fullWidth label="Last name" variant="outlined" type="text" />
       </Grid>
       <Grid item xs={12} lg={12}>
        <TextField fullWidth label="Number phone" variant="outlined" type="text" />
       </Grid>
       {/* Shipping info */}
       <Grid item xs={12} lg={12}>
        <Typography variant="h4" component="h2">
         Shipping info
        </Typography>
       </Grid>
       <Grid item xs={12} lg={12}>
        <Autocomplete
         options={cities}
         getOptionLabel={( option ) => option}
         renderInput={( params ) => (
          <TextField {...params} label="City" variant="outlined" />
         )}
        />
       </Grid>
       <Grid item xs={12} lg={12}>
        <TextField fullWidth label="Address" variant="outlined" type="text" />
       </Grid>

       {/* Button buy */}
       <Grid item xs={12} lg={12}>
        <Button fullWidth color="primary" size="large" variant="outlined">Send order</Button>
       </Grid>
      </Grid>
     </Grid>
     <Grid item xs={12} lg={6}>
      <Item>xs=4</Item>
     </Grid>
    </Grid>
   </Box>
  </>

 );
}