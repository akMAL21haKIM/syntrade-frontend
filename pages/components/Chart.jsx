import { createChart } from "lightweight-charts";
import { useRef, useEffect } from "react";
import { convertRemToPixels } from "../../lib/utilities";

let data = [];

const Chart = ({ syntheticModel, stream }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = createChart("baka", {
      layout: {
        textColor: "#374151",
        background: { type: "solid", color: "white" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
        barSpacing: 6,
        // fixRightEdge: true,
        // fixLeftEdge: true,
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
        width: window.innerWidth - convertRemToPixels(21),
        height: window.innerHeight - convertRemToPixels(7),
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
        // areaSeries.update({
        //   time: m.time_utc,
        //   value: m[`current_${syntheticModel}_price`],
        // });
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

  return (
    <div
      id="baka"
      className="w-[6.25rem] h-[1.25rem] pl-[1.25rem] absolute"
      ref={chartRef}
    />
  );
};

export default Chart;

<a
  href="#_"
  class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
>
  <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
  <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
    <svg
      class="w-5 h-5 text-green-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      ></path>
    </svg>
  </span>
  <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
    <svg
      class="w-5 h-5 text-green-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      ></path>
    </svg>
  </span>
  <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
    Button Text
  </span>
</a>;
