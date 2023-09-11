import App from "./App";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import Test from "./Test";

export default function Home() {
  const client = new ApolloClient({
    ssrMode: true,
    uri: "http://homes-course.local/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}
