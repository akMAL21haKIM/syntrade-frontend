import { createChart } from "lightweight-charts";
import { useRef, useEffect, createPortal } from "react";
import { render } from "react-dom";

let data = [];

function convertRemToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

const ChartWrapper = () => {
  return <div style={{ padding: 40 }}></div>;
};

const Chart = ({ width, height, syntheticModel, stream }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = createChart("baka", {
      layout: {
        textColor: "black",
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
      // chart.timeScale().scrollToRealTime();
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

  return <div id="baka" className="pd-8" ref={chartRef} />;
};

export default Chart;
