import { Card, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Pie } from "@ant-design/plots";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const PieChartPage = () => {
  const [data, setData] = useState<
    {
      label: string;
      cluster: number;
      count: number;
    }[][]
  >([]);
  const { partai, cluster } = useOutletContext<{
    partai: string[];
    cluster: string[];
  }>();
  const [type, setType] = useState<"partai" | "cluster">("partai");

  useEffect(() => {
    fetch(
      "http://127.0.0.1:5000/piechart?" +
        new URLSearchParams({
          partai: partai.join(","),
          cluster: cluster.join(","),
          type,
        })
    )
      .then((response) => response.json())
      .then((json) => {
        const result =
          type === "cluster"
            ? (
                json as {
                  label: string;
                  clusters: { count: number; cluster: number }[];
                }[]
              ).map((d) => [
                ...d.clusters
                  .map((c) => ({
                    label: d.label,
                    cluster: c.cluster,
                    count: c.count,
                  }))
                  .flat(),
              ])
            : (
                json as {
                  cluster: number;
                  labels: { count: number; label: string }[];
                }[]
              ).map((c) => [
                ...c.labels
                  .map((d) => ({
                    cluster: c.cluster,
                    label: d.label,
                    count: d.count,
                  }))
                  .flat(),
              ]);
        setData(result);
        console.log(result);
      });
  }, [partai, cluster, type]);

  return (
    <div>
      <RadioGroup
        defaultValue="partai"
        onValueChange={(t: "partai" | "cluster") => setType(t)}
        className="mb-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="partai" id="r1" />
          <Label htmlFor="r1">Cluster</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="cluster" id="r2" />
          <Label htmlFor="r2">Partai</Label>
        </div>
      </RadioGroup>
      <div className="grid grid-cols-2 gap-2">
        {type === "partai"
          ? data.map((d) => (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">{d[0].cluster}</h3>
                </CardHeader>
                <Pie
                  key={JSON.stringify(d)}
                  data={d}
                  angleField="count"
                  colorField="label"
                  radius={0.9}
                  label={{
                    type: "inner",
                    offset: "-30%",
                    content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
                    style: {
                      fontSize: 14,
                      textAlign: "center",
                    },
                  }}
                  interactions={[
                    {
                      type: "element-active",
                    },
                  ]}
                />
              </Card>
            ))
          : data.map((d) => (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">{d[0].label}</h3>
                </CardHeader>
                <Pie
                  key={JSON.stringify(d)}
                  data={d}
                  angleField="count"
                  colorField="cluster"
                  radius={0.9}
                  label={{
                    type: "inner",
                    offset: "-30%",
                    content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
                    style: {
                      fontSize: 14,
                      textAlign: "center",
                    },
                  }}
                  interactions={[
                    {
                      type: "element-active",
                    },
                  ]}
                />
              </Card>
            ))}
      </div>
    </div>
  );
};

export default PieChartPage;
