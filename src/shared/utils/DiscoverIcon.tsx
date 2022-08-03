import { ReactComponent as IconForcastSun } from "../svg/sun.svg";
import { ReactComponent as IconForcastSunAndCloudy } from "../svg/sun-cloud.svg";
import { ReactComponent as IconForcastCloudy } from "../svg/cloud.svg";
import { ReactComponent as IconForcastRain } from "../svg/rain.svg";
import { ReactComponent as IconForcastStorm } from "../svg/storm.svg";
import { ReactComponent as IconForcastSnow } from "../svg/snow.svg";
import { ReactComponent as IconForcastWind } from "../svg/wind.svg";
import { StyledIcon } from "../Icons/Icon";
type Props = {
     IconPhrase: string;
     margin?: string;
     setDescription?: (x: string) => void;
     width?: string;
     height?: string;
};

const DiscoverIcon: React.FC<Props> = ({
     IconPhrase,
     margin,
     setDescription,
     width,
     height,
}) => {
     if (
          IconPhrase === "Sunny" ||
          IconPhrase === "Mostly sunny" ||
          IconPhrase === "Partly sunny" ||
          IconPhrase === "Hot"
     ) {
          setDescription && setDescription("Clear");
          return (
               <StyledIcon margin={margin}>
                    {" "}
                    <IconForcastSun style={{ width, height }} />
               </StyledIcon>
          );
     } else if (
          IconPhrase === "Hazy Sunshine" ||
          IconPhrase === "Mostly cloudy" ||
          IconPhrase === "Mostly Cloudy w/ Flurries" ||
          IconPhrase === "Partly Sunny w/ Flurries" ||
          IconPhrase === "Intermittent clouds"
     ) {
          setDescription && setDescription("Sun & Cloudy");

          return (
               <StyledIcon margin={margin}>
                    <IconForcastSunAndCloudy style={{ width, height }} />
               </StyledIcon>
          );
     } else if (
          IconPhrase === "Cloudy" ||
          IconPhrase === "Dreary (Overcast)" ||
          IconPhrase === "Fog"
     ) {
          setDescription && setDescription("Cloudy");

          return (
               <StyledIcon margin={margin}>
                    <IconForcastCloudy style={{ width, height }} />
               </StyledIcon>
          );
     } else if (
          IconPhrase === "Showers" ||
          IconPhrase === "Mostly cloudy w/ showers" ||
          IconPhrase === "Partly sunny w/ showers" ||
          IconPhrase === "T-Storms" ||
          IconPhrase === "Mostly cloudy w/ t-storms" ||
          IconPhrase === "Partly sunny w/ t-storms" ||
          IconPhrase === "Rain"
     ) {
          setDescription && setDescription("Rainy");

          return (
               <StyledIcon margin={margin}>
                    <IconForcastRain style={{ width, height }} />
               </StyledIcon>
          );
     } else if (
          IconPhrase === "Snow" ||
          IconPhrase === "Mostly Cloudy w/ Snow" ||
          IconPhrase === "Ice"
     ) {
          setDescription && setDescription("Snowy");

          return (
               <StyledIcon margin={margin}>
                    <IconForcastSnow style={{ width, height }} />
               </StyledIcon>
          );
     } else if (
          IconPhrase === "Flurries" ||
          IconPhrase === "Sleet" ||
          IconPhrase === "Freezing Rain" ||
          IconPhrase === "Rain and Snow" ||
          IconPhrase === "Thunderstorms"
     ) {
          setDescription && setDescription("Storm");

          return (
               <StyledIcon margin={margin}>
                    <IconForcastStorm style={{ width, height }} />
               </StyledIcon>
          );
     } else if (IconPhrase === "Windy") {
          setDescription && setDescription("Windy");

          return (
               <StyledIcon margin={margin}>
                    <IconForcastWind style={{ width, height }} />
               </StyledIcon>
          );
     }
     return <h1>no icon</h1>;
};
export default DiscoverIcon;
