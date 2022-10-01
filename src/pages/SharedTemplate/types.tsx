import { CityObj } from "../../components/SearchBox/types";
import { Coords } from "../../components/Map/types";
export type SharedPageProps = {
     pageProps: {
          setServerError: (x: boolean) => void;
          coords: Coords;
          existingCity: CityObj | null;
          renderMobile?: boolean;
          renderLaptopAnDesktop?: boolean;
          selectedCityDataFromFavorites: CityObj | null;
          setSelectedCityDataFromFavorites: (x: CityObj) => void;
          setOpenSearchBoxMobile: (x: boolean) => void;
          openSearchBoxMobile?: boolean;
          setExistingCity: (x: null | CityObj) => void;
          notFoundCityName?: string;
          setNoResultAndEnter: (x: boolean) => void;
          noResultAndEnter: boolean;
          setCurrentPage: (x: string) => void;
          locationIsOpen?: boolean;
          setLocationIsOpen: (x: boolean) => void;
          setCoords: (x: Coords) => void;
          serverError: boolean;
     };
};
export type Props = {
     renderMobile: boolean;
     renderLaptopAnDesktop: boolean;
};
