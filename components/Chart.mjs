import { createChart } from "lightweight-charts";
import { useRef, useEffect } from "react";
import { convertRemToPixels } from "../lib/utilities";

let data = [];

const Chart = ({ syntheticModel, stream }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = createChart("chart", {
      layout: {
        textColor: "#374151",
        background: { type: "solid", color: "white" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
        barSpacing: 6,
      },
      grid: {
        vertLines: {
          color: "#f3f4f6",
        },
        horzLines: {
          color: "#f3f4f6",
        },
      },
    });

    const resize = () => {
      chart.applyOptions({
        width: window.innerWidth < 768 ? window.innerWidth : window.innerWidth - convertRemToPixels(24),
        height: window.innerWidth < 768 ? window.innerHeight - convertRemToPixels(21) : window.innerHeight - convertRemToPixels(7),
      });
      chart.timeScale().fitContent();
    };

    const areaSeries = chart.addAreaSeries({
      lineColor: "#4f46e5",
      topColor: "#4f46e5",
      bottomColor: "#a78bfa",
    });

    areaSeries.setData(data);
    stream.onmessage = (e) => {
      try {
        // Parse JSON pricing data from Server Sent Events (SSE)
        let m = JSON.parse(e.data);

        // Append new data to areaSeries' data
        areaSeries.setData(
          (data = [
            ...data,
            {
              time: m.time_asia_kuala_lumpur,
              value: m[`current_${syntheticModel}_price`],
            },
          ])
        );
      } catch (e) {
        console.error(e);
      }
    };

    window.addEventListener("resize", resize);

    resize();

    return () => {
      stream.onmessage = null;
      chart.remove();
      window.removeEventListener("resize", resize);
    };
  }, [syntheticModel]);

  return (
    <div
      id="chart"
      className="w-[6.25rem] h-[1.25rem] pl-[1.25rem] absolute"
      ref={chartRef}
    />
  );
};

export default Chart;
