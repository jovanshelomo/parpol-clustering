import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

type DataOnePartai = {
  _id: object;
  tanggal: number;
  engagement_total: number;
  like: number;
  comment: number;
  share: number;
  views: number;
  cluster: number;
  url_video: string;
};

type DataManyPartai = {
  label: string;
  [key: number]: number;
};

const TablePage = () => {
  const [data, setData] = useState<DataManyPartai[] | DataOnePartai[]>([]);
  const { partai, cluster } = useOutletContext<{
    partai: string[];
    cluster: number[];
  }>();

  useEffect(() => {
    fetch(
      "http://127.0.0.1:5000/table?" +
        new URLSearchParams({
          partai: partai.join(","),
          cluster: cluster.join(","),
        })
    )
      .then((response) => response.json())
      .then((json) => {
        const result =
          partai.length === 1
            ? json
            : json.map((d) => ({
                label: d.label,
                ...d.clusters.reduce(
                  (
                    acc: Record<number, number>,
                    curr: { cluster: number; count: number }
                  ) => ({
                    ...acc,
                    [curr.cluster]: curr.count,
                  }),
                  {}
                ),
              }));
        setData(result);
        console.log(result);
      });
  }, [partai, cluster]);

  return (
    <Card>
      <CardContent className="pt-2">
        {partai.length === 1 ? (
          <Table key={JSON.stringify(data)}>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Tanggal Unggah</TableHead>
                <TableHead className="text-right">Engagement Total</TableHead>
                <TableHead className="text-right">Jumlah Like</TableHead>
                <TableHead className="text-right">Jumlah Comment</TableHead>
                <TableHead className="text-right">Jumlah Share</TableHead>
                <TableHead className="text-right">Jumlah View</TableHead>
                <TableHead className="text-right">Cluster Ke-</TableHead>
                <TableHead>URL Postingan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(data as DataOnePartai[]).map((item, i) => (
                <TableRow key={JSON.stringify(item._id)}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>
                    {new Date(item.tanggal * 1000).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.engagement_total}
                  </TableCell>
                  <TableCell className="text-right">{item.like}</TableCell>
                  <TableCell className="text-right">{item.comment}</TableCell>
                  <TableCell className="text-right">{item.share}</TableCell>
                  <TableCell className="text-right">{item.views}</TableCell>
                  <TableCell className="text-right">{item.cluster}</TableCell>
                  <TableCell>
                    <a href={item.url_video} target="_blank">
                      {item.url_video}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Table key={JSON.stringify(data)}>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Nama Partai</TableHead>
                {cluster.sort().map((c) => (
                  <TableHead
                    className="text-right"
                    key={c}
                  >{`Jumlah postingan Cluster ${c}`}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {(data as DataManyPartai[]).map((item, i) => (
                <TableRow key={item.label}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell className="font-medium">{item.label}</TableCell>
                  {cluster.sort().map((c) => {
                    return (
                      <TableCell className="text-right" key={c}>
                        {item[c] || "0"}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                {cluster.sort().map((c) => {
                  return (
                    <TableCell className="text-right" key={c}>
                      {(data as DataManyPartai[]).reduce(
                        (acc, curr) => acc + (curr[c] || 0),
                        0
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default TablePage;
