import { createChart } from "lightweight-charts";
import { useRef, useEffect } from "react";

let data = [];

const Chart = ({ width, height, syntheticModel, stream }) => {
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
      lineColor: "#4f46e5",
      topColor: "#4f46e5",
      bottomColor: "#a78bfa",
    });

    areaSeries.setData(data);

    stream.onmessage = (e) => {
      try {
        let m = JSON.parse(e.data);

        areaSeries.setData(
          (data = [
            ...data,
            {
              time: m.time_utc,
              value: m[`current_${syntheticModel}_price`],
            },
          ])
        );
      } catch (e) {
        console.error(e);
      }
    };

    // chart.timeScale().fitContent();

    return () => {
      stream.onmessage = null;
      chart.remove();
    };
  }, [syntheticModel]);

  return <div ref={chartRef} />;
};

export default Chart;
