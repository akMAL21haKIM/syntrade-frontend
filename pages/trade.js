import RangeSliderT from "./components/Slider";
import Footer from "./components/Footer";
import Head from "next/head";
import dynamic from "next/dynamic";
import Tooltip from "./components/Tooltip";
import { useMutation, useSubscription, gql } from "@apollo/client";
import SideNavBar from "./components/SideNavBar";
import Dropdown from "./components/Dropdown";
import SelectDropdown from "./components/SyntheticModelDropdown";
import TradeTypeDropdown from "./components/TradeTypeDropdown";

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
  return (
    <>
      <Head>
        <title>Trades | Syntrade</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex bg-white font-sans text-gray-900 md:max-w-2xl">
        {/* Side navigation bar */}
        <SideNavBar />

        {/* main body - chart */}
        <div className="flex w-full justify-center">
          <SelectDropdown></SelectDropdown>
          {/* <Dropdown></Dropdown> */}
          {/* <Chart
            width={800}
            height={600}
            pricingData={data}
            stream={sse}
            syntheticModel={"crash_300"}
          /> */}
        </div>

        {/* right side menu */}
        <aside className="absolute inset-y-0 right-0 h-screen w-[300px] flex flex-col bg-[#F1F1F1] border-l border-gray-200">
          <div className="flex h-18 items-center justify-center gap-x-4 px-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#6366F1"
              class="w-6 h-6"
            >
              <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
              <path
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z"
                clip-rule="evenodd"
              />
            </svg>

            <h2 className="text-xl font-bold text-gray-700 py3">
              10,000.00 USD
            </h2>
          </div>

          {/* Trade Type */}
          {/* <div className="static h-36 w-38 m-7 bg-white rounded-md align-center"> */}
          <div className="m-7">
            {/* <h3 className="mb-4 text-xl font-semibold text-gray-700 py-2 px-3 border-b border-gray-300 mx-4">
              Trade type
            </h3> */}
            <TradeTypeDropdown></TradeTypeDropdown>
            {/* <div className="absolute h-10 w-1/2 bg-gray-100 mx-12 my-7 border border-transparent rounded-s shadow-lg">
              <h3 className="text-xl font-medium text-center pt-1">
                Rise / Fall
              </h3>
            </div> */}
          </div>

          {/* Duration */}
          <div className="static h-36 w-38 m-6 bg-white rounded-md">
            <h3 className="text-xl font-medium text-black py-2 px-3 border-b border-gray-300">
              Duration
            </h3>
            <div>
              <RangeSliderT></RangeSliderT>
              <Tooltip>23</Tooltip>
            </div>
          </div>

          {/* Stake / Payout */}
          <div className="static h-36 w-38 m-6 bg-white rounded-md items-center justify-center">
            <button className="relative h-10 w-1/2 text-lg font-bold rounded-tl-md border-b border-r hover:bg-blue-500 hover:text-white">
              Stake
            </button>
            <button className="relative h-10 w-1/2 text-lg font-bold rounded-tr-md border-b border-r hover:bg-blue-500 hover:text-white">
              Payout
            </button>
            {/* number counter */}
            <div className="flex h-10 w-3/4 rounded-lg relative bg-transparent mt-7 ml-8 shadow-lg">
              <button
                data-action="decrement"
                className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
              >
                <span className="m-auto text-2xl font-thin">−</span>
              </button>
              <input
                type="text"
                className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
                name="custom-input-number"
                placeholder="USD"
              ></input>
              <button
                data-action="increment"
                className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
              >
                <span className="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
          </div>

          {/* Rise / Fall buttons */}
          <div className="static h-36 w-38 bg-white rounded-md grid grid-cols-1 gap-2">
            <div>
              <label className="block text-sm">Payout</label>
              <button className="absolute h-10 w-1/2 text-white bg-[#6366F1] rounded-md hover:bg-[#6366F1]/80 shadow-lg">
                Rise
              </button>
            </div>
            <div>
              <label className="block text-sm">Payout</label>
              <button className="absolute h-10 w-1/2 text-white bg-[#FF5858] rounded-md hover:bg-[#FF5858]/80 shadow-lg">
                Fall
              </button>
            </div>
          </div>
        </aside>

        {/* footer */}
        <Footer></Footer>
      </div>
    </>
  );
};

export default Trade;
