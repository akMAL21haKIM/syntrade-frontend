import { React, useState, useEffect } from "react";
import Head from "next/head";
import { SkeletonLoaderReportsPage } from "../components/SkeletonLoaders";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Cookies from "js-cookie";
import Trades from "../graphql/trades";

const trades = [
  {
    referenceId: "1",
    type: "boom_100-rise",
    currency: "USD",
    transactionTime: "16 Nov 2022,6:24:02 AM",
    transactionType: "Buy",
    profitLoss: -1000.0,
    balance: 9000.0,
  },
  {
    referenceId: "2",
    type: "crash_100-fall",
    currency: "USD",
    transactionTime: "17 Nov 2022,6:24:02 AM",
    transactionType: "Sell",
    profitLoss: -789.9,
    balance: 4000.9,
  },
  {
    referenceId: "3",
    type: "boom_500-rise",
    currency: "USD",
    transactionTime: "18 Nov 2022,6:24:02 AM",
    transactionType: "Buy",
    profitLoss: +900.0,
    balance: 8000.0,
  },
];

// let trades = [];

const getSyntheticModelAndType = () => {
  const text = "boom_500-rise";
  const syntheticType = text.split("-")[0];
  const tradeType = text.split("-")[1];

  console.log(syntheticType);
  console.log(tradeType);
};

const capitaliseFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const sanitiseTime = (unixTime) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  var offsetTime = 18 * 60 * 60 * 60 * 1000;
  var date = new Date(unixTime * 1000);
  console.log("locale: ", date.toLocaleString());
  var year = date.getFullYear();
  var month = monthNames[date.getMonth()];
  var day = String(date.getDate()).padStart(2, "0");
  var hour = String(date.getHours() % 12 || 12).padStart(2, "0");
  var minutes = String(date.getMinutes()).padStart(2, "0");
  var seconds = String(date.getSeconds()).padStart(2, "0");
  var ampm = date.getHours() >= 12 ? "PM" : "AM";

  var sanitisedTime =
    day +
    " " +
    month +
    " " +
    year +
    "," +
    hour +
    ":" +
    minutes +
    ":" +
    seconds +
    " " +
    ampm;

  return sanitisedTime;
};

const Reports = () => {
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const [userTrades, setUserTrades] = useState([]);

  let userId = Cookies.get("auth-token");
  console.log("userId: ", userId);

  const reports = useQuery(Trades, {
    variables: {
      userId: userId,
    },
  });

  // console.log("reports.data123: ", reports.data["tradesByUserId"]);
  // console.log("typeof reports.data: ", typeof reports.data);
  // console.log(
  //   "reports.data.tradesByUserId: ",
  //   Object.values(reports.data)
  // );

  // Object.values(prices.data)[0][1].toFixed(2);

  useEffect(() => {
    setLoader(true);

    setTimeout(async () => {
      if (reports.data !== undefined) {
        setUserTrades(reports.data["tradesByUserId"]);
      }

      setLoader(false);
    }, 1000);
  }, [reports.data]);

  const handleNewTrade = (e) => {
    e.preventDefault();

    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Reports | Syntrade</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main id="report_main" className="justify-between">
        <div id="report_container" className="w-8/12 mt-12 mb-4 mx-auto">
          <div id="report_subcontainer" className="px-4 sm:px-6 lg:px-8">
            <div
              id="report_title_container"
              className="sm:flex sm:items-center"
            >
              <div id="report_title_container_small" className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">Reports</h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all the trades in your account.
                </p>
              </div>
            </div>
            {userTrades.length == 0 ? (
              <div className="text-center pt-20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="mx-auto mb-8 h-12 w-12 text-gray-400"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>

                <p className="mt-1 text-sm text-gray-500">
                  {"Uh oh, you don't have any trades :("}
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={(e) => handleNewTrade(e)}
                    className="items-center rounded border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Create Trade
                  </button>
                </div>
              </div>
            ) : (
              <div
                id="table_container"
                className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg"
              >
                <table
                  id="report_table"
                  className="min-w-full divide-y divide-gray-300"
                >
                  <thead id="table_header" className="bg-gray-50">
                    <tr>
                      <th
                        id="ref_id_head"
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Ref. ID
                      </th>
                      <th
                        id="type_head"
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                      >
                        Type
                      </th>
                      <th
                        id="currency_head"
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                      >
                        Currency
                      </th>
                      <th
                        id="transaction_time_head"
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                      >
                        Transaction Time
                      </th>
                      <th
                        id="transaction_head"
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold md:table-cell"
                      >
                        Transaction
                      </th>
                      <th
                        id="profit_loss_head"
                        scope="col"
                        className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 md:table-cell"
                      >
                        Profit / Loss
                      </th>
                      <th
                        id="balance_head"
                        scope="col"
                        className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 md:table-cell"
                      >
                        Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    id="table_body"
                    className="divide-y divide-gray-200 bg-white"
                  >
                    {loader ? (
                      <SkeletonLoaderReportsPage />
                    ) : (
                      userTrades.map((trade) => (
                        <tr id="table_row" key={trade.trade_id}>
                          <td
                            id="ref_id_col"
                            className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6"
                          >
                            {trade.trade_id}
                            <dl className="font-normal lg:hidden">
                              <dt className="sr-only">Type</dt>
                              <dd className="mt-1 truncate text-gray-700">
                                <span className="inline-flex items-center rounded  px-1 py-0.5 text-xs font-semibold text-gray-800">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-1 inline-flex items-center rounded px-1 py-0.5 text-xs font-semibold text-gray-800">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                                    />
                                  </svg>
                                </span>
                              </dd>
                              <dt className="sr-only sm:hidden">Currency</dt>
                              <dd className="mt-1 truncate text-gray-500">
                                <span className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-800">
                                  {trade.currency.toUpperCase()}
                                </span>
                              </dd>
                              <dt className="sr-only sm:hidden">
                                Transaction Time
                              </dt>
                              <dd className="mt-1 truncate text-gray-700 sm:hidden">
                                {trade.transaction_time}
                              </dd>
                              <dt className="sr-only sm:hidden">Trade Type</dt>
                              <dd
                                className={`mt-1 truncate inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold sm:hidden ${
                                  trade.transaction_type.toLowerCase() == "buy"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {trade.transaction_type}
                              </dd>
                              <dt className="sr-only sm:hidden">
                                Profit / Loss
                              </dt>
                              <dd
                                className={`mt-1 truncate text-gray-500 sm:hidden font-semibold ${
                                  trade.transaction_amount < 0
                                    ? "text-red-500"
                                    : "text-green-500"
                                } `}
                              >
                                {trade.transaction_amount > 0 ? "+" : ""}
                                {trade.transaction_amount}
                              </dd>
                            </dl>
                          </td>
                          <td
                            id="trade_type_col"
                            className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"
                          >
                            <span className="inline-flex items-center rounded  px-1 py-0.5 text-xs font-semibold text-gray-800">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                                />
                              </svg>
                            </span>
                            <span className="ml-1 inline-flex items-center rounded px-1 py-0.5 text-xs font-semibold text-gray-800">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                                />
                              </svg>
                            </span>
                            {/* {trade.type.split("-")[1]} */}
                          </td>
                          <td
                            id="currency_col"
                            className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"
                          >
                            <span className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-800">
                              {trade.currency.toUpperCase()}
                            </span>
                          </td>

                          <td
                            id="transaction_time_col"
                            className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell md:table-cell"
                          >
                            <div className="text-gray-900">
                              {/* {trade.transaction_time.split(",")[0]} */}
                              {
                                sanitiseTime(trade.transaction_time).split(
                                  ","
                                )[0]
                              }
                            </div>
                            <div className="text-gray-500">
                              {/* {trade.transaction_Time.split(",")[1]} */}
                              {
                                sanitiseTime(trade.transaction_time).split(
                                  ","
                                )[1]
                              }
                            </div>
                          </td>

                          <td
                            id="transaction_col"
                            className="hidden px-3 py-4 text-sm lg:table-cell md:table-cell"
                          >
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                trade.transaction_type.toLowerCase() == "buy"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {capitaliseFirstLetter(trade.transaction_type)}
                            </span>
                          </td>
                          <td
                            id="profit_loss_col"
                            className={`hidden px-3 py-4 text-sm lg:table-cell md:table-cell font-semibold text-right ${
                              trade.transaction_amount < 0
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {trade.transaction_amount.toFixed(2) > 0
                              ? `+${trade.transaction_amount.toFixed(2)}`
                              : `${trade.transaction_amount.toFixed(2)}`}
                          </td>
                          <td
                            id="balance_col"
                            className="px-3 py-4 text-sm text-gray-700 text-right"
                          >
                            {trade.current_wallet_balance.toFixed(2)}
                            {/* {"test"} */}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Reports;
