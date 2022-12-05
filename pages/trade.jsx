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
import { SolidDollarIcon } from "../lib/icons";
import TradeTypeDropdown from "../components/TradeTypeDropdown";

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
  const [notify, setNotify] = useState(false);

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
        {/* <div className="hidden 2xl:block xl:block lg:block md:block sm:hidden"> */}
        <NavBar notify={notify} setNotify={setNotify}></NavBar>
        {loader ? (
          <SkeletonLoaderTradePage />
        ) : (
          <>
            <div id="trade-page" className="h-screen">
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
              <div className="bg-gray-50 pb-8 hidden 2xl:hidden xl:hidden lg:hidden md:hidden sm:block absolute inset-x-0 bottom-0">
                <div className="mt-8 mx-6 py-2 px-4 bg-white rounded border-4 border-gray-100">
                  <p className="flex select-none items-center p-1 text-base font-semibold tracking-wide text-gray-900 rounded-lg">
                    <SolidDollarIcon
                      className="w-6 h-6 fill-indigo-600"
                      fill="currentColor"
                    />

                    <span className="ml-3 my-auto">10,000.00 MYR</span>
                  </p>
                </div>
                <div className="z-30 mt-6 mx-6 py-2 px-4 bg-white rounded border-4 border-gray-100 hover:border-gray-200 focus:outline-none">
                  <TradeTypeDropdown
                    tradeType={tradeType}
                    setTradeType={setTradeType}
                    syntheticModel={syntheticModel}
                  />
                </div>
              </div>
              <SideMenu
                syntheticModel={syntheticModel}
                setOpenTradeSuccessModal={setOpenTradeSuccessModal}
                notify={notify}
                setNotify={setNotify}
              ></SideMenu>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Trade;
