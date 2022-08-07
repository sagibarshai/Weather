import {
     StyledChartBigContainer,
     StyledChartContainer,
     StyledTitle,
} from "./styles/StyledLineChart";
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

const LineChart = () => {
     ChartJS.register(
          CategoryScale,
          LinearScale,
          PointElement,
          LineElement,
          Title,
          Tooltip,
          Legend
     );

     const options = {
          responsive: true,

          legend: {
               display: false,
          },
          plugins: {
               legend: {
                    position: "top" as const,
               },
          },
          scales: {
               x: {
                    grid: {
                         display: false,
                    },
               },
               y: {
                    grid: {
                         display: false,
                    },
               },
          },
     };

     const labels = ["Sun", "Mon", "Tuh", "Wed", "Tuh"]; //bottom

     const data = {
          labels,
          datasets: [
               {
                    label: false,
                    data: [27, 20, 27, 23, 27],
                    borderColor: "white",
                    backgroundColor: "black",
               },
               {
                    label: false,
                    data: [27, 33, 30, 22, 27],
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "white",
               },
          ],
     };
     return (
          <StyledChartBigContainer>
               <StyledTitle>5-days forcast</StyledTitle>
               <StyledChartContainer>
                    <Line options={options} data={data} />
               </StyledChartContainer>
          </StyledChartBigContainer>
     );
};

export default LineChart;
