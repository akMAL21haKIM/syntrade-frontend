import { createChart } from "lightweight-charts";
import { useRef, useEffect } from "react";
const test = {
  current_boom_100_price: 100436.68048400001,
  current_boom_300_price: 99831.51156999992,
  current_boom_500_price: 99689.15847299973,
  current_crash_100_price: 99909.50263600009,
  current_crash_300_price: 99851.99643799964,
  current_crash_500_price: 100415.59027100011,
  current_vol_10_price: 99955.40689930163,
  current_vol_25_price: 100378.09454990359,
  tick: 1406,
  time_utc: 1668522059,
};

let data = [
  // { value: 100000, time: 1642425322 },
  // { value: 100008, time: 1642511722 },
  // { value: 100010, time: 1642598122 },
  // { value: 100020, time: 1642684522 },
  // { value: 100003, time: 1642770922 },
  // { value: 100043, time: 1642857322 },
  // { value: 100041, time: 1642943722 },
  // { value: 100043, time: 1643030122 },
  // { value: 100056, time: 1643116522 },
  // { value: 100046, time: 1643202922 },
];

// Get current price based on synthetic model
const getCurrentPrice = (pricingData, syntheticModel) => {
  return {
    value: pricingData[`current_${syntheticModel}_price`],
    time: pricingData["time_utc"],
  };
};

const Chart = ({ width, height, pricingData, syntheticModel, stream }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartOptions = {
      width,
      height,
      layout: {
        textColor: "black",
        background: { type: "solid", color: "white" },
      },
    };
    const chart = createChart(chartRef.current || "", chartOptions);

    const areaSeries = chart.addAreaSeries({
      lineColor: "#2962FF",
      topColor: "#2962FF",
      bottomColor: "rgba(41, 98, 255, 0.28)",
    });

    areaSeries.setData(data);
    // chart.timeScale().fitContent();
    stream.onmessage = (e) => {
      try {
        let m = JSON.parse(e.data);
        areaSeries.setData(
          (data = [
            ...data,
            { time: m.time_utc, value: m.current_vol_10_price },
          ])
        );
        // chart.timeScale().fitContent();
      } catch (e) {
        //arghhh
        console.error(e);
      }
    };
    return () => (stream.onmessage = null);
    // areaSeries.updateData(data);
    // return () => {
    //   chart.remove();
    // };
  }, []);

  return <div ref={chartRef} />;
};

export default Chart;
