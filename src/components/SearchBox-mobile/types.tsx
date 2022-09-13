import { CityObj } from "../SearchBox/types";
export type Props = {
     setOpenSearchBoxMobile: (x: boolean) => void;
     setExistingCity?: (x: CityObj) => void;
     existingCity?: CityObj | null;
     setServerError: (x: boolean) => void;
};
