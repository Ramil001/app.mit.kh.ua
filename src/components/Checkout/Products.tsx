import { useQuery } from '@apollo/client';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { GET_PRODUCTS } from '@/lib/orders';

export default function Products () {
 const { loading, error, data } = useQuery( GET_PRODUCTS, {
  fetchPolicy: 'cache-and-network', // Try fetching from cache first, then network
 } );

 const handleDelete = ( id: string ) => {
  console.log( 'Delete product with ID:', id );
  // Implement delete functionality
 };

 return (
  <>
   {loading && <p>Loading products...</p>}
   {error && <p>Error loading products: {error.message}</p>}
   {data && (
    <List>
     {data.products.map( ( product: any ) => (
      <ListItem key={product.id}>
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
       <IconButton
        edge="end"
        color="error"
        onClick={() => handleDelete( product.id )}
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
