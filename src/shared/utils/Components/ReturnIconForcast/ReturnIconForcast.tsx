import { Props } from "./types";
import { StyledImgIcon } from "./style";
const weatherIcons: string[] = [
     "sunny.png",
     "mostly-sunny.png",
     "partly-sunny.png",
     "intermittent-clouds.png",
     "hazy-sunshine.png",
     "mostly-cloudy.png",
     "cloudy.png",
     "dreary.png",
     "fog.png",
     "showers.png",
     "mostly-cloudy.png",
     "partly-sunny.png",
     "t-storms.png",
     "mostly-cloudy-t-storms.png",
     "partly-sunny-t-storms.png",
     "rain.png",
     "flurries.png",
     "mostly-cloudy-flurries.png",
     "partly-sunny-flurries.png",
     "snow.png",
     "mostly-cloudy-snow.png",
     "ice.png",
     "sleet.png",
     "freezing-rain.png",
     "rain-and-snow.png",
     "hot.png",
     "cold.png",
     "windy.png",
     "clear.png",
     "mostly-clear.png",
     "partly-cloudy.png",
     "intermittent-clouds-night.png",
     "hazy-moonlight.png",
     "mostly-cloudy-night.png",
     "partly-cloudy-showers-night.png",
     "mostly-cloudy-showers-night.png",
     "partly-cloudy-t-storms-night.png",
     "mostly-cloudy-t-storms-night.png",
     "mostly-cloudy-flurries-night.png",
     "mostly-cloudy-snow-night.png",
];

const iconsNumbers: number[] = [
     1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
     24, 25, 26, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44,
];

const ReturnIconForcast: React.FC<Props> = (props) => {
     const index = iconsNumbers.findIndex((num) => num === props.WeatherIcon);
     return (
          <StyledImgIcon
               src={`/accuweatherImages/${weatherIcons[index]}`}
               width={
                    props.renderLaptopAnDesktop
                         ? props.width
                         : props.mobileWidth
               }
               height={
                    props.renderLaptopAnDesktop
                         ? props.height
                         : props.mobileHeight
               }
               margin={props.margin}
               flexOrderMobile={props.flexOrderMobile}
          />
     );
};

export default ReturnIconForcast;
