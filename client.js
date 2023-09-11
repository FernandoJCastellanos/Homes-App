import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  ssrMode: true,
  uri: process.env.NEXT_PUBLIC_WP_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export default client;
