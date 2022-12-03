import Footer from "../components/Footer";
import Head from "next/head";
import dynamic from "next/dynamic";
import NavBar from "../components/NavBar";
import SyntheticModelDropdown from "../components/SyntheticModelDropdown";
import { React, useState, useEffect } from "react";
import { syntheticModelOptions } from "../lib/options";
import SideMenu from "../components/SideMenu";
import { SkeletonLoaderTradePage } from "../components/SkeletonLoaders";
import "../styles/trade.module.css";
import SingleActionModal from "../components/SingleActionModal";

const Chart = dynamic(() => import("../components/Chart.mjs"), {
  ssr: false,
});

const EventSource = require("eventsource");

var data = "";

const sse = new EventSource("http://0.0.0.0:5000");
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
  const [openTradeSuccessModal, setOpenTradeSuccessModal] = useState(false);

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
          <div>
            <SingleActionModal
              id="modal-trade-success"
              openModal={openTradeSuccessModal}
              setOpenModal={setOpenTradeSuccessModal}
              modalTitle="Trade successful"
              modalDescription="You just performed a trade!"
            />
            <SyntheticModelDropdown
              syntheticModel={syntheticModel}
              setSyntheticModel={setSyntheticModel}
            ></SyntheticModelDropdown>
            <Chart
              pricingData={data}
              stream={sse}
              syntheticModel={syntheticModel.type}
            />
            <SideMenu syntheticModel={syntheticModel} setOpenTradeSuccessModal={setOpenTradeSuccessModal}></SideMenu>
          </div>
        )}
      </main>
      {/* <Footer></Footer> */}
    </>
  );
};

export default Trade;
