'use client';

import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';
import { HttpLink } from '@apollo/client';

function makeClient () {
  const httpLink = new HttpLink( {
    uri: "https://api.mit.kh.ua/graphql",
    fetchOptions: { cache: 'no-store' },
  } );

  return new ApolloClient( {
    cache: new InMemoryCache(),
    link: httpLink,
  } );
}

export function ApolloWrapper ( { children }: { children: React.ReactNode } ) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}