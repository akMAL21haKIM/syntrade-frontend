import React from "react";
import Footer from "./components/Footer";
import Head from "next/head";
import SideNavBar from "./components/SideNavBar";

const TradesHistory = () => {
  return (
    <>
      <Head>
        <title>Trades History | Syntrade</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        {/* Side navigation bar */}
        <SideNavBar />
        <Footer />
      </div>
    </>
  );
};

export default TradesHistory;
