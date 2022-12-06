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
import { OutlineCheckIcon, ExclamationTriangleIcon } from "../lib/icons";

const Chart = dynamic(() => import("../components/Chart.mjs"), {
  ssr: false,
});

const EventSource = require("eventsource");

var data = "";

const sse = new EventSource("https://pricing.syntrade.xyz");
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
  const [openLogInNeededModal, setOpenLogInNeededModal] = useState(false);
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
                modalIcon={
                  <OutlineCheckIcon
                    fill="#4ade80"
                    className="w-12 h-12"
                    aria-hidden="true"
                  />
                }
              />
              <SingleActionModal
                id="modal-log-in-needed"
                openModal={openLogInNeededModal}
                setOpenModal={setOpenLogInNeededModal}
                modalTitle="Log in needed"
                modalDescription="You need to log in to start trading"
                modalIcon={
                  <ExclamationTriangleIcon
                    fill="#f87171"
                    className="w-12 h-12"
                    aria-hidden="true"
                  />
                }
              />
              <SyntheticModelDropdown
                syntheticModel={syntheticModel}
                setSyntheticModel={setSyntheticModel}
              ></SyntheticModelDropdown>
              <Chart stream={sse} syntheticModel={syntheticModel.type} />
              <SideMenu
                syntheticModel={syntheticModel}
                setOpenTradeSuccessModal={setOpenTradeSuccessModal}
                setOpenLogInNeededModal={setOpenLogInNeededModal}
              ></SideMenu>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Trade;
