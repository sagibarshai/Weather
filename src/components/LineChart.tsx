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
          Legend
     );

     const optionsDay = {
          title: { display: false },
          legend: { display: false },
          responsive: true,
          layout: {
               // padding: {
               //      left: 50,
               // },
          },
          plugins: {
               legend: {
                    position: "top" as const,
                    display: false,
               },
          },
          scales: {
               x: {
                    grid: {
                         display: false,
                         drawBorder: false,
                    },
                    ticks: {
                         callback: function (
                              value: any,
                              index: any,
                              ticks: any
                         ) {
                              return (
                                   <StyledIcon>
                                        <IconSunYellow />
                                   </StyledIcon>
                              );
                         },
                    },

                    position: "top",
               },
               secondXAxis: {
                    axis: "x",

                    ticks: {
                         padding: 40,
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
               legend: {
                    // position: "bottom" as const,
                    display: false,
               },
          },
          label: {
               position: "top" as const,
          },
          scales: {
               x: {
                    grid: {
                         display: false,
                    },
                    // position: "bottom" as const,
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
     return (
          <StyledChartBigContainer>
               <StyledTitle>5-days forcast</StyledTitle>
               <StyledChartContainer>
                    <Line options={optionsDay} data={dataDay} height="100px" />
                    {/* <Line
                         options={optionsNight}
                         data={dataNight}
                         height="50px"
                    /> */}
               </StyledChartContainer>
          </StyledChartBigContainer>
     );
};

export default LineChart;
{
     /* <StyledIconsRow>
{props.forcast5daysLablesDays?.map((day) => (
     <h3>{day}</h3>
))}
</StyledIconsRow>
<StyledIconsRow>
{props.forcast5daysLablesDates?.map((date) => (
     <span>{date}</span>
))}
</StyledIconsRow>
<StyledIconsRow>
{props.forcast5daysLablesDays?.map((icon) => (
     <StyledIcon>
     <IconSunYellow />
     </StyledIcon>
))}
</StyledIconsRow> */
}
