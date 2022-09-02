import styled from "styled-components";
import themes from "../shared/themes/themes";
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

import ChartDataLabels from "chartjs-plugin-datalabels";
type Props = {
     lineChartData: {
          forcast5daystemperatureDay: number[];
          forcast5daystemperatureNight: number[];
          forcast5daysLablesDays: string[];
          forcast5daysLablesDates: string[];
          mobile?: boolean;
     };
};
const StyledMobileLineContainer = styled.div`
     width: 100vw;
     height: 70vh;
     background-color: ${themes.white};
     position: fixed;
     bottom: 0;
     z-index: 3;
     box-shadow: 0 -7px 30px 0 rgba(0, 0, 0, 0.16);
     border-radius: 30px 30px 0 0;
     overflow-y: scroll;
     padding-bottom: 100px;
`;
const StyledTitle = styled.h4`
     font-family: inherit;
     font-size: 3.2rem;
     font-weight: bold;
     line-height: 1.25;
     color: ${themes.secondary};
     margin: 40px auto 36px 30px;
`;
export const StyledSelectedItem = styled.div`
     position: absolute;
     top: 100%;
     left: 13%;
     transform: translate(-50%, -50%);
     width: 78px;
     height: 323px;
     flex-grow: 0;
     padding: 16px 21px 15px 22px;
     border-radius: 20px;
     -webkit-filter: blur(1px);
     filter: blur(1px);
     background-color: #f2f2f2;
`;
const LineChartMobile: React.FC<Props> = ({ lineChartData }) => {
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
                    color: "#444e72",
                    anchor: "top",
                    align: "end",
                    formatter: (value: number) => {
                         return `${value} °`;
                    },
                    font: {
                         size: 14,
                    },
               },

               legend: {
                    position: "top" as const,
                    display: false,
                    labels: {
                         fontColor: "#bebebe",
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
                         padding: 40,
                         color: "#bebebe",
                         fontColor: "#bebebe",
                    },
               },

               secondXAxis: {
                    fontColor: "#bebebe",

                    axis: "x",

                    ticks: {
                         color: "#bebebe",
                         font: {
                              size: 14,
                         },
                    },
                    grid: {
                         display: false,
                         drawBorder: false,
                    },
                    position: "top",
                    labels: lineChartData.forcast5daysLablesDates,
               },

               thirdXAxis: {
                    axis: "x",
                    grid: {
                         display: false,
                         drawBorder: false,
                    },
                    position: "top",
                    labels: lineChartData.forcast5daysLablesDays,
                    ticks: {
                         color: "#444e72",
                         font: {
                              size: 18,
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
                         crossAlign: "start",
                    },
               },
          },
     };
     const dataDay = {
          labels: lineChartData.forcast5daysLablesDays,
          datasets: [
               {
                    label: "",
                    data: lineChartData.forcast5daystemperatureDay,
                    borderColor: "#bebebe",
                    backgroundColor: "#bebebe",
                    borderWidth: 1,
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
                    color: "#444e72",
                    anchor: "top",
                    align: "end",
                    formatter: (value: number) => {
                         return `${value} °`;
                    },
                    font: {
                         size: 14,
                    },
               },

               legend: {
                    position: "bottom" as const,
                    display: false,
                    labels: {
                         fontColor: "#bebebe",
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
                         padding: 40,
                         color: "#bebebe",
                         fontColor: "#bebebe",
                    },
               },

               secondXAxis: {
                    axis: "x",
                    grid: {
                         display: false,
                         drawBorder: false,
                    },
                    position: "top",
                    labels: Array(5).fill(""),
                    ticks: {
                         color: "#bebebe",
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
                         crossAlign: "start",
                    },
               },
          },
     };

     const dataNight = {
          labels: lineChartData.forcast5daysLablesDays,
          datasets: [
               {
                    label: "",
                    data: lineChartData.forcast5daystemperatureNight,
                    borderColor: "#bebebe",
                    backgroundColor: "#bebebe",
                    borderWidth: 1,
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
                              ctx.drawImage(image, x - 5, 100, 16, 16);
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
                         let image = new Image();
                         (image.src = "/images/moon-flat.png"),
                              ctx.drawImage(image, x - 5, 120, 16, 16);
                    });
                    ctx.restore();
               },
          },
     ];
     return (
          <StyledMobileLineContainer>
               <StyledTitle>5-days forecast</StyledTitle>
               <Line
                    style={{ maxHeight: "300px" }}
                    options={optionsDay}
                    data={dataDay}
                    height="160px"
                    plugins={pluginsTop}
               />
               <Line
                    style={{ maxHeight: "300px" }}
                    options={optionsNight}
                    data={dataNight}
                    height="140px"
                    plugins={pluginsBottom}
               />
               {/* <StyledSelectedItem /> */}
          </StyledMobileLineContainer>
     );
};

export default LineChartMobile;
