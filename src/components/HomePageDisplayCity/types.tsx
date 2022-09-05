import { CityObj, Result } from "../SearchBox/types";
import { DeggresType } from "../../shared/utils/Functions/toggleDeggres";
import { FavoriteType } from "../../pages/Favorites/types";
export type SelectedCityType = {
     existingCity: CityObj | null;
     selectedCityDataFromFavorites?: CityObj | null;
     searchResults?: Result[] | [];
     renderMobile?: boolean;
     renderLaptopAnDesktop?: boolean;
     selectedCityDataFromMap?: CityObj | null;
     setLocationIsOpen?: (x: boolean) => void;
};
export type DailyForecastsType = {
     Date: Date;
     Temperature: {
          Minimum: { Value: number; Unit: DeggresType };
          Maximum: { Value: number; Unit: DeggresType };
     };
     Day: { IconPhrase: string; Icon: number };
};
export type DataType = {
     data: {
          DailyForecasts: DailyForecastsType[];
     };
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
