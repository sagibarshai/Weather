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
     setDescription: (x: string) => void;
};

const DiscoverIcon: React.FC<Props> = ({
     IconPhrase,
     margin,
     setDescription,
}) => {
     if (
          IconPhrase === "Sunny" ||
          IconPhrase === "Mostly sunny" ||
          IconPhrase === "Partly sunny"
     ) {
          setDescription("Sunny");
          return (
               <StyledIcon margin={margin}>
                    {" "}
                    <IconForcastSun
                         style={{ width: "180px", height: "180px" }}
                    />
               </StyledIcon>
          );
     } else if (
          IconPhrase === "Hazy Sunshine" ||
          IconPhrase === "Mostly Cloudy" ||
          IconPhrase === "Mostly Cloudy w/ Flurries" ||
          IconPhrase === "Partly Sunny w/ Flurries" ||
          IconPhrase === "Intermittent clouds"
     ) {
          setDescription("Sun & Cloudy");

          return (
               <StyledIcon margin={margin}>
                    <IconForcastSunAndCloudy
                         style={{ width: "180px", height: "180px" }}
                    />
               </StyledIcon>
          );
     } else if (
          IconPhrase === "Cloudy" ||
          IconPhrase === "Dreary (Overcast)" ||
          IconPhrase === "Fog"
     ) {
          setDescription("Cloudy");

          return (
               <StyledIcon margin={margin}>
                    <IconForcastCloudy
                         style={{ width: "180px", height: "180px" }}
                    />
               </StyledIcon>
          );
     } else if (
          IconPhrase === "Showers" ||
          IconPhrase === "Mostly cloudy w/ showers" ||
          IconPhrase === "Partly sunny w/ showers" ||
          IconPhrase === "T-Storms" ||
          IconPhrase === "Mostly cloudy w/ t-storms" ||
          IconPhrase === "Partly Sunny w/ T-Storms" ||
          IconPhrase === "Rain"
     ) {
          setDescription("Rainy");

          return (
               <StyledIcon margin={margin}>
                    <IconForcastRain
                         style={{ width: "180px", height: "180px" }}
                    />
               </StyledIcon>
          );
     } else if (
          IconPhrase === "Snow" ||
          IconPhrase === "Mostly Cloudy w/ Snow" ||
          IconPhrase === "Ice"
     ) {
          setDescription("Snowy");

          return (
               <StyledIcon margin={margin}>
                    <IconForcastSnow
                         style={{ width: "180px", height: "180px" }}
                    />
               </StyledIcon>
          );
     } else if (
          IconPhrase === "Flurries" ||
          IconPhrase === "Sleet" ||
          IconPhrase === "Freezing Rain" ||
          IconPhrase === "Rain and Snow" ||
          IconPhrase === "Thunderstorms"
     ) {
          setDescription("Storm");

          return (
               <StyledIcon margin={margin}>
                    <IconForcastStorm
                         style={{ width: "180px", height: "180px" }}
                    />
               </StyledIcon>
          );
     } else if (IconPhrase === "Windy") {
          setDescription("Windy");

          return (
               <StyledIcon margin={margin}>
                    <IconForcastWind
                         style={{ width: "180px", height: "180px" }}
                    />
               </StyledIcon>
          );
     }
     return <h1>no icon</h1>;
};
export default DiscoverIcon;
