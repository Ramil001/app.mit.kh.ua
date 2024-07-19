'use client';

import * as React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Products from '@/components/Checkout/Products'
import Orders from '@/components/Checkout/Orders'

import { GET_PRODUCTS, CREATE_ORDER, GET_ORDERS } from '@/lib/orders';

import { GetServerSideProps } from 'next';
import { getProducts, getOrders } from '@/lib/api';

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
 const [createOrder] = useMutation( CREATE_ORDER );
 const [firstName, setFirstName] = React.useState( '' );
 const [lastName, setLastName] = React.useState( '' );
 const [phoneNumber, setPhoneNumber] = React.useState( '' );
 const [email, setEmail] = React.useState( '' );
 const [city, setCity] = React.useState( '' );
 const [address, setAddress] = React.useState( '' );



 const handleSubmit = async () => {
  try {
   const { data } = await createOrder( {
    variables: {
     input: {
      firstName,
      lastName,
      phoneNumber,
      email,
      city,
      address,
     },
    },
   } );
   console.log( 'Order created:', data );
   // Clear the form or redirect user
  } catch ( error ) {
   console.error( 'Error creating order:', error );
  }
 };

 const handleDelete = ( index: number ) => {
  console.log( 'Delete product at index:', index );
 };

 return (
  <Box sx={{ flexGrow: 1 }}>
   <Grid container spacing={2} padding={4}>
    <Grid item xs={12} lg={6}>
     <Typography variant="h4" component="h2">
      Person info
     </Typography>
     <Grid container spacing={2}>
      <Grid item xs={12} lg={6}>
       <TextField
        fullWidth
        label="First name"
        variant="outlined"
        type="text"
        value={firstName}
        onChange={( e ) => setFirstName( e.target.value )}
       />
      </Grid>
      <Grid item xs={12} lg={6}>
       <TextField
        fullWidth
        label="Last name"
        variant="outlined"
        type="text"
        value={lastName}
        onChange={( e ) => setLastName( e.target.value )}
       />
      </Grid>
      <Grid item xs={12} lg={12}>
       <TextField
        fullWidth
        label="Phone number"
        variant="outlined"
        type="text"
        value={phoneNumber}
        onChange={( e ) => setPhoneNumber( e.target.value )}
       />
      </Grid>
      <Grid item xs={12} lg={12}>
       <TextField
        fullWidth
        label="Email"
        variant="outlined"
        type="text"
        value={email}
        onChange={( e ) => setEmail( e.target.value )}
       />
      </Grid>
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
         <TextField
          {...params}
          label="City"
          variant="outlined"
          value={city}
          onChange={( e ) => setCity( e.target.value )}
         />
        )}
       />
      </Grid>
      <Grid item xs={12} lg={12}>
       <TextField
        fullWidth
        label="Address"
        variant="outlined"
        type="text"
        value={address}
        onChange={( e ) => setAddress( e.target.value )}
       />
      </Grid>
      <Grid item xs={12} lg={12}>
       <Button
        fullWidth
        color="primary"
        size="large"
        variant="outlined"
        onClick={handleSubmit}
       >
        Send order
       </Button>
      </Grid>
     </Grid>
    </Grid>
    <Grid item xs={12} lg={6}>
     <Typography variant="h4" component="h2">
      Cart
     </Typography>
     <Products />
     <Typography variant="h4" component="h2">
      Orders
     </Typography>
     <Orders />
    </Grid>
   </Grid>
  </Box>
 );
}

