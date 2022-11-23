import { React, useState, useEffect } from "react";
import Footer from "./components/Footer";
import Head from "next/head";
import NavBar from "./components/NavBar";
import SkeletonLoaderReportsPage from "./components/SkeletonLoaderReportsPage";

const people = [
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
    referenceId: "1",
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
      <main>
        <NavBar />
        {loader ? (
          <SkeletonLoaderReportsPage />
        ) : (
          <div className="w-8/12 mt-12 mb-4 mx-auto">
            {/* <div className="flex justify-center items-center"> */}
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-xl font-semibold text-gray-900">
                    Reports
                  </h1>
                  <p className="mt-2 text-sm text-gray-700">
                    A list of all the trades in your account.
                  </p>
                </div>
              </div>
              <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Ref. ID
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                      >
                        Currency
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                      >
                        Transaction Time
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                      >
                        Transaction
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 lg:table-cell"
                      >
                        Profit / Loss
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                      >
                        Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {people.map((person) => (
                      <tr key={person.referenceId}>
                        <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                          {person.referenceId}
                          <dl className="font-normal lg:hidden">
                            <dt className="sr-only">Type</dt>
                            <dd className="mt-1 truncate text-gray-700">
                              {person.type}
                            </dd>
                            <dt className="sr-only sm:hidden">Currency</dt>
                            <dd className="mt-1 truncate text-gray-500">
                              <span className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-800">
                                {person.currency.toUpperCase()}
                              </span>
                            </dd>
                            <dt className="sr-only sm:hidden">
                              Transaction Time
                            </dt>
                            <dd className="mt-1 truncate text-gray-700 sm:hidden">
                              {person.transactionTime}
                            </dd>
                            <dt className="sr-only sm:hidden">Trade Type</dt>
                            <dd className="mt-1 truncate text-gray-500 sm:hidden">
                              {person.transactionType}
                            </dd>
                            <dt className="sr-only sm:hidden">Profit / Loss</dt>
                            <dd className="mt-1 truncate text-gray-500 sm:hidden">
                              {person.profitLoss}
                            </dd>
                          </dl>
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
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
                                stroke-linecap="round"
                                stroke-linejoin="round"
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
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                              />
                            </svg>
                          </span>
                          {/* {person.type.split("-")[1]} */}
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                          <span className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-800">
                            {person.currency.toUpperCase()}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell md:table-cell">
                          <div className="text-gray-900">
                            {person.transactionTime.split(",")[0]}
                          </div>
                          <div className="text-gray-500">
                            {person.transactionTime.split(",")[1]}
                          </div>
                        </td>

                        <td className="hidden px-3 py-4 text-sm lg:table-cell md:table-cell">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              person.transactionType.toLowerCase() == "buy"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {person.transactionType}
                          </span>
                        </td>
                        <td
                          className={`hidden px-3 py-4 text-sm lg:table-cell md:table-cell font-semibold text-right ${
                            person.profitLoss < 0
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {person.profitLoss.toFixed(2) > 0
                            ? `+${person.profitLoss.toFixed(2)}`
                            : `${person.profitLoss.toFixed(2)}`}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-700 text-right">
                          {person.balance.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* </div> */}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Reports;
