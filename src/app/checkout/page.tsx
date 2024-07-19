'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Header from '@/components/Header/Header';
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
import Footer from '@/components/Footer/Footer';


// Пример данных для продуктов
const products = [
 {
  name: 'Miracle Moisture Potion',
  description: 'A magical serum that promises to make your skin feel like it just had a vacation.',
  image: 'https://via.placeholder.com/150',
  price: 35.00,
 },
 {
  name: 'Glow-Up Face Mask',
  description: 'A mask that turns your face from “meh” to “wow!” in just 10 minutes.',
  image: 'https://via.placeholder.com/150',
  price: 45.00,
 },
 {
  name: 'Kiss Me Quick Lip Balm',
  description: 'A lip balm so good, you’ll want to kiss yourself in the mirror.',
  image: 'https://via.placeholder.com/150',
  price: 12.00,
 },
 {
  name: 'Wrinkle-Wizard Night Cream',
  description: 'A cream that works its magic while you sleep, turning wrinkles into dreams.',
  image: 'https://via.placeholder.com/150',
  price: 60.00,
 },
 {
  name: 'Spa Day in a Jar Scrub',
  description: 'An exfoliating scrub that makes you feel like you just had a spa day without leaving your bathroom.',
  image: 'https://via.placeholder.com/150',
  price: 25.00,
 },
];

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
 const handleDelete = ( index ) => {
  console.log( 'Delete product at index:', index );
 };

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
       <Grid item xs={12} lg={12}>
        <TextField fullWidth label="Email" variant="outlined" type="text" />
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
      <Typography variant="h4" component="h2">
       Cart
      </Typography>
      <List>
       {products.map( ( product, index ) => (
        <ListItem
         key={index}
         secondaryAction={
          <IconButton
           edge="end"
           color="error"
           onClick={() => handleDelete( index )}
          >
           <DeleteIcon />
          </IconButton>
         }
        >
         <ListItemAvatar>
          <Avatar src={product.image} alt={product.name} />
         </ListItemAvatar>
         <ListItemText
          primary={product.name}
          secondary={
           <>
            {product.description}
            <br />
            ${product.price.toFixed( 2 )}
           </>
          }
         />
        </ListItem>
       ) )}
      </List>
     </Grid>
    </Grid>
   </Box>
   <Footer />
  </>
 );
}
