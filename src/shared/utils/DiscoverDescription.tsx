import { StyledDescription } from "../../components/styles/StyledHomePageDisplayCity";
type Props = {
     IconPhrase: string;
     fontSize?: string;
};

const DiscoverDescription: React.FC<Props> = ({ IconPhrase, fontSize }) => {
     console.log(IconPhrase + "From DiscoverDescriptio");
     if (
          IconPhrase === "Sunny" ||
          IconPhrase === "Mostly sunny" ||
          IconPhrase === "Partly sunny" ||
          IconPhrase === "Hot"
     ) {
          return (
               <StyledDescription fontSize={fontSize}>Clear</StyledDescription>
          );
     } else if (
          IconPhrase === "Hazy Sunshine" ||
          IconPhrase === "Mostly cloudy" ||
          IconPhrase === "Mostly Cloudy w/ Flurries" ||
          IconPhrase === "Partly Sunny w/ Flurries" ||
          IconPhrase === "Intermittent clouds"
     ) {
          return (
               <StyledDescription fontSize={fontSize}>
                    Sun & Cloudy
               </StyledDescription>
          );
     } else if (
          IconPhrase === "Cloudy" ||
          IconPhrase === "Dreary" ||
          IconPhrase === "Fog"
     ) {
          return (
               <StyledDescription fontSize={fontSize}>Cloudy</StyledDescription>
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
               <StyledDescription fontSize={fontSize}>Rainy</StyledDescription>
          );
     } else if (
          IconPhrase === "Snow" ||
          IconPhrase === "Mostly Cloudy w/ Snow" ||
          IconPhrase === "Ice"
     ) {
          return (
               <StyledDescription fontSize={fontSize}>Snowy</StyledDescription>
          );
     } else if (
          IconPhrase === "Flurries" ||
          IconPhrase === "Sleet" ||
          IconPhrase === "Freezing Rain" ||
          IconPhrase === "Rain and Snow" ||
          IconPhrase === "Thunderstorms"
     ) {
          return (
               <StyledDescription fontSize={fontSize}>Storm</StyledDescription>
          );
     } else if (IconPhrase === "Windy") {
          return (
               <StyledDescription fontSize={fontSize}>Windy</StyledDescription>
          );
     }
     return <></>;
};
export default DiscoverDescription;
