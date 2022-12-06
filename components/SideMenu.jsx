import { React, useState, useEffect, useContext } from "react";
import RangeSlider from "./RangeSlider";
import { SolidDollarIcon } from "../lib/icons";
import { useQuery, useMutation, gql } from "@apollo/client";
import { TooltipBox, TooltipButton } from "./Tooltips";
import Prices from "../graphql/prices";
import CurrentBalance from "../graphql/currentBalance";
import CreateTrade from "../graphql/createTrade";
import TradeTypeDropdown from "./TradeTypeDropdown";
import AuthContext from "../components/auth/AuthContext";
import { AuthState } from "./auth/AuthProvider";

const SideMenu = ({ syntheticModel, setOpenTradeSuccessModal, notify }) => {
  const [loader, setLoader] = useState(false);
  const [wagerType, setWagerType] = useState("stake");
  const [wagerAmount, setWagerAmount] = useState(10.0);
  const [tradeType, setTradeType] = useState(syntheticModel.trade_type[0]);
  const [disableIncrement, setDisableIncrement] = useState(false);
  const [disableDecrement, setDisableDecrement] = useState(false);
  const [blueIconTransition, setBlueIconTransition] = useState(false);
  const [redIconTransition, setRedIconTransition] = useState(false);
  const [lastDigitPrediction, setLastDigitPrediction] = useState(0);
  const [ticks, setTicks] = useState(5);
  const [wagerAmountError, setWagerAmountError] = useState(false);
  const [currentWalletBalance, setCurrentWalletBalance] = useState(
    (10000.0).toFixed(2)
  );

  const syntheticModelType = syntheticModel.type;
  const simplifiedTradeType = tradeType.simplified_title;
  const parsedWagerAmount = parseFloat(wagerAmount);
  const userId = 1;

  // const isUserLoggedIn = useContext(AuthContext).user;
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const { user } = AuthState();

  useEffect(() => {
    setIsUserLoggedIn(user);
  }, [user]);

  const prices = useQuery(Prices, {
    variables: {
      wagerType,
      syntheticModelType,
      simplifiedTradeType,
      parsedWagerAmount,
      ticks,
    },
  });

  const currentBalance = useQuery(CurrentBalance, {
    variables: {
      userId,
    },
  });

  const [createTrade, { data, loading, error }] = useMutation(CreateTrade);

  useEffect(() => {
    currentBalance.refetch();

    console.log("currentBalance.data", currentBalance.data);

    if (
      currentBalance.data &&
      (currentBalance.data !== undefined || currentBalance.data !== null)
    ) {
      setCurrentWalletBalance(currentBalance.data["currentBalance"].toFixed(2));
    }
  }, [blueIconTransition, redIconTransition, notify]);

  useEffect(() => {
    setLoader(true);

    setTimeout(async () => {
      if (!wagerAmountError && prices.data != null) {
        setLoader(false);
      }
    }, 1000);
  }, [tradeType, wagerAmount, wagerType, wagerAmountError, ticks, prices.data]);

  // Increment wager amount
  const incrementWagerAmount = (e) => {
    e.preventDefault();

    setDisableDecrement(false);

    if (parseFloat(wagerAmount) > 30000.0) {
      // Disable increment button
      setDisableIncrement(true);

      // Show tooltip error message
      setWagerAmountError(true);
    }

    setWagerAmount(wagerAmount + 1.0);
    setWagerAmountError(false);
  };

  // Decrement wager amount
  const decrementWagerAmount = (e) => {
    e.preventDefault();

    setDisableIncrement(false);

    // If wagerAmount is less than 0, set it to 0
    if (wagerAmount <= 0.0) {
      setWagerAmount(0.0);

      // Disable decrement button
      setDisableDecrement(true);

      // Show tooltip error message
      setWagerAmountError(true);
    } else {
      // Enable decrement button
      setDisableDecrement(false);
      setWagerAmount(wagerAmount - 1.0);
      setWagerAmountError(false);
    }
  };

  const handleWagerAmountChange = (e) => {
    // Remove non digit characters from input
    // TODO: Make sure input can only take one period
    // TODO: Make sure input can take only two numbers after period
    const sanitisedInput = e.target.value.replace(/\D/g, "");

    // If wagerAmount is less than 0, set it to 0
    if (sanitisedInput <= 0) {
      setWagerAmount(0.0);
      setWagerAmountError(true);
    } else if (sanitisedInput > 30000.0) {
      setWagerAmount(sanitisedInput);
      setWagerAmountError(true);
    } else {
      setWagerAmount(sanitisedInput);
      setWagerAmountError(false);
    }
  };

  const handleTrade = async (singleTradeType, optionType) => {
    const syntheticTrade = syntheticModelType + "_" + singleTradeType;

    if (!isUserLoggedIn) {
      setOpenTradeSuccessModal(true);
    } else {
      // If user has enough balance in wallet
      if (currentWalletBalance >= wagerAmount) {
        // Create trade
        await createTrade({
          variables: {
            syntheticType: syntheticTrade,
            optionType: optionType,
            wagerAmount: wagerAmount,
            ticks: ticks,
            lastDigitPrediction: lastDigitPrediction,
          },
        });

        // Do popup
        setOpenTradeSuccessModal(true);
      }
      // Else if user doesn't hv enough balance in wallet, show error in popup
      else {
        console.log("Error: Not enough balance in wallet");
      }
    }
  };

  return (
    <>
      <aside
        className="hidden 2xl:block xl:block lg:block md:block sm:hidden w-80 h-full right-0 absolute bg-gray-50 pb-8"
        aria-label="Sidebar"
      >
        <div className="mt-8 mx-6 py-2 px-4 bg-white rounded border-4 border-gray-100 ">
          {currentBalance.data ? (
            <p className="flex select-none items-center p-1 text-base font-semibold tracking-wide text-gray-900 rounded-lg">
              <SolidDollarIcon
                className="w-6 h-6 fill-indigo-600"
                fill="currentColor"
              />

              <span className="ml-3 my-auto">{currentWalletBalance} MYR</span>
            </p>
          ) : (
            <p className="flex select-none items-center p-1 text-base font-semibold tracking-wide text-gray-900 rounded-lg">
              <SolidDollarIcon
                className="w-7 h-7 fill-indigo-600"
                fill="currentColor"
              />

              <span className="animate-pulse ml-3 w-full h-4 bg-gray-300 rounded border-4 border-gray-300 focus:outline-none cursor-default select-none"></span>
            </p>
          )}
        </div>
        <div className="z-30 mt-6 mx-6 py-2 px-4 bg-white rounded border-4 border-gray-100 hover:border-gray-200 focus:outline-none">
          <TradeTypeDropdown
            tradeType={tradeType}
            setTradeType={setTradeType}
            syntheticModel={syntheticModel}
          />
        </div>
        <div className="m-6 py-2 px-4 bg-white rounded border-4 border-gray-100 ">
          <RangeSlider ticks={ticks} setTicks={setTicks}></RangeSlider>
        </div>
        <TooltipBox
          msg="Minimum stake of 1.00 and maximum payout of 30000"
          wagerAmountError={wagerAmountError}
        >
          <div className="relative mt-6 mx-6 bg-gray-50 rounded border-4 border-gray-100">
            <div className="relative">
              <span className="relative grid grid-cols-2 justify-between rounded">
                <button
                  type="button"
                  className={`rounded-tl w-full px-4 py-2 text-sm font-semibold focus:outline-none ${
                    wagerType == "stake"
                      ? "bg-indigo-600 text-white"
                      : "bg-transparent text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();

                    if (wagerType == "stake") {
                      setWagerType("payout");
                    } else {
                      setWagerType("stake");
                    }
                  }}
                >
                  Stake
                </button>

                <button
                  type="button"
                  className={`rounded-tr w-full px-4 py-2 text-sm font-semibold focus:outline-none ${
                    wagerType == "payout"
                      ? "bg-indigo-600 text-white"
                      : "bg-transparent text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (wagerType == "payout") {
                      setWagerType("stake");
                    } else {
                      setWagerType("payout");
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
                  onClick={(e) => decrementWagerAmount(e)}
                >
                  –
                </button>
                <div className="col-span-2 grid grid-cols-3 justify-center align-center pr-4 focus:outline-none border-none">
                  <input
                    type="text"
                    className="font-medium text-gray-700 col-span-2 focus:outline-none border-none border-transparent focus:border-transparent focus:ring-0"
                    name="stake-payout-input"
                    value={wagerAmount}
                    onChange={(e) => handleWagerAmountChange(e)}
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
                  onClick={(e) => incrementWagerAmount(e)}
                >
                  +
                </button>
              </span>
            </div>
          </div>
        </TooltipBox>
        <div
          className={`mt-6 mx-6 py-2 px-4 bg-white rounded border-4 border-gray-100 ${
            tradeType.simplified_title == "matches_differs" ? "block" : "hidden"
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
                    lastDigitPrediction == index
                      ? "bg-indigo-600 text-white border-transparent"
                      : "bg-gray-50 border-gray-100 text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={(e) => setLastDigitPrediction(index)}
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
                {wagerType == "stake" ? "Payout" : "Stake"}
              </p>
              {loader ? (
                <div className="animate-pulse h-[1.25rem] flex bg-gray-300 rounded focus:outline-none cursor-default select-none"></div>
              ) : prices.data ? (
                <p className="text-sm font-semibold text-gray-700 mb-1 text-right focus:outline-none cursor-default select-none">
                  {Object.values(prices.data)[0][0].toFixed(2)} MYR
                </p>
              ) : (
                <div className="animate-pulse h-[1.25rem] flex bg-gray-300 rounded focus:outline-none cursor-default select-none"></div>
              )}
            </div>
            <TooltipButton
              msg="Minimum stake of 1.00 and maximum payout of 30000"
              wagerAmountError={wagerAmountError}
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
                      ? "translate-x-28 ease-out cubic-bezier(0.4, 0, 1, 1) duration-500 disabled:pointer-events-none"
                      : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();

                    if (blueIconTransition == false) {
                      setBlueIconTransition(true);

                      setTimeout(async () => {
                        setBlueIconTransition(false);
                      }, 1000);
                    } else {
                      setBlueIconTransition(false);
                    }

                    handleTrade(
                      tradeType.simplified_title.split("_")[0],
                      "call"
                    );
                  }}
                >
                  {tradeType.blueIcon}
                </div>

                <p className="text-sm font-semibold text-white text-right focus:outline-none cursor-default select-none">
                  {tradeType.blueText}
                </p>
              </button>
            </TooltipButton>
          </div>
          <div>
            <div className="grid grid-cols-2 mt-4">
              <p className="text-sm font-light text-gray-500 mb-1 focus:outline-none cursor-default select-none">
                {wagerType == "stake" ? "Payout" : "Stake"}
              </p>
              {loader ? (
                <div className="animate-pulse h-[1.25rem] flex bg-gray-300 rounded focus:outline-none cursor-default select-none"></div>
              ) : prices.data ? (
                <p className="text-sm font-semibold text-gray-700 mb-1 text-right focus:outline-none cursor-default select-none">
                  {Object.values(prices.data)[0][1].toFixed(2)} MYR
                </p>
              ) : (
                <div className="animate-pulse h-[1.25rem] flex bg-gray-300 rounded focus:outline-none cursor-default select-none"></div>
              )}
            </div>
            <TooltipButton
              msg="Minimum stake of 1.00 and maximum payout of 30000.00. Current payout is 345679.00"
              wagerAmountError={wagerAmountError}
            >
              <button
                className={`px-4 py-4 rounded w-full grid grid-cols-2 focus:outline-none ${
                  loader
                    ? "bg-rose-600 opacity-50 disabled:pointer-events-none"
                    : "hover:bg-rose-700 bg-rose-600"
                }`}
              >
                <div
                  className={`bg-transparent ${
                    redIconTransition
                      ? "translate-x-28 ease-out cubic-bezier(0.4, 0, 1, 1) duration-500 disabled:pointer-events-none"
                      : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();

                    if (redIconTransition == false) {
                      setRedIconTransition(true);

                      setTimeout(async () => {
                        setRedIconTransition(false);
                      }, 1000);
                    } else {
                      setRedIconTransition(false);
                    }

                    handleTrade(
                      tradeType.simplified_title.split("_")[1],
                      "put"
                    );
                  }}
                >
                  {tradeType.redIcon}
                </div>

                <p className="text-sm font-semibold text-white text-right focus:outline-none cursor-default select-none">
                  {tradeType.redText}
                </p>
              </button>
            </TooltipButton>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideMenu;
