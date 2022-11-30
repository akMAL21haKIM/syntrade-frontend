import {
  BoomIcon,
  CrashIcon,
  VolatilityIcon,
  RiseFallIcon,
  MultipliersIcon,
  EvenOddIcon,
  MatchesDiffersIcon,
  RiseIcon,
  FallIcon,
  EvenIcon,
  OddIcon,
  MatchesIcon,
  DiffersIcon,
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
    trade_type: [
      {
        title: "Rise / Fall",
        simplified_title: "rise_fall",
        icon: <RiseFallIcon fill="currentColor" className="w-5 h-5" />,
        blueIcon: (
          <RiseIcon
            fill="none"
            strokeWidth={2}
            stroke="#ffffff"
            className="w-5 h-5 stroke-white"
          />
        ),
        redIcon: (
          <FallIcon
            fill="none"
            strokeWidth={2}
            stroke="#ffffff"
            className="w-5 h-5 stroke-white"
          />
        ),
        blueText: "Rise",
        redText: "Fall",
      },
    ],
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
    trade_type: [
      {
        title: "Rise / Fall",
        simplified_title: "rise_fall",
        icon: <RiseFallIcon fill="currentColor" className="w-5 h-5" />,
        blueIcon: (
          <RiseIcon
            fill="none"
            strokeWidth={2}
            stroke="#ffffff"
            className="w-5 h-5 stroke-white"
          />
        ),
        redIcon: (
          <FallIcon
            fill="none"
            strokeWidth={2}
            stroke="#ffffff"
            className="w-5 h-5 stroke-white"
          />
        ),
        blueText: "Rise",
        redText: "Fall",
      },
    ],
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
    type: "volatility_10",
    trade_type: [
      {
        title: "Even / Odd",
        simplified_title: "even_odd",
        icon: (
          <EvenOddIcon
            fill="none"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          />
        ),
        blueIcon: (
          <EvenIcon
            fill="none"
            strokeWidth={2}
            stroke="#ffffff"
            className="w-5 h-5 stroke-white"
          />
        ),
        redIcon: (
          <OddIcon
            fill="none"
            strokeWidth={2}
            stroke="#ffffff"
            className="w-5 h-5 stroke-white"
          />
        ),
        blueText: "Even",
        redText: "Odd",
      },
      {
        title: "Matches / Differs",
        simplified_title: "matches_differs",
        icon: (
          <MatchesDiffersIcon
            fill="none"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          />
        ),
        blueIcon: (
          <MatchesIcon
            fill="none"
            strokeWidth={2}
            stroke="#ffffff"
            className="w-5 h-5 stroke-white"
          />
        ),
        redIcon: (
          <DiffersIcon
            fill="none"
            strokeWidth={2}
            stroke="#ffffff"
            className="w-5 h-5 stroke-white"
          />
        ),
        blueText: "Matches",
        redText: "Differs",
      },
      {
        title: "Rise / Fall",
        simplified_title: "rise_fall",
        icon: <RiseFallIcon fill="currentColor" className="w-5 h-5" />,
        blueIcon: (
          <RiseIcon
            fill="none"
            strokeWidth={2}
            stroke="#ffffff"
            className="w-5 h-5 stroke-white"
          />
        ),
        redIcon: (
          <FallIcon
            fill="none"
            strokeWidth={2}
            stroke="#ffffff"
            className="w-5 h-5 stroke-white"
          />
        ),
        blueText: "Rise",
        redText: "Fall",
      },
    ],
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
    type: "volatility_25",
    trade_type: [
      {
        title: "Even / Odd",
        simplified_title: "even_odd",
        icon: (
          <EvenOddIcon
            fill="none"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          />
        ),
        blueIcon: (
          <EvenIcon
            fill="none"
            strokeWidth={2}
            stroke="#ffffff"
            className="w-5 h-5 stroke-white"
          />
        ),
        redIcon: (
          <OddIcon
            fill="none"
            strokeWidth={2}
            stroke="#ffffff"
            className="w-5 h-5 stroke-white"
          />
        ),
        blueText: "Even",
        redText: "Odd",
      },
      {
        title: "Matches / Differs",
        simplified_title: "matches_differs",
        icon: (
          <MatchesDiffersIcon
            fill="none"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          />
        ),
        blueIcon: (
          <MatchesIcon
            fill="none"
            strokeWidth={2}
            stroke="#ffffff"
            className="w-5 h-5 stroke-white"
          />
        ),
        redIcon: (
          <DiffersIcon
            fill="none"
            strokeWidth={2}
            stroke="#ffffff"
            className="w-5 h-5 stroke-white"
          />
        ),
        blueText: "Matches",
        redText: "Differs",
      },
      {
        title: "Rise / Fall",
        simplified_title: "rise_fall",
        icon: <RiseFallIcon fill="currentColor" className="w-5 h-5" />,
        blueIcon: (
          <RiseIcon
            fill="none"
            strokeWidth={2}
            stroke="#FFFFFF"
            className="w-5 h-5 stroke-white"
          />
        ),
        redIcon: (
          <FallIcon
            fill="none"
            strokeWidth={2}
            stroke="#FFFFFF"
            className="w-5 h-5 stroke-white"
          />
        ),
        blueText: "Rise",
        redText: "Fall",
      },
    ],
  },
];

export const tradeTypeOptions = [
  {
    title: "Rise / Fall",
    simplified_title: "rise_fall",
    icon: <RiseFallIcon fill="currentColor" className="w-5 h-5" />,
    blueIcon: (
      <RiseIcon
        fill="none"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5 stroke-white"
      />
    ),
    redIcon: (
      <FallIcon
        fill="none"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5 stroke-white"
      />
    ),
    blueText: "Rise",
    redText: "Fall",
  },
  // {
  //   title: "Multipliers",
  //   icon: (
  //     <MultipliersIcon
  //       fill="none"
  //       strokeWidth="1.5"
  //       stroke="currentColor"
  //       className="w-5 h-5"
  //     />
  //   ),
  // },
  {
    title: "Even / Odd",
    simplified_title: "even_odd",
    icon: (
      <EvenOddIcon
        fill="none"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5"
      />
    ),
    blueIcon: (
      <EvenIcon
        fill="none"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5 stroke-white"
      />
    ),
    redIcon: (
      <OddIcon
        fill="none"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5 stroke-white"
      />
    ),
    blueText: "Even",
    redText: "Odd",
  },
  {
    title: "Matches / Differs",
    simplified_title: "matches_differs",
    icon: (
      <MatchesDiffersIcon
        fill="none"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5"
      />
    ),
    blueIcon: (
      <MatchesIcon
        fill="none"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5 stroke-white"
      />
    ),
    redIcon: (
      <DiffersIcon
        fill="none"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5 stroke-white"
      />
    ),
    blueText: "Matches",
    redText: "Differs",
  },
];
