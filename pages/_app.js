import "../styles/globals.css";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const MyApp = ({ Component, pageProps }) => {
  return (
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
  );
};

export default MyApp;
