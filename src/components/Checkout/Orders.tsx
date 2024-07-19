import { useQuery } from '@apollo/client';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { GET_ORDERS } from '@/lib/orders'; // Import your GraphQL query for orders

export default function Orders () {
 const { loading, error, data } = useQuery( GET_ORDERS, {
  fetchPolicy: 'cache-and-network', // Try fetching from cache first, then network
 } );

 const handleDelete = ( id: string ) => {
  console.log( 'Delete order with ID:', id );
  // Implement delete functionality here
 };

 return (
  <>
   {loading && <p>Loading orders...</p>}
   {error && <p>Error loading orders: {error.message}</p>}
   {data && (
    <List>
     {data.orders.map( ( order: any ) => (
      <ListItem key={order.id}>
       <ListItemText
        primary={`Order #${ order.id }`}
        secondary={
         <>
          {order.firstName} {order.lastName}
          <br />
          {order.phoneNumber}
          <br />
          {order.email}
          <br />
          {order.city}
          <br />
          {order.address}
         </>
        }
       />
       <IconButton
        edge="end"
        color="error"
        onClick={() => handleDelete( order.id )}
       >
        <DeleteIcon />
       </IconButton>
      </ListItem>
     ) )}
    </List>
   )}
  </>
 );
}
