'use client';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support';
import React from 'react';


function makeClient () {
  const httpLink = new HttpLink( {
    uri: 'https://api.mit.kh.ua/graphql',
    fetchOptions: { cache: 'no-store' },
  } );

  return new ApolloClient( {
    cache: new InMemoryCache(),
    link: httpLink,
  } );
}


export function ApolloWrapper ( { children }: React.PropsWithChildren<{}> ) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
