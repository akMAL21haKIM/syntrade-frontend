import "../styles/globals.css";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

const createApolloClient = () => {
  const link = new HttpLink({
    uri: "http://localhost:4000",
  });

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
    // Enable sending cookies over cross-origin requests
    credentials: "include",
    headers: {
      // authorization: localStorage.getItem("token") || "",
    },
  });
};

const MyApp = ({ Component, pageProps }) => {
  return (
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
  );
};

export default MyApp;
