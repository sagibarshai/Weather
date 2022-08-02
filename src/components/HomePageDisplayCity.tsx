import styled from "styled-components";
import themes from "../shared/themes/themes";
import { selectCity } from "../shared/utils/selectCity";
import { Result } from "./SearchBox";
export type SelectedCityType = {
     selectedCity?: {};
     searchResults?: Result[] | [];
     selectedCityKey?: number | string | null;
};

const StyledCityName = styled.h3`
     color: ${themes.white};
     text-shadow: -2px 3px 1px rgba(0, 0, 0, 0.1),
          -1px 1px 2px rgba(255, 255, 255, 0.25);
     font-family: inherit;
     font-size: 5rem;
     font-weight: 900;
     line-height: 1.2;
`;
const HomePageDisplayCity: React.FC<SelectedCityType> = (props) => {
     const existingResult = props.searchResults?.find(
          (result) => result.Key === props.selectedCityKey
     );
     console.log(existingResult);
     //  if (!props.selectedCity) return;
     return (
          <>
               <StyledCityName>
                    {/* {props.selectedCity.AdministrativeArea.LocalizedName} */}
               </StyledCityName>
          </>
     );
};

export default HomePageDisplayCity;
