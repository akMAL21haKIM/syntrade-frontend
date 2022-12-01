import { React, Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import RangeSlider from "./RangeSlider";
import {
  SolidDollarIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "../lib/icons";
import { classNames } from "../lib/utilities";
import { useQuery, useMutation, gql } from "@apollo/client";
import Tooltip from "./Tooltip";
import Prices from "../graphql/prices";
import UpdateBalance from "../graphql/updateBalance";
import CurrentBalance from "../graphql/currentBalance";
import CreateBuyTrade from "../graphql/createBuyTrade";

const SideMenu = ({ syntheticModel }) => {
  const [loader, setLoader] = useState(false);
  const [selectedTradeType, setSelectedTradeType] = useState(
    syntheticModel.trade_type[0]
  );
  const [isClickedTradeTypeBox, setIsClickedTradeTypeBox] = useState(false);
  const [stakePayout, setStakePayout] = useState(10);
  const [selectedStakePayout, setSelectedStakePayout] = useState(false);
  const [disableIncrement, setDisableIncrement] = useState(false);
  const [disableDecrement, setDisableDecrement] = useState(false);
  const [blueIconTransition, setBlueIconTransition] = useState(false);
  const [redIconTransition, setRedIconTransition] = useState(false);
  const [selectedNumberPrediction, setSelectedNumberPrediction] = useState(0);
  const [sliderValue, setSliderValue] = useState(5);
  const [stakePayoutError, setStakePayoutError] = useState(false);
  const [currentWalletBalance, setCurrentWalletBalance] = useState(10000.0);

  const synth = syntheticModel.type;
  const parsedStakePayout = parseFloat(stakePayout);
  const tradeType = selectedTradeType.simplified_title;
  const parsedSliderValue = parseInt(sliderValue);
  const negatedParsedStakePayout = parsedStakePayout * -1;

  const { data, loading, error } = useQuery(Prices, {
    variables: {
      selectedStakePayout,
      synth,
      tradeType,
      parsedStakePayout,
      parsedSliderValue,
      selectedNumberPrediction,
    },
  });

  const userId = 1;

  const [
    updateBalance,
    { updateBalanceData, updateBalanceLoading, updateBalanceError },
  ] = useMutation(UpdateBalance);

  const { currentBalanceData, currentBalanceLoading, currentBalanceError } =
    useQuery(CurrentBalance, {
      variables: {
        userId,
      },
    });

  const [
    createBuyTrade,
    { createBuyTradeData, createBuyTradeLoading, createBuyTradeError },
  ] = useMutation(CreateBuyTrade);

  useEffect(() => {
    if (currentBalanceData) {
      setCurrentWalletBalance(currentBalanceData);
    }
  }, createBuyTradeData);

  useEffect(() => {
    setLoader(true);

    setTimeout(async () => {
      setLoader(false);
    }, 1000);
  }, [selectedTradeType, stakePayout, selectedStakePayout, sliderValue, data]);

  const increment = (e) => {
    e.preventDefault();

    setDisableDecrement(false);

    if (parseFloat(stakePayout) > 30000) {
      // Disable increment button
      setDisableIncrement(true);

      // Show tooltip error message
      setStakePayoutError(true);
    }

    setStakePayout(stakePayout + 1);
    setStakePayoutError(false);
  };

  const decrement = (e) => {
    e.preventDefault();

    setDisableIncrement(false);

    // If stakePayout is less than 0, set it to 0
    if (stakePayout <= 0) {
      setStakePayout(0);

      // Disable decrement button
      setDisableDecrement(true);

      // Show tooltip error message
      setStakePayoutError(true);
    } else {
      // Enable decrement button
      setDisableDecrement(false);
      setStakePayout(stakePayout - 1);
      setStakePayoutError(false);
    }
  };

  const handleStakePayoutChange = (e) => {
    // Remove non digit characters from input
    // TODO: Make sure input can only take one period
    // TODO: Make sure input can take only two numbers after period
    const sanitisedInput = e.target.value.replace(/\D/g, "");

    // If stakePayout is less than 0, set it to 0
    if (sanitisedInput <= 0) {
      setStakePayout(0);
      setStakePayoutError(true);
    } else if (sanitisedInput > 30000) {
      setStakePayout(sanitisedInput);
      setStakePayoutError(true);
    } else {
      setStakePayout(sanitisedInput);
      setStakePayoutError(false);
    }
  };

  const handleTrade = async (singleTradeType) => {
    const syntheticTrade = synth + "_" + singleTradeType;

    // If user has enough balance in wallet
    if (currentWalletBalance >= stakePayout) {
      // Deduct stake from wallet
      await updateBalance({
        variables: { userId, negatedParsedStakePayout },
      });
      // Create trade
      await createBuyTrade({
        variables: {
          userId,
          syntheticTrade,
          parsedStakePayout,
        },
      });
      console.log("Created buy trade");
    }
    // Else if user doesn't hv enough balance in wallet, show tooltip error
    else {
      console.log("Error: Not enough balance in wallet");
    }
  };

  return (
    <aside
      className="w-80 h-11/12 right-0 absolute bg-gray-50 pb-8"
      aria-label="Sidebar"
    >
      <div className="mt-8 mx-6 py-2 px-4 bg-white rounded border-4 border-gray-100 ">
        <p className="flex select-none items-center p-1 text-base font-semibold tracking-wide text-gray-900 rounded-lg">
          <SolidDollarIcon
            className="w-6 h-6 fill-indigo-600"
            fill="currentColor"
          />
          <span className="ml-3">10,000.00 MYR</span>
        </p>
      </div>
      <div className="z-30 mt-6 mx-6 py-2 px-4 bg-white rounded border-4 border-gray-100 hover:border-gray-200 focus:outline-none">
        <Listbox value={selectedTradeType} onChange={setSelectedTradeType}>
          {({ open }) => (
            <>
              <Listbox.Label className="sr-only">
                {" "}
                Change type of trade{" "}
              </Listbox.Label>
              <div className="relative text-left">
                <Listbox.Button
                  onClick={(e) => {
                    if (isClickedTradeTypeBox) {
                      setIsClickedTradeTypeBox(false);
                    } else {
                      setIsClickedTradeTypeBox(true);
                    }
                  }}
                  className="select-none items-center rounded-md bg-white py-2 text-xs font-medium text-gray-700 focus:outline-none"
                >
                  <div className="flex justify-between">
                    <div className="flex-1 mr-2">
                      {isClickedTradeTypeBox ? (
                        <ChevronLeftIcon
                          strokeWidth="1"
                          fill="currentColor"
                          className="w-4 h-4"
                        />
                      ) : (
                        <ChevronRightIcon
                          strokeWidth="1"
                          fill="currentColor"
                          className="w-4 h-4"
                        />
                      )}
                    </div>
                    <div className="grid grid-flow-col">
                      {selectedTradeType.icon}

                      <p className="font-bold text-sm ml-2">
                        {selectedTradeType.title}
                      </p>
                    </div>
                  </div>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute -left-[235px] -top-[20px] z-10 mt-2 w-[13rem] rounded-md bg-white border-gray-100 border-4 focus:outline-none">
                    <p className="font-semibold p-4 text-sm select-none cursor-default">
                      Trade Types
                    </p>
                    {syntheticModel.trade_type.map((tradeTypeOption) => (
                      <Listbox.Option
                        key={tradeTypeOption.title}
                        className={({ active, selected }) =>
                          classNames(
                            selected
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700 hover:bg-gray-50",
                            "cursor-default select-none p-4 text-sm"
                          )
                        }
                        value={tradeTypeOption}
                      >
                        {({ selected, active }) => (
                          <div className="flex flex-col">
                            <div className="flex justify-start">
                              {tradeTypeOption.icon}

                              <p className="font-medium ml-5">
                                {tradeTypeOption.title}
                              </p>
                            </div>
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
      <div className="mt-6 mx-6 py-2 px-4 bg-white rounded border-4 border-gray-100 ">
        <RangeSlider
          sliderValue={sliderValue}
          setSliderValue={setSliderValue}
        ></RangeSlider>
      </div>
      <Tooltip
        msg="Minimum stake of 1.00 and maximum payout of 30000"
        stakePayoutError={stakePayoutError}
      >
        <div className="relative mt-6 mx-6 bg-gray-50 rounded border-4 border-gray-100">
          <div className="relative">
            <span className="relative grid grid-cols-2 justify-between rounded">
              <button
                type="button"
                className={`rounded-tl w-full px-4 py-2 text-sm font-semibold focus:outline-none ${
                  selectedStakePayout != true
                    ? "bg-indigo-600 text-white"
                    : "bg-transparent text-gray-700 hover:bg-gray-100"
                }`}
                onClick={(e) => {
                  e.preventDefault();

                  if (selectedStakePayout == true) {
                    setSelectedStakePayout(false);
                  }
                }}
              >
                Stake
              </button>

              <button
                type="button"
                className={`rounded-tr w-full px-4 py-2 text-sm font-semibold focus:outline-none ${
                  selectedStakePayout != false
                    ? "bg-indigo-600 text-white"
                    : "bg-transparent text-gray-700 hover:bg-gray-100"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  if (selectedStakePayout == false) {
                    setSelectedStakePayout(true);
                  }
                }}
              >
                Payout
              </button>
            </span>
          </div>
          <div className="bg-white rounded">
            <span className="grid grid-cols-4 justify-between">
              <button
                type="button"
                className={`col-span-1 rounded-l px-4 py-4 text-sm font-semibold text-gray-700 hover:bg-gray-100 ${
                  disableDecrement ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={(e) => decrement(e)}
              >
                –
              </button>
              <div className="col-span-2 grid grid-cols-3 justify-center align-center pr-4 focus:outline-none border-none">
                <input
                  type="text"
                  className="font-medium text-gray-700 col-span-2 focus:outline-none border-none border-transparent focus:border-transparent focus:ring-0"
                  name="stake-payout-input"
                  value={stakePayout}
                  onChange={(e) => handleStakePayoutChange(e)}
                ></input>
                <p className="text-gray-600 font-medium my-auto col-span-1 focus:outline-none cursor-default select-none">
                  MYR
                </p>
              </div>

              <button
                type="button"
                className={`col-span-1 rounded-r px-4 py-4 text-sm font-semibold text-gray-700 hover:bg-gray-100 ${
                  disableIncrement ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={(e) => increment(e)}
              >
                +
              </button>
            </span>
          </div>
        </div>
      </Tooltip>
      <div
        className={`mt-6 mx-6 py-2 px-4 bg-white rounded border-4 border-gray-100 ${
          selectedTradeType.simplified_title == "matches_differs"
            ? "block"
            : "hidden"
        }`}
      >
        <div className="select-none cursor-default">
          <div className="grid grid-flow-col justify-between">
            <p className="text-sm mb-2 mt-0 font-semibold text-gray-700 cursor-default select-none">
              Last Digit Prediction
            </p>
          </div>
          <div className="px-2 grid grid-cols-5 gap-5 justify-between">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
              <div
                key={index}
                className={`text-sm py-2 px-4 text-center border-2 font-semibold justify-self-center rounded ${
                  selectedNumberPrediction == index
                    ? "bg-indigo-600 text-white border-transparent"
                    : "bg-gray-50 border-gray-100 text-gray-700 hover:bg-gray-100"
                }`}
                onClick={(e) => setSelectedNumberPrediction(index)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 mx-6 py-2 px-4 rounded border-4 border-gray-100 bg-white">
        <div>
          <div className="grid grid-cols-2">
            <p className="text-sm font-light text-gray-500 mb-1 focus:outline-none cursor-default select-none">
              {selectedStakePayout ? "Stake" : "Payout"}
            </p>
            {loader ? (
              <div className="animate-pulse h-[1.25rem] flex bg-gray-300 rounded focus:outline-none cursor-default select-none"></div>
            ) : data ? (
              <p className="text-sm font-semibold text-gray-700 mb-1 text-right focus:outline-none cursor-default select-none">
                {Object.values(data)[0][0].toFixed(2)} MYR
              </p>
            ) : (
              <p className="text-sm font-semibold text-gray-700 mb-1 text-right focus:outline-none cursor-default select-none">
                {"No data"} MYR
              </p>
            )}
          </div>
          <Tooltip
            msg="Minimum stake of 1.00 and maximum payout of 30000"
            stakePayoutError={stakePayoutError}
          >
            <button
              className={`px-4 py-4 rounded w-full grid grid-cols-2 focus:outline-none ${
                loader
                  ? "bg-indigo-600 opacity-50 disabled:pointer-events-none"
                  : "hover:bg-indigo-700 bg-indigo-600"
              }`}
            >
              <div
                className={`bg-transparent ${
                  blueIconTransition
                    ? "translate-x-28 ease-out cubic-bezier(0.4, 0, 1, 1) duration-200"
                    : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();

                  if (blueIconTransition == false) {
                    setBlueIconTransition(true);

                    setTimeout(async () => {
                      setBlueIconTransition(false);
                    }, 700);
                  } else {
                    setBlueIconTransition(false);
                  }

                  handleTrade(tradeType.split("_")[0]);
                }}
              >
                {selectedTradeType.blueIcon}
              </div>

              <p className="text-sm font-semibold text-white text-right focus:outline-none cursor-default select-none">
                {selectedTradeType.blueText}
              </p>
            </button>
          </Tooltip>
        </div>
        <div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-sm font-light text-gray-500 mb-1 focus:outline-none cursor-default select-none">
              {selectedStakePayout ? "Stake" : "Payout"}
            </p>
            {loader ? (
              <div className="animate-pulse h-[1.25rem] flex bg-gray-300 rounded focus:outline-none cursor-default select-none"></div>
            ) : data ? (
              <p className="text-sm font-semibold text-gray-700 mb-1 text-right focus:outline-none cursor-default select-none">
                {Object.values(data)[0][1].toFixed(2)} MYR
              </p>
            ) : (
              <p className="text-sm font-semibold text-gray-700 mb-1 text-right focus:outline-none cursor-default select-none">
                {"No data"} MYR
              </p>
            )}
          </div>
          <Tooltip
            msg="Minimum stake of 1.00 and maximum payout of 30000"
            stakePayoutError={stakePayoutError}
          >
            <button
              className={`px-4 py-4 rounded w-full grid grid-cols-2 focus:outline-none ${
                loader
                  ? "bg-red-600 opacity-50 disabled:pointer-events-none"
                  : "hover:bg-red-700 bg-red-600"
              }`}
            >
              <div
                className={`bg-transparent ${
                  redIconTransition
                    ? "translate-x-28 ease-out cubic-bezier(0.4, 0, 1, 1) duration-200"
                    : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();

                  if (redIconTransition == false) {
                    setRedIconTransition(true);

                    setTimeout(async () => {
                      setRedIconTransition(false);
                    }, 700);
                  } else {
                    setRedIconTransition(false);
                  }

                  handleTrade(tradeType.split("_")[1]);
                }}
              >
                {selectedTradeType.redIcon}
              </div>

              <p className="text-sm font-semibold text-white text-right focus:outline-none cursor-default select-none">
                {selectedTradeType.redText}
              </p>
            </button>
          </Tooltip>
        </div>
      </div>
    </aside>
  );
};

module.exports = SideMenu;
