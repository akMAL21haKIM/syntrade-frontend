import RangeSliderT from "./components/Slider";
import Footer from "./components/Footer";
import Head from "next/head";
import dynamic from "next/dynamic";
import Tooltip from "./components/Tooltip";
import { useMutation, useSubscription, gql } from "@apollo/client";
import SideNavBar from "./components/SideNavBar";

const Chart = dynamic(() => import("./components/Chart"), {
  ssr: false,
});

const EventSource = require("eventsource");

var data = "";

const sse = new EventSource(`http://0.0.0.0:5000`);
sse.onmessage = async (e) => {
  try {
    data = JSON.parse(e.data);
    console.log(data);
  } catch (error) {
    console.log("Error: ", error);
  }
};

sse.onerror = (e) => {
  console.log("Error:", e.message);
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
        <div className="flex h-full">
          <Chart
            width={1000}
            height={800}
            pricingData={data}
            syntheticModel={"crash_300"}
          />
        </div>

        {/* right side menu */}
        <aside className="absolute inset-y-0 right-0 h-screen w-[300px] flex flex-col bg-[#F1F1F1] border-l border-gray-200">
          <div className="flex h-18 items-center gap-x-4 px-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <h2 className="text-2xl font-bold text-gray-500 py3">
              10,000.00 USD
            </h2>
          </div>

          {/* Trade Type */}
          <div className="static h-36 w-38 m-7 bg-white rounded-md">
            <h3 className="text-xl font-medium text-black py-2 px-3 border-b border-gray-300">
              Trade type
            </h3>
            <div className="absolute h-10 w-1/2 bg-gray-100 mx-12 my-7 border border-transparent rounded-s shadow-lg">
              <h3 className="text-xl font-medium text-center pt-1">
                Rise / Fall
              </h3>
            </div>
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
