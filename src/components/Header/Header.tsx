import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Box from '@mui/material/Box';
import Link from 'next/link';

export default function Header () {
 return (
  <AppBar color="info" position="static">
   <Toolbar>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
     <Link href="/">Main page</Link>
    </Typography>

    <Box>
     <Link href="/checkout" >
      <IconButton edge="end" color="inherit">
       <Badge badgeContent={5} color="success">
        <ShoppingCartIcon />
       </Badge>
      </IconButton>
     </Link>

    </Box>

   </Toolbar>
  </AppBar>
 );
}
