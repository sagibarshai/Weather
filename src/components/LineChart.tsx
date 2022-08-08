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
type Props = {
     forcast5daystemperatureDay: number[];
     forcast5daystemperatureNight: number[];
     forcast5daysLables: string[];
     forcastNightIcon?: JSX.Element;
     forcastDayIcon?: JSX.Element;
};
const LineChart: React.FC<Props> = (props) => {
     ChartJS.register(
          CategoryScale,
          LinearScale,
          PointElement,
          LineElement,
          Title,
          Tooltip,
          Legend
     );

     const optionsDay = {
          title: { display: false },
          legend: { display: false },
          responsive: true,

          plugins: {
               legend: {
                    // position: "bottom" as const,
                    display: false,
               },
          },
          scales: {
               x: {
                    grid: {
                         display: false,
                    },
                    display: false,
               },
               y: {
                    grid: {
                         display: false,
                    },
                    display: false,
               },
          },
     };
     const optionsNight = {
          title: { display: false },
          legend: { display: false },
          responsive: true,

          plugins: {
               legend: {
                    // position: "bottom" as const,
                    display: false,
               },
          },

          scales: {
               x: {
                    grid: {
                         display: false,
                    },
                    position: "bottom" as const,
                    // display: false,
               },
               y: {
                    grid: {
                         display: false,
                    },
                    display: false,
               },
          },
     };
     const dataDay = {
          labels: props.forcast5daysLables,
          datasets: [
               {
                    label: "",
                    data: props.forcast5daystemperatureDay,
                    borderColor: "white",
                    backgroundColor: "white",
               },
          ],
     };
     const dataNight = {
          labels: props.forcast5daysLables,
          datasets: [
               {
                    label: "",
                    data: props.forcast5daystemperatureNight,
                    borderColor: "white",
                    backgroundColor: "white",
               },
          ],
     };
     return (
          <StyledChartBigContainer>
               <StyledTitle>5-days forcast</StyledTitle>
               <StyledChartContainer>
                    <Line options={optionsDay} data={dataDay} height="50px" />
                    <Line
                         options={optionsNight}
                         data={dataNight}
                         height="50px"
                    />
               </StyledChartContainer>
          </StyledChartBigContainer>
     );
};

export default LineChart;
