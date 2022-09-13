import { CityObj, SearchResult } from "../SearchBox/types";
import { DeggresType } from "../../shared/utils/Functions/toggleDeggres";
import { FavoriteType } from "../../pages/Favorites/types";
import { Coords } from "../Map/types";
export type Props = {
     existingCity: CityObj | null;
     selectedCityDataFromFavorites?: CityObj | null;
     searchResults?: SearchResult[] | [];
     renderMobile?: boolean;
     renderLaptopAnDesktop?: boolean;
     selectedCityDataFromMap?: CityObj | null;
     setLocationIsOpen?: (x: boolean) => void;
     setCoords?: (x: Coords) => void;
     setServerError: (x: boolean) => void;
};
export type DailyForecastsType = {
     Date: Date;
     Temperature: {
          Minimum: { Value: number; Unit: DeggresType };
          Maximum: { Value: number; Unit: DeggresType };
     };
     Day: { IconPhrase: string; Icon: number };
     isLoading?: boolean;
};
export type DataDailyForecastsType = {
     data: {
          DailyForecasts: DailyForecastsType[];
     };
     isLoading?: boolean;
};
export type forcast12HoursType = {
     EpochDateTime: number;
     DateTime: string;
     Temperature: { Value: number; Unit: DeggresType };
     IconPhrase: string;
     WeatherIcon: number;
     Wind: {
          Speed: { Value: number; Unit: string };
          Direction: { Degrees: number };
     };
}[];
export type forcast12HoursTypeData = {
     isLoading?: boolean;
     data: {
          EpochDateTime: number;
          DateTime: string;
          Temperature: { Value: number; Unit: DeggresType };
          IconPhrase: string;
          WeatherIcon: number;
          Wind: {
               Speed: { Value: number; Unit: string };
               Direction: { Degrees: number };
          };
     }[];
};
export type FavoritesResultsAbraApi = { data: { results: FavoriteType[] } };
