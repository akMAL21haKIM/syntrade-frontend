import { React, useState, useEffect } from "react";
import RangeSlider from "./RangeSlider";
import { SolidDollarIcon } from "../lib/icons";
import { useQuery, useMutation, gql } from "@apollo/client";
import { TooltipBox, TooltipButton } from "./Tooltips";
import Prices from "../graphql/prices";
import CurrentBalance from "../graphql/currentBalance";
import CreateTrade from "../graphql/createTrade";
import TradeTypeDropdown from "./TradeTypeDropdown";
import { AuthState } from "./auth/AuthProvider";
import Cookies from "js-cookie";
import { parseMoney } from "../lib/utilities";

const SideMenu = ({
  syntheticModel,
  setOpenTradeSuccessModal,
  setOpenLogInNeededModal,
  setOpenTradeErrorModal,
}) => {
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
  const [callPrice, setCallPrice] = useState(0.0);
  const [putPrice, setPutPrice] = useState(0.0);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const syntheticModelType = syntheticModel.type;
  const simplifiedTradeType = tradeType.simplified_title;
  const parsedWagerAmount = parseFloat(wagerAmount);

  const { user } = AuthState();

  let userId = Cookies.get("auth-token");

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
      userId: userId,
    },
  });

  const [createTrade, { data, loading, error }] = useMutation(CreateTrade);

  useEffect(() => {
    setIsUserLoggedIn(user);
  }, [user, userId]);

  useEffect(() => {
    currentBalance.refetch();

    if (
      currentBalance.data &&
      currentBalance.data !== undefined &&
      currentBalance.data !== null
    ) {
      setCurrentWalletBalance(currentBalance.data["currentBalance"].toFixed(2));
    }
  }, [blueIconTransition, redIconTransition, currentBalance.data]);

  useEffect(() => {
    setLoader(true);

    setTimeout(async () => {
      if (!wagerAmountError && prices.data != null) {
        if (prices.data.prices != null && prices.data.prices[0] != null) {
          setCallPrice(Object.values(prices.data)[0][0]);
        }
        if (prices.data.prices != null && prices.data.prices[1] != null) {
          setPutPrice(Object.values(prices.data)[0][1]);
        }
        setLoader(false);
      }
    }, 1000);
  }, [tradeType, wagerAmount, wagerType, wagerAmountError, ticks, prices.data]);

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

    if (!isUserLoggedIn || isUserLoggedIn === undefined) {
      setOpenLogInNeededModal(true);
    } else {
      // If user has enough balance in wallet
      if (currentWalletBalance >= wagerAmount) {
        // Create trade
        await createTrade({
          variables: {
            userId: userId,
            syntheticType: syntheticTrade,
            optionType: optionType,
            wagerAmount: wagerAmount,
            ticks: ticks,
            lastDigitPrediction: lastDigitPrediction,
          },
          onError: (err) => {},
          onCompleted: ({ data }) => {
            setOpenTradeSuccessModal(true);
          },
        });
      }
      // Else if user doesn't hv enough balance in wallet, show error in popup
      else {
        setOpenTradeErrorModal(true);
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
          {isUserLoggedIn && currentBalance.data ? (
            <p className="flex select-none items-center p-1 text-base font-semibold tracking-wide text-gray-900 rounded-lg">
              <SolidDollarIcon
                className="w-6 h-6 fill-indigo-600"
                fill="currentColor"
              />

              <span className="ml-3 my-auto">
                {parseMoney(currentWalletBalance)} MYR
              </span>
            </p>
          ) : !isUserLoggedIn ? (
            <p className="flex select-none items-center p-1 text-base font-semibold tracking-wide text-gray-900 rounded-lg">
              <SolidDollarIcon
                className="w-6 h-6 fill-indigo-600"
                fill="currentColor"
              />

              <span className="ml-3 my-auto">
                {parseMoney(currentWalletBalance)} MYR
              </span>
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
          msg="Minimum stake of 1 and maximum payout of 30000"
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
                    disableDecrement ||
                    (wagerAmount <= 0.0 && wagerType == "stake")
                      ? "disabled:pointer-events-none cursor-not-allowed"
                      : "cursor-pointer"
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
                    disableIncrement ||
                    (wagerAmount > 30000.0 && wagerType == "payout")
                      ? "disabled:pointer-events-none cursor-not-allowed"
                      : "cursor-pointer"
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
              ) : prices.data && Object.values(prices.data)[0] != null ? (
                (wagerType == "stake" &&
                  Object.values(prices.data)[0][0] <= 30000.0) ||
                (wagerType == "payout" && wagerAmount >= 1.0) ? (
                  <p className="text-sm font-semibold text-gray-700 mb-1 text-right focus:outline-none cursor-default select-none">
                    {parseMoney(Object.values(prices.data)[0][0])} MYR
                  </p>
                ) : (
                  <div className="animate-pulse h-[1.25rem] flex bg-gray-300 rounded focus:outline-none cursor-default select-none"></div>
                )
              ) : (
                <div className="animate-pulse h-[1.25rem] flex bg-gray-300 rounded focus:outline-none cursor-default select-none"></div>
              )}
            </div>
            <TooltipButton
              msg="Minimum stake of 1 and maximum payout of 30000"
              wagerAmountError={wagerAmountError}
            >
              <button
                className={`px-4 py-4 rounded w-full grid grid-cols-2 focus:outline-none ${
                  loader ||
                  (callPrice > 30000 && wagerType == "stake") ||
                  callPrice == null ||
                  blueIconTransition ||
                  redIconTransition
                    ? "bg-indigo-600 opacity-50 disabled:pointer-events-none cursor-not-allowed"
                    : "hover:bg-indigo-700 bg-indigo-600"
                }`}
              >
                <div
                  className={`bg-transparent ${
                    blueIconTransition
                      ? "translate-x-28 ease-out cubic-bezier(0.4, 0, 1, 1) duration-500 disabled:pointer-events-none cursor-not-allowed"
                      : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();

                    if (callPrice <= 30000 || callPrice != null) {
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
                    }
                  }}
                >
                  {tradeType.blueIcon}
                </div>

                <p
                  className={`text-sm font-semibold text-white text-right focus:outline-none select-none ${
                    callPrice > 30000 ||
                    callPrice == null ||
                    blueIconTransition ||
                    redIconTransition
                      ? "disabled:pointer-events-none cursor-not-allowed"
                      : ""
                  }`}
                >
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
              ) : prices.data && Object.values(prices.data)[0] != null ? (
                (wagerType == "stake" &&
                  Object.values(prices.data)[0][1] <= 30000.0) ||
                (wagerType == "payout" && wagerAmount >= 1.0) ? (
                  <p className="text-sm font-semibold text-gray-700 mb-1 text-right focus:outline-none cursor-default select-none">
                    {parseMoney(Object.values(prices.data)[0][1])} MYR
                  </p>
                ) : (
                  <div className="animate-pulse h-[1.25rem] flex bg-gray-300 rounded focus:outline-none cursor-default select-none"></div>
                )
              ) : (
                <div className="animate-pulse h-[1.25rem] flex bg-gray-300 rounded focus:outline-none cursor-default select-none"></div>
              )}
            </div>
            <TooltipButton
              msg="Minimum stake of 1 and maximum payout of 30000"
              wagerAmountError={wagerAmountError}
            >
              <button
                className={`px-4 py-4 rounded w-full grid grid-cols-2 focus:outline-none ${
                  loader ||
                  (putPrice > 30000 && wagerType == "stake") ||
                  putPrice == null ||
                  blueIconTransition ||
                  redIconTransition
                    ? "bg-rose-600 opacity-50 disabled:pointer-events-none cursor-not-allowed"
                    : "hover:bg-rose-700 bg-rose-600"
                }`}
              >
                <div
                  className={`bg-transparent ${
                    redIconTransition
                      ? "translate-x-28 ease-out cubic-bezier(0.4, 0, 1, 1) duration-500 disabled:pointer-events-none cursor-not-allowed"
                      : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();

                    if (putPrice <= 30000 || putPrice != null) {
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
                    }
                  }}
                >
                  {tradeType.redIcon}
                </div>

                <p
                  className={`text-sm font-semibold text-white text-right focus:outline-none select-none ${
                    (putPrice > 30000 && wagerType == "stake") ||
                    putPrice == null ||
                    blueIconTransition ||
                    redIconTransition
                      ? "disabled:pointer-events-none cursor-not-allowed"
                      : ""
                  }`}
                >
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
