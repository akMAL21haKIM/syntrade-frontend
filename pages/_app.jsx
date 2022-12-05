import "../styles/globals.css";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { AuthProvider } from "../components/auth/AuthProvider";

const createApolloClient = () => {
  const link = new HttpLink({
    uri: "http://0.0.0.0:4000",
  });

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
    // Enable sending cookies over cross-origin requests
    credentials: "include",
    // headers: {
    //   // authorization: localStorage.getItem("token") || "",
    // },
    onError: ({ networkError, graphQLErrors }) => {
      console.log("graphQLErrors: ", graphQLErrors);
      console.log("networkError: ", networkError);
    },
  });
};

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <ApolloProvider client={createApolloClient()}>
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTHA_SITE_KEY}
          scriptProps={{
            async: false,
            defer: true,
            appendTo: "body",
            nonce: undefined,
          }}
        >
          <Component {...pageProps} />
        </GoogleReCaptchaProvider>
      </ApolloProvider>
    </AuthProvider>
  );
};

export default MyApp;
