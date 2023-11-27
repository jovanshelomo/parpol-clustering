import { Scatter } from "@ant-design/plots";
import { useEffect, useState } from "react";

const ScatterPlotPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "http://127.0.0.1:5000/scatterplot?" +
        new URLSearchParams({
          partai: undefined,
        })
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config = {
    appendPadding: 10,
    data,
    xField: "Revenue (Millions)",
    yField: "Rating",
    shape: "circle",
    colorField: "Genre",
    size: 4,
    yAxis: {
      nice: true,
      line: {
        style: {
          stroke: "#aaa",
        },
      },
    },
    xAxis: {
      min: -100,
      grid: {
        line: {
          style: {
            stroke: "#eee",
          },
        },
      },
      line: {
        style: {
          stroke: "#aaa",
        },
      },
    },
  };

  return <Scatter {...config} />;
};
export default ScatterPlotPage;
