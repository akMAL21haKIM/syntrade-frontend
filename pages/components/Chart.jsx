import { createChart } from "lightweight-charts";
import { useRef, useEffect } from "react";

let data = [];

function convertRemToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

const Chart = ({ width, height, syntheticModel, stream }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = createChart(document.body, {
      layout: {
        textColor: "black",
        background: { type: "solid", color: "white" },
      },
    });

    const resize = () => {
      chart.applyOptions({
        width: window.innerWidth - convertRemToPixels(20),
        height: window.innerHeight - convertRemToPixels(7),
      });
      // setTimeout(() => chart.timeScale().fitContent(), 0);
      chart.timeScale().fitContent();
    };

    const areaSeries = chart.addAreaSeries({
      lineColor: "#4f46e5",
      topColor: "#4f46e5",
      bottomColor: "#a78bfa",
    });

    areaSeries.setData(data);

    // setTimeout(() => chart.timeScale().fitContent(), 100);

    stream.onmessage = (e) => {
      try {
        // Parse JSON pricing data from Server Sent Events (SSE)
        let m = JSON.parse(e.data);

        // Append new data to areaSeries' data
        areaSeries.setData(
          (data = [
            ...data,
            {
              time: m.time_utc,
              value: m[`current_${syntheticModel}_price`],
            },
          ])
        );

        // chart.timeScale().fitContent();

        // setTimeout(() => chart.timeScale().fitContent(), 100);
      } catch (e) {
        console.error(e);
      }
    };

    resize();

    window.addEventListener("resize", resize, false);

    return () => {
      stream.onmessage = null;
      chart.remove();
    };
  }, [syntheticModel]);

  return <div className="absolute" ref={chartRef} />;
};

export default Chart;
