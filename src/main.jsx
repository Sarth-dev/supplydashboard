import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";
import ReactDOM from "react-dom/client";
import App from "./App";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000/graphql" }), // 👈 replace with your backend endpoint
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
