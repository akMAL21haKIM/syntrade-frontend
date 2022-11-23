import { BoomIcon } from "../../lib/icons";

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

export default function SkeletonLoaderReportsPage() {
  return Array(5)
    .fill()
    .map((item, index) => (
      <tr key={index} className="animate-pulse">
        <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
          <div className="h-8 flex bg-gray-300 rounded"></div>
        </td>
        <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
          <div className="h-8 flex bg-gray-300 rounded"></div>
        </td>
        <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
          <div className="h-8 flex bg-gray-300 rounded"></div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 space-y-1 text-sm text-gray-500 hidden lg:table-cell md:table-cell">
          <div className="h-5 flex bg-gray-300 rounded"></div>
          <div className="h-5 flex bg-gray-300 rounded"></div>
        </td>
        <td className="whitespace-nowrap hidden px-3 py-4 text-sm lg:table-cell md:table-cell">
          <div className="h-8 flex bg-gray-300 rounded"></div>
        </td>
        <td className="whitespace-nowrap hidden px-3 py-4 text-sm lg:table-cell md:table-cell font-semibold text-right">
          <div className="h-8 bg-gray-300 rounded flex-end"></div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 pr-4 text-sm text-gray-700 text-right">
          <div className="h-8 bg-gray-300 rounded flex-end"></div>
        </td>
      </tr>
    ));
}
