import { ReactComponent as IconForcastSun } from "../svg/sun.svg";
import { ReactComponent as IconForcastSunAndCloudy } from "../svg/sun-cloud-1.svg";
import { ReactComponent as IconForcastCloudy } from "../svg/cloud.svg";
import { ReactComponent as IconForcastRain } from "../svg/rain.svg";
import { ReactComponent as IconForcastStorm } from "../svg/storm.svg";
import { ReactComponent as IconForcastSnow } from "../svg/snow.svg";
import { ReactComponent as IconForcastWind } from "../svg/wind.svg";
import { StyledIcon } from "../Icons/Icon";
import ReturnIconForcast from "./ReturnIconForcast";
type Props = {
     IconPhrase: string;
     margin?: string;
     setDescription?: (x: string) => void;
     width?: string;
     height?: string;
     description?: string;
     Icon: number;
     display?: string;
     renderMobile?: boolean;
     renderLaptopAnDesktop?: boolean;
     mobileWidth?: string;
     mobileHeight?: string;
};

const DiscoverIcon: React.FC<Props> = ({
     IconPhrase,
     margin,
     setDescription,
     width,
     height,
     Icon,
     display,
     renderLaptopAnDesktop,
     renderMobile,
     mobileWidth,
     mobileHeight,
}) => {
     if (
          IconPhrase === "Sunny" ||
          IconPhrase === "Mostly sunny" ||
          IconPhrase === "Partly sunny" ||
          IconPhrase === "Hot"
     ) {
          setDescription && setDescription("Clear");
          return (
               <StyledIcon
                    width={width}
                    height={height}
                    mobileWidth={mobileWidth}
                    mobileHeight={mobileHeight}
               >
                    <IconForcastSun
                         width={renderLaptopAnDesktop ? width : mobileWidth}
                         height={renderLaptopAnDesktop ? height : mobileHeight}
                    />
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
               <StyledIcon
                    width={width}
                    height={height}
                    mobileWidth={mobileWidth}
                    mobileHeight={mobileHeight}
               >
                    <IconForcastSunAndCloudy
                         width={renderLaptopAnDesktop ? width : mobileWidth}
                         height={renderLaptopAnDesktop ? height : mobileHeight}
                    />
               </StyledIcon>
          );
     } else if (
          IconPhrase === "Cloudy" ||
          IconPhrase === "Dreary (Overcast)" ||
          IconPhrase === "Fog"
     ) {
          setDescription && setDescription("Cloudy");

          return (
               <StyledIcon
                    width={width}
                    height={height}
                    mobileWidth={mobileWidth}
                    mobileHeight={mobileHeight}
               >
                    <IconForcastCloudy
                         width={renderLaptopAnDesktop ? width : mobileWidth}
                         height={renderLaptopAnDesktop ? height : mobileHeight}
                    />
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
               <StyledIcon
                    width={width}
                    height={height}
                    mobileWidth={mobileWidth}
                    mobileHeight={mobileHeight}
               >
                    <IconForcastRain
                         width={renderLaptopAnDesktop ? width : mobileWidth}
                         height={renderLaptopAnDesktop ? height : mobileHeight}
                    />
               </StyledIcon>
          );
     } else if (
          IconPhrase === "Snow" ||
          IconPhrase === "Mostly Cloudy w/ Snow" ||
          IconPhrase === "Ice"
     ) {
          setDescription && setDescription("Snowy");

          return (
               <StyledIcon
                    width={width}
                    height={height}
                    mobileWidth={mobileWidth}
                    mobileHeight={mobileHeight}
               >
                    <IconForcastSnow
                         width={renderLaptopAnDesktop ? width : mobileWidth}
                         height={renderLaptopAnDesktop ? height : mobileHeight}
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
          setDescription && setDescription("Storm");

          return (
               <StyledIcon
                    width={width}
                    height={height}
                    mobileWidth={mobileWidth}
                    mobileHeight={mobileHeight}
               >
                    <IconForcastStorm
                         width={renderLaptopAnDesktop ? width : mobileWidth}
                         height={renderLaptopAnDesktop ? height : mobileHeight}
                    />
               </StyledIcon>
          );
     } else if (IconPhrase === "Windy") {
          setDescription && setDescription("Windy");

          return (
               <StyledIcon
                    width={width}
                    height={height}
                    mobileWidth={mobileWidth}
                    mobileHeight={mobileHeight}
               >
                    <IconForcastWind
                         width={renderLaptopAnDesktop ? width : mobileWidth}
                         height={renderLaptopAnDesktop ? height : mobileHeight}
                    />
               </StyledIcon>
          );
     } else
          return (
               <ReturnIconForcast
                    WeatherIcon={Icon}
                    renderMobile={renderMobile}
                    renderLaptopAnDesktop={renderLaptopAnDesktop}
                    mobileHeight={mobileHeight}
                    mobileWidth={mobileWidth}
                    width={width}
                    height={height}
               />
          );
};
export default DiscoverIcon;
