import {
  BoomIcon,
  CrashIcon,
  VolatilityIcon,
  RiseIcon,
  FallIcon,
  EvenIcon,
  OddIcon,
  MatchesIcon,
  DiffersIcon,
} from "../lib/icons";

export const convertRemToPixels = (rem) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const parseMoney = (amount) => {
  return Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const getSyntheticModelIcon = (syntheticModelType) => {
  if (syntheticModelType.includes("boom_100")) {
    return (
      <BoomIcon
        fill="none"
        strokeWidth="2"
        stroke="currentColor"
        className="w-5 h-5"
      />
    );
  } else if (syntheticModelType.includes("crash_100")) {
    return (
      <CrashIcon
        fill="none"
        strokeWidth="2"
        stroke="currentColor"
        className="w-5 h-5"
      />
    );
  } else {
    return (
      <VolatilityIcon
        fill="none"
        strokeWidth="2"
        stroke="currentColor"
        className="w-5 h-5"
      />
    );
  }
};

export const getTradeTypeIcon = (tradeType) => {
  if (tradeType.includes("rise")) {
    return (
      <RiseIcon
        fill="none"
        strokeWidth={1.5}
        stroke="#4b5563"
        className="w-5 h-5 stroke-gray-600"
      />
    );
  } else if (tradeType.includes("fall")) {
    return (
      <FallIcon
        fill="none"
        strokeWidth={1.5}
        stroke="#4b5563"
        className="w-5 h-5 stroke-gray-600"
      />
    );
  } else if (tradeType.includes("even")) {
    return (
      <EvenIcon
        fill="none"
        strokeWidth={1.5}
        stroke="#4b5563"
        className="w-5 h-5 stroke-gray-600"
      />
    );
  } else if (tradeType.includes("odd")) {
    return (
      <OddIcon
        fill="none"
        strokeWidth={1.5}
        stroke="#4b5563"
        className="w-5 h-5 stroke-gray-600"
      />
    );
  } else if (tradeType.includes("matches")) {
    return (
      <MatchesIcon
        fill="none"
        strokeWidth={1.5}
        stroke="#4b5563"
        className="w-5 h-5 stroke-gray-600"
      />
    );
  } else {
    return (
      <DiffersIcon
        fill="none"
        strokeWidth={1.5}
        stroke="#4b5563"
        className="w-5 h-5 stroke-gray-600"
      />
    );
  }
};

export const capitaliseFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const sanitiseTime = (unixTime) => {
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

  var date = new Date(unixTime * 1000);
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
