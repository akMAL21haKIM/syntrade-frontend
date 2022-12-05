import { React, useState, useEffect } from "react";
import Head from "next/head";
import { SkeletonLoaderReportsPage } from "../components/SkeletonLoaders";

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

const getSyntheticModelAndType = () => {
  const text = "boom_500-rise";
  const syntheticType = text.split("-")[0];
  const tradeType = text.split("-")[1];

  console.log(syntheticType);
  console.log(tradeType);
};

const Reports = () => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);

    setTimeout(async () => {
      setLoader(false);
    }, 1000);
  }, []);

  return (
    <>
      <Head>
        <title>Reports | Syntrade</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main id="report_main" className="justify-between">
        <div id="report_container" className="w-8/12 mt-12 mb-4 mx-auto">
          {/* <div className="flex justify-center items-center"> */}
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
                    trades.map((trade) => (
                      <tr id="table_row" key={trade.referenceId}>
                        <td
                          id="ref_id_col"
                          className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6"
                        >
                          {trade.referenceId}
                          <dl className="font-normal lg:hidden">
                            <dt className="sr-only">Type</dt>
                            <dd className="mt-1 truncate text-gray-700">
                              {trade.type}
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
                              {trade.transactionTime}
                            </dd>
                            <dt className="sr-only sm:hidden">Trade Type</dt>
                            <dd
                              className={`mt-1 truncate inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold sm:hidden ${
                                trade.transactionType.toLowerCase() == "buy"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {trade.transactionType}
                            </dd>
                            <dt className="sr-only sm:hidden">Profit / Loss</dt>
                            <dd
                              className={`mt-1 truncate text-gray-500 sm:hidden font-semibold ${
                                trade.profitLoss < 0
                                  ? "text-red-500"
                                  : "text-green-500"
                              } `}
                            >
                              {trade.profitLoss}
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
                            {trade.transactionTime.split(",")[0]}
                          </div>
                          <div className="text-gray-500">
                            {trade.transactionTime.split(",")[1]}
                          </div>
                        </td>

                        <td
                          id="transaction_col"
                          className="hidden px-3 py-4 text-sm lg:table-cell md:table-cell"
                        >
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              trade.transactionType.toLowerCase() == "buy"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {trade.transactionType}
                          </span>
                        </td>
                        <td
                          id="profit_loss_col"
                          className={`hidden px-3 py-4 text-sm lg:table-cell md:table-cell font-semibold text-right ${
                            trade.profitLoss < 0
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {trade.profitLoss.toFixed(2) > 0
                            ? `+${trade.profitLoss.toFixed(2)}`
                            : `${trade.profitLoss.toFixed(2)}`}
                        </td>
                        <td
                          id="balance_col"
                          className="px-3 py-4 text-sm text-gray-700 text-right"
                        >
                          {trade.balance.toFixed(2)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Reports;
