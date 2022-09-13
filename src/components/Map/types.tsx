import { CityObj } from "../SearchBox/types";
import { DeggresType } from "../../shared/utils/Functions/toggleDeggres";
export type Coords = {
     lat: number | undefined;
     lng: number | undefined;
};
export type Props = {
     setServerError: (x: boolean) => void;
     coords: Coords;
     setSelectedCityDataFromMap?: (x: CityObj) => void;
     markerCoordsArray?: { data: Coords }[];
     zoom?: number;
     center?: Coords;
     citiesHourlyForcast?: {
          data: {
               temp: number;
               unit: DeggresType;
               iconParshe: string;
               icon: number;
          };
     }[];
};
