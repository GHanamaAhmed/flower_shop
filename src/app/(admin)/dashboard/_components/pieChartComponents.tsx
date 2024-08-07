"use client";
import { PieChart } from "@mui/x-charts";
import React from "react";

function PieChartComponents() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: "series A" },
            { id: 1, value: 15, label: "series B" },
            { id: 2, value: 20, label: "series C" },
          ],
        },
      ]}
      height={200}
      width={332}
    />
  );
}

export default PieChartComponents;
