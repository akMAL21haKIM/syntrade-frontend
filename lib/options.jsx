import {
  BoomIcon,
  CrashIcon,
  VolatilityIcon,
  RiseFallIcon,
  MultipliersIcon,
  EvenOddIcon,
  MatchesDiffersIcon,
} from "./icons";

export const syntheticModelOptions = [
  {
    title: "Boom 100 Index",
    icon: (
      <BoomIcon
        fill="none"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      />
    ),
    type: "boom_100",
  },
  // {
  //   title: "Boom 300 Index",
  //   icon: (
  //     <BoomIcon
  //       fill="none"
  //       strokeWidth="1.5"
  //       stroke="currentColor"
  //       className="w-6 h-6"
  //     />
  //   ),
  //   type: "boom_300",
  // },
  // {
  //   title: "Boom 500 Index",
  //   icon: (
  //     <BoomIcon
  //       fill="none"
  //       strokeWidth="1.5"
  //       stroke="currentColor"
  //       className="w-6 h-6"
  //     />
  //   ),
  //   type: "boom_500",
  // },
  {
    title: "Crash 100 Index",
    icon: (
      <CrashIcon
        fill="none"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      />
    ),
    type: "crash_100",
  },
  // {
  //   title: "Crash 300 Index",
  //   icon: (
  //     <CrashIcon
  //       fill="none"
  //       strokeWidth="1.5"
  //       stroke="currentColor"
  //       className="w-6 h-6"
  //     />
  //   ),
  //   type: "crash_300",
  // },
  // {
  //   title: "Crash 500 Index",
  //   icon: (
  //     <CrashIcon
  //       fill="none"
  //       strokeWidth="1.5"
  //       stroke="currentColor"
  //       className="w-6 h-6"
  //     />
  //   ),
  //   type: "crash_500",
  // },
  {
    title: "Volatility 10 Index",
    icon: (
      <VolatilityIcon
        fill="none"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      />
    ),
    type: "vol_10",
  },
  {
    title: "Volatility 25 Index",
    icon: (
      <VolatilityIcon
        fill="none"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      />
    ),
    type: "vol_25",
  },
];

export const tradeTypeOptions = [
  {
    title: "Rise / Fall",
    icon: <RiseFallIcon fill="currentColor" className="w-5 h-5" />,
  },
  {
    title: "Multipliers",
    icon: (
      <MultipliersIcon
        fill="none"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5"
      />
    ),
  },
  {
    title: "Even / Odd",
    icon: (
      <EvenOddIcon
        fill="none"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5"
      />
    ),
  },
  {
    title: "Matches / Differs",
    icon: (
      <MatchesDiffersIcon
        fill="none"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5"
      />
    ),
  },
];
