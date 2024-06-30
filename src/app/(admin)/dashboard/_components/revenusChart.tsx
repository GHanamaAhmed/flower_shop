"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};
export default function RevenusChart() {
  return (
    <div className="w-full">
      <Line
        data={data}
        options={{
          responsive: true,
          resizeDelay: 200,
          clip: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
            }
          },
        }}
        className="w-full md:min-h-[200px] min-w-[0px]"
        
      />
    </div>
  );
}
