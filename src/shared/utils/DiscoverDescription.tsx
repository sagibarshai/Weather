import { StyledDescription } from "../../components/styles/StyledHomePageDisplayCity";
type Props = {
     IconPhrase: string;
     fontSize?: string;
     fontSizeMobile?: string;
     renderLaptopAnDesktop?: boolean;
     flexOrderMobile?: number;
};

const DiscoverDescription: React.FC<Props> = ({
     IconPhrase,
     fontSize,
     fontSizeMobile,
     renderLaptopAnDesktop,
     flexOrderMobile,
}) => {
     if (
          IconPhrase === "Sunny" ||
          IconPhrase === "Mostly sunny" ||
          IconPhrase === "Partly sunny" ||
          IconPhrase === "Hot"
     ) {
          return (
               <StyledDescription
                    flexOrderMobile={flexOrderMobile}
                    fontSize={
                         renderLaptopAnDesktop === true
                              ? fontSize
                              : fontSizeMobile
                    }
               >
                    Clear
               </StyledDescription>
          );
     } else if (
          IconPhrase === "Hazy Sunshine" ||
          IconPhrase === "Mostly cloudy" ||
          IconPhrase === "Mostly Cloudy w/ Flurries" ||
          IconPhrase === "Partly Sunny w/ Flurries" ||
          IconPhrase === "Intermittent clouds"
     ) {
          return (
               <StyledDescription
                    flexOrderMobile={flexOrderMobile}
                    fontSize={
                         renderLaptopAnDesktop === true
                              ? fontSize
                              : fontSizeMobile
                    }
               >
                    Sun & Cloudy
               </StyledDescription>
          );
     } else if (
          IconPhrase === "Cloudy" ||
          IconPhrase === "Dreary" ||
          IconPhrase === "Fog"
     ) {
          return (
               <StyledDescription
                    flexOrderMobile={flexOrderMobile}
                    fontSize={renderLaptopAnDesktop ? fontSize : fontSizeMobile}
               >
                    Cloudy
               </StyledDescription>
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
          return (
               <StyledDescription
                    flexOrderMobile={flexOrderMobile}
                    fontSize={
                         renderLaptopAnDesktop === true
                              ? fontSize
                              : fontSizeMobile
                    }
               >
                    Rainy
               </StyledDescription>
          );
     } else if (
          IconPhrase === "Snow" ||
          IconPhrase === "Mostly Cloudy w/ Snow" ||
          IconPhrase === "Ice"
     ) {
          return (
               <StyledDescription
                    flexOrderMobile={flexOrderMobile}
                    fontSize={
                         renderLaptopAnDesktop === true
                              ? fontSize
                              : fontSizeMobile
                    }
               >
                    Snowy
               </StyledDescription>
          );
     } else if (
          IconPhrase === "Flurries" ||
          IconPhrase === "Sleet" ||
          IconPhrase === "Freezing Rain" ||
          IconPhrase === "Rain and Snow" ||
          IconPhrase === "Thunderstorms"
     ) {
          return (
               <StyledDescription
                    flexOrderMobile={flexOrderMobile}
                    fontSize={
                         renderLaptopAnDesktop === true
                              ? fontSize
                              : fontSizeMobile
                    }
               >
                    Storm
               </StyledDescription>
          );
     } else if (IconPhrase === "Windy") {
          return (
               <StyledDescription
                    flexOrderMobile={flexOrderMobile}
                    fontSize={
                         renderLaptopAnDesktop === true
                              ? fontSize
                              : fontSizeMobile
                    }
               >
                    Windy
               </StyledDescription>
          );
     }
     return <></>;
};
export default DiscoverDescription;
