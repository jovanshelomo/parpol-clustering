import { Column } from "@ant-design/plots";

const TablePage = () => {
  const data = [
    {
      type: "A",
      sales: 38,
    },
    {
      type: "B",
      sales: 52,
    },
    {
      type: "C",
      sales: 61,
    },
    {
      type: "D",
      sales: 145,
    },
    {
      type: "E",
      sales: 48,
    },
    {
      type: "F",
      sales: 38,
    },
    {
      type: "G",
      sales: 38,
    },
    {
      type: "H",
      sales: 38,
    },
  ];
  return (
    <Column
      data={data}
      xField="type"
      yField="sales"
      color="#FAAD14"
      legend={false}
      autoFit
    />
  );
};

export default TablePage;
