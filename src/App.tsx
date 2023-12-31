import { useEffect, useState } from "react";
import Navbar from "./components/custom/navbar";
import { Outlet } from "react-router-dom";
import FilterIcon from "./icons/filter";
import { FancyMultiSelect } from "./components/ui/multi-select";

function App() {
  const [partai, setPartai] = useState<{ label: string; value: string }[]>([]);
  const [cluster, setCluster] = useState<{ label: string; value: string }[]>(
    []
  );
  const [selectedPartai, setSelectedPartai] = useState<string[]>([]);
  const [selectedCluster, setSelectedCluster] = useState<string[]>([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  function asyncFetch() {
    fetch("http://127.0.0.1:5000/partais")
      .then((res) => res.json())
      .then((res) =>
        setPartai(
          res.map((partai: string[]) => ({ label: partai, value: partai }))
        )
      );
    fetch("http://127.0.0.1:5000/clusters")
      .then((res) => res.json())
      .then((res) =>
        setCluster(
          res.map((cluster: string[]) => ({ label: cluster, value: cluster }))
        )
      );
  }

  return (
    <div className="w-full h-full grid grid-cols-sidebar grid-rows-navbar ">
      <Navbar />
      <div className="text-gray-900 grid grid-cols-sidebar hide-print">
        <div className="bg-white p-4 text-slate-600 flex-1">
          <div className="flex flex-row items-center gap-2 mb-3">
            <FilterIcon />
            <p className="font-semibold">Filter</p>
          </div>
          <div className="space-y-4">
            <div>
              <p>Partai</p>
              <FancyMultiSelect
                items={partai}
                onChange={setSelectedPartai}
                placeholder="Pilih Partai..."
                defaultValue={partai.map((p) => p.value)}
              />
            </div>
            <div>
              <p>Cluster</p>
              <FancyMultiSelect
                items={cluster}
                onChange={setSelectedCluster}
                placeholder="Pilih Cluster..."
                defaultValue={cluster.map((p) => p.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 flex-1">
        <Outlet
          context={{ cluster: selectedCluster, partai: selectedPartai }}
        />
      </div>
    </div>
  );
}

export default App;
