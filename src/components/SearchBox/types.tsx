export type Result = {
     LocalizedName: string;
     Country: { LocalizedName: string };
     Key: number;
};
export type CityObj = {
     LocalizedName: string;
     Country: { LocalizedName: string };
     key: number;
};
export type Props = {
     display?: boolean;
     results?: Result[] | [];
     noResultAndEnter?: boolean;
     hoverIndexResult?: number;
     index?: number;
     onClick?: () => void;
     id?: any;
     searchInput?: string;
     height?: string;
     backgroundColor?: string;
     top?: string;
     overflow?: string;
     boxShadow?: string;
     color?: string;
     setExistingCity?: (x: CityObj) => void;
     existingCity?: CityObj | null;
     searchIsLoading?: boolean;
};
