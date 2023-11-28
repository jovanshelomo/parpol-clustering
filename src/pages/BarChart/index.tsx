import { Column } from "@ant-design/plots";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const BarChartPage = () => {
  const [data, setData] = useState([]);
  const { partai, cluster } = useOutletContext<{
    partai: string[];
    cluster: string[];
  }>();

  useEffect(() => {
    fetch(
      "http://127.0.0.1:5000/barchart?" +
        new URLSearchParams({
          partai: partai.join(","),
          cluster: cluster.join(","),
        })
    )
      .then((response) => response.json())
      .then((json) =>
        setData(
          json
            .map((d) => [
              ...d.clusters.map((c) => ({
                label: d.label,
                cluster: c.cluster,
                count: c.count,
              })),
            ])
            .flat()
        )
      );
  }, [partai, cluster]);

  return (
    <Column
      data={data}
      isStack={true}
      xField="label"
      yField="count"
      seriesField="cluster"
      label={{
        position: "middle",
        layout: [
          {
            type: "interval-adjust-position",
          },
          {
            type: "interval-hide-overlap",
          },
          {
            type: "adjust-color",
          },
        ],
      }}
      legend={false}
      autoFit
    />
  );
};

export default BarChartPage;
