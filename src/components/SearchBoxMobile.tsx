import styled from "styled-components";
import cssBreakPoints from "../shared/cssBreakPoints/cssBreakPoints";
import themes from "../shared/themes/themes";
import { ReactComponent as IconArrowLeft } from "../shared/svg/arrow-left.svg";
import { ReactComponent as IconSearch } from "../shared/svg/search-dark.svg";
import { ReactComponent as IconCity } from "../shared/svg/city.svg";
import { StyledIcon } from "../shared/Icons/Icon";
import Input from "../shared/UIElements/Inputs/Input";
const StyledMobileSearchBoxContainer = styled.div`
     display: none;
     height: 90vh;
     width: 100vw;
     background-color: #fcfcfc;
     position: absolute;
     z-index: 2;
     bottom: 0;
     border-radius: 30px 30px 0 0;
     @media ${cssBreakPoints.mobile} {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          justify-content: center;
     }
`;
const StyledResultDiv = styled.div`
     height: 83vh;
     display: flex;
     flex-direction: column;
     width: 100%;
     align-items: center;
`;
const StyledText = styled.p`
     width: 270px;
     height: 18px;
     font-family: inherit;
     font-size: 1.4rem;
     line-height: 1.25;
     color: ${themes.secondary};
     margin-top: 36px;
`;
const StyledButton = styled.button`
     background-color: transparent;
     border: none;
     align-self: flex-start;
     margin: 36px auto auto 30px;
`;
type Props = {
     setOpenSearchBoxMobile: (x: boolean) => void;
};
const SearchBoxMobile: React.FC<Props> = (props) => {
     return (
          <StyledMobileSearchBoxContainer
               onClick={() => props.setOpenSearchBoxMobile(false)}
          >
               <StyledButton
                    onClick={() => props.setOpenSearchBoxMobile(false)}
               >
                    <StyledIcon>
                         <IconArrowLeft />
                    </StyledIcon>
               </StyledButton>
               <Input
                    onChange={() => console.log("change")}
                    variant="inactive"
                    mobileWidth="75vw"
                    height="54px"
                    placeHolder="Try “Tel Aviv - Jaffa”..."
                    fontWeight="bold"
               >
                    <StyledIcon
                         position="absolute"
                         right="24px"
                         top="50%"
                         transform="translate(0 , -50%)"
                    >
                         <IconSearch />
                    </StyledIcon>
               </Input>
               <StyledResultDiv>
                    <StyledIcon margin="103px 0 0 0">
                         <IconCity />
                    </StyledIcon>
                    <StyledText>
                         Please search any city in the search button.
                    </StyledText>
               </StyledResultDiv>
          </StyledMobileSearchBoxContainer>
     );
};

export default SearchBoxMobile;
