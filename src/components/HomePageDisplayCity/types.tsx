export type SelectedCityType = {
     existingCity: any;
     selectedCityDataFromFavorites?: Result | null;
     searchResults?: Result[] | [];
     selectedCityKey?: number | string | null;
     renderMobile?: boolean;
     renderLaptopAnDesktop?: boolean;
     setShowOnMap: (x: boolean) => void;
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
