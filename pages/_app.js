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
  });
};

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={createApolloClient()}>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTHA_SITE_KEY}
        scriptProps={{
          async: false, // optional, default to false,
          defer: true, // optional, default to false
          appendTo: "body", // optional, default to "head", can be "head" or "body",
          nonce: undefined,
        }}
      >
        <Component {...pageProps} />;
      </GoogleReCaptchaProvider>
    </ApolloProvider>
  );
};

export default MyApp;
