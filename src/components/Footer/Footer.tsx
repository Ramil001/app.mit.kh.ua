import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Footer () {
 return (
  <Box
   sx={{
    backgroundColor: 'background.paper',
    padding: 2,
    textAlign: 'center',
    borderTop: '1px solid',
    borderColor: 'divider',
    position: 'fixed',
    bottom: 0,
    width: '100%',
   }}
  >
   <Typography variant="body2" color="text.secondary">
    © {new Date().getFullYear()} Footer.
   </Typography>
  </Box>
 );
}
