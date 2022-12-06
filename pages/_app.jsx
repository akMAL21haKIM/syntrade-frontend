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

const uri =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://api.syntrade.xyz";

const createApolloClient = () => {
  const link = new HttpLink({
    uri: uri,
  });

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
