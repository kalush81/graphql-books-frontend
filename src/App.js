import BookList from "./components/BookList";
import { ApolloProvider } from "@apollo/client";

import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphiql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Books and Authors FullStack Appa</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
