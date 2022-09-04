import { CityObj } from "../../SearchBox/types";
export type Props = {
     setNoResultAndEnter: (x: boolean) => void;
     noResultAndEnter: boolean;
     setExistingCity: (x: CityObj) => void;
     existingCity: CityObj | null;
     setNotFoundCityName: (x: string) => void;
     currentPage: string;
};
