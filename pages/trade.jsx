import Footer from "./components/Footer";
import Head from "next/head";
import dynamic from "next/dynamic";
import NavBar from "./components/NavBar";
import SyntheticModelDropdown from "./components/SyntheticModelDropdown";
import { React, useState, useEffect } from "react";
import { syntheticModelOptions } from "../lib/options";
import SideMenu from "./components/SideMenu";
import { SkeletonLoaderTradePage } from "./components/SkeletonLoaders";

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
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);

    setTimeout(async () => {
      setLoader(false);
    }, 1000);
  }, [syntheticModel]);

  return (
    <>
      <Head>
        <title>Trade | Syntrade</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
        <NavBar></NavBar>
        {loader ? (
          <SkeletonLoaderTradePage />
        ) : (
          <div className="grid grid-cols-2">
            <div className="mx-8 px-8">
              <SyntheticModelDropdown
                syntheticModel={syntheticModel}
                setSyntheticModel={setSyntheticModel}
              ></SyntheticModelDropdown>
              {/* Resize chart according to screen size */}
              <Chart
                width={1250}
                height={680}
                pricingData={data}
                stream={sse}
                syntheticModel={syntheticModel.type}
              />
            </div>
            <SideMenu syntheticModel={syntheticModel}></SideMenu>
          </div>
        )}
      </main>
      <Footer></Footer>
    </>
  );
};

export default Trade;