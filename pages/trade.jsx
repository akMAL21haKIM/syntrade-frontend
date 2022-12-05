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
import BottomMenu from "../components/BottomMenu";
// import { useStores } from "../stores";
// import { observer } from "mobx-react-lite";

const Chart = dynamic(() => import("../components/Chart.mjs"), {
  ssr: false,
});

const EventSource = require("eventsource");

var data = "";

const sse = new EventSource("http://0.0.0.0:5000");
sse.onmessage = async (e) => {
  try {
    data = JSON.parse(e.data);
  } catch (error) {}
};

sse.onerror = (e) => {};

const Trade = () => {
  const [syntheticModel, setSyntheticModel] = useState(
    syntheticModelOptions[0]
  );
  const [openTradeSuccessModal, setOpenTradeSuccessModal] = useState(false);
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
              <Chart stream={sse} syntheticModel={syntheticModel.type} />
              {/* <BottomMenu
                syntheticModel={syntheticModel}
                setOpenTradeSuccessModal={setOpenTradeSuccessModal}
              ></BottomMenu> */}
              <SideMenu
                syntheticModel={syntheticModel}
                setOpenTradeSuccessModal={setOpenTradeSuccessModal}
              ></SideMenu>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Trade;
