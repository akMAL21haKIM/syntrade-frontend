import "../styles/globals.css";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { AuthProvider } from "../components/auth/AuthProvider";
import NavBar from "../components/NavBar";
import { useRouter } from "next/router";

const createApolloClient = () => {
  const link = new HttpLink({
    uri: "https://api.syntrade.xyz", // prod
    // uri: "http://0.0.0.0:4000", // dev
  });

  // const authLink = setContext((_, { headers }) => {
  //   // get the authentication token from local storage if it exists
  //   const token = Cookies.get("auth-token");
  //   // return the headers to the context so httpLink can read them
  //   return {
  //     headers: {
  //       ...headers,
  //       authorization: token ? `Bearer ${token}` : "",
  //     },
  //   };
  // });

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
    // Enable sending cookies over cross-origin requests
    credentials: "include",
  });
};

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <AuthProvider>
      <ApolloProvider client={createApolloClient()}>
        {router.pathname === "/signup" || router.pathname === "/login" ? (
          <Component {...pageProps} />
        ) : (
          <>
            <NavBar></NavBar>
            <Component {...pageProps} />
          </>
        )}
      </ApolloProvider>
    </AuthProvider>
  );
};

export default MyApp;
