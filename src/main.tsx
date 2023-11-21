import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import TablePage from "./pages/Table/index.tsx";
import BarChartPage from "./pages/BarChart/index.tsx";
import PieChartPage from "./pages/PieChart/index.tsx";
import ScatterPlotPage from "./pages/ScatterPlot/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/table" replace />,
      },
      {
        path: "table",
        element: <TablePage />,
      },
      {
        path: "bar-chart",
        element: <BarChartPage />,
      },
      {
        path: "pie-chart",
        element: <PieChartPage />,
      },
      {
        path: "scatter-plot",
        element: <ScatterPlotPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
