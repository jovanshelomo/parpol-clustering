import { ScatterConfig } from "@ant-design/charts";
import { Scatter } from "@ant-design/plots";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { uniq } from "@antv/util";

const ScatterPlotPage = () => {
  const [data, setData] = useState([]);
  const { partai, cluster } = useOutletContext<{
    partai: string[];
    cluster: string[];
  }>();

  useEffect(() => {
    fetch(
      "http://127.0.0.1:5000/scatterplot?" +
        new URLSearchParams({
          partai: partai.join(","),
          cluster: cluster.join(","),
        })
    )
      .then((response) => response.json())
      .then((json) => setData(json));
  }, [partai, cluster]);

  const config: ScatterConfig = {
    appendPadding: 10,
    data,
    xField: "engagement_total",
    yField: "views",
    shape: (data1) => {
      const shapes = [
        "circle",
        "square",
        "triangle",
        "diamond",
        "hexagon",
        "bowtie",
        "cross",
        "tick",
        "plus",
        "hyphen",
        "line",
      ];
      // const idx = uniq(data.map((d) => d.label)).indexOf(label);
      // console.log(data1);
      return "circle";
    },
    colorField: "cluster",
    onEvent(chart, event) {
      if (event.type === "point:click") {
        window.open(event?.data?.data.url_video, "_blank")?.focus();
      }
    },
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
      nice: true,
      min: 0,
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
