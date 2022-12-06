import { React, useState, useEffect } from "react";
import Head from "next/head";
import { SkeletonLoaderReportsPage } from "../components/SkeletonLoaders";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Cookies from "js-cookie";
import Trades from "../graphql/trades";
import {
  parseMoney,
  getSyntheticModelIcon,
  getTradeTypeIcon,
  capitaliseFirstLetter,
  sanitiseTime,
} from "../lib/utilities";

const Reports = () => {
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const [userTrades, setUserTrades] = useState([]);

  let userId = Cookies.get("auth-token");

  const reports = useQuery(Trades, {
    variables: {
      userId: userId,
    },
  });

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
                  className="mx-auto mb-8 h-12 w-12 text-gray-500"
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
                                  {getSyntheticModelIcon(trade.synthetic_type)}
                                </span>
                                <span className="ml-1 inline-flex items-center rounded px-1 py-0.5 text-xs font-semibold text-gray-800">
                                  {getTradeTypeIcon(trade.synthetic_type)}
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
                                {
                                  sanitiseTime(trade.transaction_time).split(
                                    ","
                                  )[0]
                                }
                              </dd>
                              <dd className="mt-1 truncate text-gray-500 sm:hidden">
                                {
                                  sanitiseTime(trade.transaction_time).split(
                                    ","
                                  )[1]
                                }
                              </dd>
                              <dt className="sr-only sm:hidden">Trade Type</dt>
                              <dd
                                className={`mt-1 truncate inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold sm:hidden ${
                                  trade.transaction_type.toLowerCase() == "buy"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {capitaliseFirstLetter(trade.transaction_type)}
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
                                {trade.transaction_amount > 0
                                  ? `+${parseMoney(trade.transaction_amount)}`
                                  : `${parseMoney(trade.transaction_amount)}`}
                              </dd>
                            </dl>
                          </td>
                          <td
                            id="trade_type_col"
                            className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"
                          >
                            <span className="inline-flex items-center rounded  px-1 py-0.5 text-xs font-semibold text-gray-800">
                              {getSyntheticModelIcon(trade.synthetic_type)}
                            </span>
                            <span className="ml-1 inline-flex items-center rounded px-1 py-0.5 text-xs font-semibold text-gray-800">
                              {getTradeTypeIcon(trade.synthetic_type)}
                            </span>
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
                              {
                                sanitiseTime(trade.transaction_time).split(
                                  ","
                                )[0]
                              }
                            </div>
                            <div className="text-gray-500">
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
                            {trade.transaction_amount > 0
                              ? `+${parseMoney(trade.transaction_amount)}`
                              : `${parseMoney(trade.transaction_amount)}`}
                          </td>
                          <td
                            id="balance_col"
                            className="px-3 py-4 text-sm text-gray-700 text-right"
                          >
                            {parseMoney(trade.current_wallet_balance)}
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
