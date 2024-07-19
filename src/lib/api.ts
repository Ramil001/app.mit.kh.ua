const API_URL = process.env.GRAPHQL_API_URL || 'https://api.mit.kh.ua/graphql'; // Ensure to use environment variable

// Function to execute a GraphQL query
async function fetchGraphQL(query: string, variables?: any) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error('GraphQL error: ' + result.errors.map((err: any) => err.message).join(', '));
  }

  return result.data;
}

// Function to get products
export async function getProducts() {
  const query = `
    query {
      products {
        id
        name
        price
        image
        description
      }
    }
  `;

  try {
    const data = await fetchGraphQL(query);
    return data.products; // Return array of products
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Return empty array in case of error
  }
}

// Function to get orders
export async function getOrders() {
  const query = `
    query {
      orders {
        id
        firstName
        lastName
        phoneNumber
        email
        city
        address
      }
    }
  `;

  try {
    const data = await fetchGraphQL(query);
    return data.orders; // Return array of orders
  } catch (error) {
    console.error('Error fetching orders:', error);
    return []; // Return empty array in case of error
  }
}
