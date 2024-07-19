import { gql } from '@apollo/client';

// Мутация для создания заказа
export const CREATE_ORDER = gql`
  mutation CreateOrder($input: OrderInput!) {
    createOrder(input: $input) {
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

// Запрос для получения продуктов
export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      name
      description
      image
      price
    }
  }
`;

// Запрос для получения заказов
export const GET_ORDERS = gql`
  query GetOrders {
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
