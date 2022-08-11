import {
     StyledChartBigContainer,
     StyledChartContainer,
     StyledTitle,
     StyledColumnDiv,
     StyledIconsRow,
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
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Line } from "react-chartjs-2";
import { ReactComponent as IconSunYellow } from "../shared/svg/sun-yellow.svg";
import { StyledIcon } from "../shared/Icons/Icon";
type Props = {
     forcast5daystemperatureDay: number[];
     forcast5daystemperatureNight: number[];
     forcast5daysLablesDays: string[];
     forcast5daysLablesDates: string[];
     forcast5daysLablesIcons: JSX.Element[];
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
          Legend,
          ChartDataLabels
     );
     const optionsDay = {
          title: { display: false },
          legend: { display: false },
          responsive: true,
          plugins: {
               datalabels: {
                    display: true,
                    color: "white",
                    anchor: "top",
                    align: "end",
                    font: {
                         size: 18,
                    },
               },

               legend: {
                    position: "top" as const,
                    display: false,
                    labels: {
                         fontColor: "white",
                    },
               },
          },
          scales: {
               x: {
                    grid: {
                         display: false,
                         drawBorder: false,
                    },

                    position: "top",
                    labels: Array(5).fill(""),

                    ticks: {
                         padding: 60,
                         color: "white",
                         fontColor: "white",
                    },
               },

               secondXAxis: {
                    fontColor: "white",

                    axis: "x",

                    ticks: {
                         color: "white",
                         font: {
                              size: 18,
                         },
                         // padding: 40,
                    },
                    grid: {
                         display: false,
                         drawBorder: false,
                    },
                    position: "top",
                    labels: props.forcast5daysLablesDates,
               },

               thirdXAxis: {
                    axis: "x",
                    grid: {
                         display: false,
                         drawBorder: false,
                    },
                    position: "top",
                    labels: props.forcast5daysLablesDays,
                    ticks: {
                         color: "white",
                         font: {
                              size: 24,
                         },
                    },
               },

               y: {
                    gridLines: {
                         display: false,
                         drawBorder: false,
                    },
                    grid: {
                         display: false,
                    },
                    display: false,
                    ticks: {
                         // padding: 100,
                         crossAlign: "start",
                    },
               },
          },
     };
     const dataDay = {
          labels: props.forcast5daysLablesDays,
          datasets: [
               {
                    label: "",
                    data: props.forcast5daystemperatureDay,
                    borderColor: "white",
                    backgroundColor: "white",
               },
          ],
     };
     const optionsNight = {
          title: { display: false },
          legend: { display: false },
          responsive: true,
          plugins: {
               datalabels: {
                    display: true,
                    color: "white",
                    anchor: "top",
                    align: "end",
                    font: {
                         size: 18,
                    },
               },

               legend: {
                    position: "bottom" as const,
                    display: false,
                    labels: {
                         fontColor: "white",
                    },
               },
          },
          scales: {
               x: {
                    grid: {
                         display: false,
                         drawBorder: false,
                    },

                    position: "bottom",
                    labels: Array(5).fill(""),

                    ticks: {
                         padding: 60,
                         color: "white",
                         fontColor: "white",
                    },
               },

               secondXAxis: {
                    fontColor: "white",

                    axis: "x",

                    ticks: {
                         color: "white",
                         font: {
                              size: 18,
                         },
                         // padding: 40,
                    },
                    grid: {
                         display: false,
                         drawBorder: false,
                    },
                    position: "bottom",
                    labels: Array(5).fill(""),
               },

               thirdXAxis: {
                    axis: "x",
                    grid: {
                         display: false,
                         drawBorder: false,
                    },
                    position: "bottom",
                    labels: Array(5).fill(""),
                    ticks: {
                         color: "white",
                         font: {
                              size: 24,
                         },
                    },
               },
               fourtXAxis: {
                    axis: "x",
                    grid: {
                         display: false,
                         drawBorder: false,
                    },
                    position: "bottom",
                    labels: Array(5).fill(""),
                    ticks: {
                         color: "white",
                         font: {
                              size: 24,
                         },
                    },
               },

               y: {
                    gridLines: {
                         display: false,
                         drawBorder: false,
                    },
                    grid: {
                         display: false,
                    },
                    display: false,
                    ticks: {
                         // padding: 100,
                         crossAlign: "start",
                    },
               },
          },
     };

     const dataNight = {
          labels: props.forcast5daysLablesDays,
          datasets: [
               {
                    label: "",
                    data: props.forcast5daystemperatureNight,
                    borderColor: "white",
                    backgroundColor: "white",
               },
          ],
     };

     const pluginsTop = [
          {
               afterDraw: (chart: any) => {
                    let ctx = chart.ctx;
                    ctx.save();
                    let xAxis = chart.scales["thirdXAxis"];
                    let yAxis = chart.scales["y"];
                    xAxis.ticks.forEach((value: any, index: any) => {
                         let x = xAxis.getPixelForValue(index);
                         let image = new Image();
                         (image.src = "/images/sun-flat.png"),
                              ctx.drawImage(image, x - 15, 100, 36, 36);
                    });
                    ctx.restore();
               },
          },
     ];
     const pluginsBottom = [
          {
               afterDraw: (chart: any) => {
                    let ctx = chart.ctx;
                    ctx.save();
                    let xAxis = chart.scales["x"];
                    let yAxis = chart.scales["y"];
                    xAxis.ticks.forEach((value: any, index: any) => {
                         let x = xAxis.getPixelForValue(index);
                         let y = yAxis.getPixelForValue(index);
                         console.log(y);
                         let image = new Image();
                         (image.src = "/images/moon-flat.png"),
                              ctx.drawImage(image, x - 15, 120, 36, 36);
                    });
                    ctx.restore();
               },
          },
     ];
     console.log(props.forcast5daystemperatureNight);
     return (
          <StyledChartBigContainer>
               <StyledTitle>5-days forcast</StyledTitle>
               <StyledChartContainer>
                    <Line
                         options={optionsDay}
                         data={dataDay}
                         height="100px"
                         plugins={pluginsTop}
                    />
                    <Line
                         options={optionsNight}
                         data={dataNight}
                         height="100px"
                         plugins={pluginsBottom}
                    />
               </StyledChartContainer>
          </StyledChartBigContainer>
     );
};

export default LineChart;
