import { useState } from "react";
import Navbar from "./components/custom/navbar";
import { Outlet } from "react-router-dom";
import FilterIcon from "./icons/filter";
import Dropdown from "./components/custom/dropdown";

function App() {
  const [partai, setPartai] = useState([]);
  const [cluster, setCluster] = useState([]);
  return (
    <div className="w-full h-full grid grid-cols-sidebar grid-rows-navbar ">
      <Navbar />
      <div className="text-gray-900 grid grid-cols-sidebar">
        <div className="bg-white p-4 text-slate-600 flex-1">
          <div className="flex flex-row items-center gap-2 mb-3">
            <FilterIcon />
            <p className="font-semibold">Filter</p>
          </div>
          <div className="space-y-4">
            <div>
              <p>Partai</p>
              <Dropdown
                items={[
                  {
                    label: "SEMUA",
                    value: "SEMUA",
                  },
                  {
                    label: "PPP",
                    value: "PPP",
                  },
                  {
                    label: "PAN",
                    value: "PAN",
                  },
                ]}
                onChange={(value) => {
                  console.log(value);
                }}
                defaultValue="SEMUA"
              />
            </div>
            <div>
              <p>Cluster</p>
              <Dropdown
                items={[
                  {
                    label: "SEMUA",
                    value: "SEMUA",
                  },
                  {
                    label: "PPP",
                    value: "PPP",
                  },
                  {
                    label: "PAN",
                    value: "PAN",
                  },
                ]}
                onChange={(value) => {
                  console.log(value);
                }}
                defaultValue="SEMUA"
              />
            </div>
          </div>
        </div>
      </div>
        <div className="p-4 flex-1">
          <Outlet context={{ partai, cluster }} />
        </div>
    </div>
  );
}

export default App;
