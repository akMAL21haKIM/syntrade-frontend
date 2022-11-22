import Footer from "./components/Footer";
import Head from "next/head";
import dynamic from "next/dynamic";
import Tooltip from "./components/Tooltip";
import { useMutation, useSubscription, gql } from "@apollo/client";
import NavBar from "./components/NavBar";
import SyntheticModelDropdown from "./components/SyntheticModelDropdown";
import TradeTypeDropdown from "./components/TradeTypeDropdown";
import RangeSlider from "./components/RangeSlider";
import StakePayout from "./components/StakePayout";
import TopNavBar from "./components/TopNavBar";
import { React, useState } from "react";
import { syntheticModelOptions } from "../lib/options";
import SideMenu from "./components/SideMenu";

const Chart = dynamic(() => import("./components/Chart"), {
  ssr: false,
});

const EventSource = require("eventsource");

var data = "";

const sse = new EventSource(`http://0.0.0.0:5000`);
sse.onmessage = async (e) => {
  try {
    data = JSON.parse(e.data);
    // console.log(data);
  } catch (error) {
    // console.log("Error: ", error);
  }
};

sse.onerror = (e) => {
  // console.log("Error:", e.message);
};

const Trade = () => {
  const [syntheticModel, setSyntheticModel] = useState(
    syntheticModelOptions[0]
  );

  return (
    <>
      <Head>
        <title>Trades | Syntrade</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
        <NavBar></NavBar>
        <div className="grid grid-cols-2">
          <div className="mx-8 px-8 mt-8">
            <SyntheticModelDropdown
              syntheticModel={syntheticModel}
              setSyntheticModel={setSyntheticModel}
            ></SyntheticModelDropdown>
            <Chart
              width={800}
              height={600}
              pricingData={data}
              stream={sse}
              syntheticModel={syntheticModel.type}
            />
          </div>
          <SideMenu></SideMenu>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};

export default Trade;
