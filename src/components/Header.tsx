import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CSSProperties } from "styled-components";
import { useQuery, useQueryClient } from "react-query";

import Checkbox from "../shared/UIElements/Inputs/Checkbox";
import { StyledButton } from "../shared/UIElements/Button/Button";
import Input from "../shared/UIElements/Inputs/Input";
import { search } from "../shared/utils/Services/Accuweather-Api/search";
import { scrollBarHandler } from "../shared/utils/Functions/scrollbarHandler";
import SearchBox, { cityObj } from "./SearchBox";
import NavLinkActiveStyle from "../shared/navLinks/NavLinkActiveStyle";
import links from "../shared/links/links";
import themes from "../shared/themes/themes";
import { LinksType } from "../shared/links/links";
import {
     toggleBackground,
     toggleDegress,
     togglePopup,
     toggleMap,
} from "../redux/headerSlice";
import { RootState } from "../redux/store";
import {
     StyledHeader,
     StyledDiv,
     StyledDecloration,
     StyledSpan,
     StyledTooltip,
     StyledTooltipText,
     StyledWrapperButton,
} from "./styles/StyledHeader";
import { StyledIcon } from "../shared/Icons/Icon";
import { ReactComponent as IconSearchDark } from "../shared/svg/search-dark.svg";
import { ReactComponent as IconLogo } from "../shared/svg/logo-small.svg";
import { ReactComponent as IconMap } from "../shared/svg/map.svg";
import { ReactComponent as IconMoonDark } from "../shared/svg/moon-dark.svg";
import { ReactComponent as IconSunDark } from "../shared/svg/sun-dark.svg";
import { ReactComponent as IconLogout } from "../shared/svg/log-out.svg";
import { ReactComponent as IconC } from "../shared/svg/c_.svg";
import { ReactComponent as IconF } from "../shared/svg/f_.svg";
import { Result } from "./SearchBox";
import useDebounce from "../shared/utils/hooks/useDebouncedSearch";
import { useLocation, useNavigate } from "react-router-dom";
type Props = {
     setNoResultAndEnter: (x: boolean) => void;
     noResultAndEnter: boolean;
     setExistingCity: (x: cityObj) => void;
     existingCity: cityObj | null;
     setNotFoundCityName: (x: string) => void;
     currentPage: string;
};
const Header: React.FC<Props> = (props) => {
     const navigate = useNavigate();
     const location = useLocation();
     const dispatch = useDispatch();
     const [activeIconId, setActiveIconId] = useState<string>(
          location.pathname
     );
     const [searchInput, setSearchInput] = useState<string>("");
     const [searchResults, setSearchResults] = useState<[] | Result[]>([]);
     const [searchIsFocus, setSearchIsFocus] = useState<boolean>(false);
     const [hoverIndexResult, setHoverIndexResult] = useState<number>(-1);
     const currentIcon: LinksType | undefined = links.find((link) => {
          if (link.to === location.pathname) return link;
     }) as LinksType;
     useEffect(() => {
          setActiveIconId(location.pathname);
     }, [location]);
     const [activeIcon, setActiveIcon] = useState<JSX.Element | undefined>(
          currentIcon ? currentIcon.activeIcon : undefined
     );
     const client = useQueryClient();
     const isCached = client.getQueryData(["autocomplete", searchInput], {
          exact: true,
     });
     const debounce = useDebounce(searchInput, 300);
     const { data } = useQuery(
          ["autoComplete", isCached ? searchInput : debounce],
          () => search(isCached ? searchInput : debounce),
          {
               cacheTime: Infinity,
               staleTime: Infinity,
          }
     );
     useEffect(() => {
          setSearchResults(data);
          props.setNoResultAndEnter(false);
     }, [searchInput, data]);
     const NavLinkStyleHandler = (isActive: boolean, link: LinksType) => {
          if (isActive) {
               return NavLinkActiveStyle;
          }
          return;
     };
     const renderPraimaryBg = useSelector(
          (state: RootState) => state.headerSlice.renderPraimaryBackground
     );
     const degressType = useSelector(
          (state: RootState) => state.headerSlice.degressType
     );

     const openLogoutPopup = useSelector(
          (state: RootState) => state.headerSlice.openPopup
     );
     const mapIsOpen = useSelector(
          (state: RootState) => !state.headerSlice.openMap
     );
     useEffect(() => {
          scrollBarHandler(
               "scroll",
               searchResults,
               hoverIndexResult,
               setHoverIndexResult
          );
     }, [hoverIndexResult]);
     return (
          <>
               <StyledHeader
                    renderPraimaryBg={renderPraimaryBg}
                    filterBlur={openLogoutPopup}
               >
                    <StyledDiv
                         marginLeftlaptop="50px"
                         marginLeft="70px"
                         orderLaptop={1}
                    >
                         <StyledIcon width="auto" height="142px">
                              <IconLogo />
                         </StyledIcon>
                    </StyledDiv>
                    <StyledDiv
                         marginLeftlaptop="28.2px"
                         gapLaptop="32px"
                         gap="63px"
                         marginLeft="190px"
                         orderLaptop={2}
                    >
                         {links.map((link) => {
                              return (
                                   <NavLink
                                        key={link.to}
                                        to={link.to}
                                        style={({ isActive }) => {
                                             return NavLinkStyleHandler(
                                                  isActive,
                                                  link
                                             ) as CSSProperties;
                                        }}
                                        onClick={() => {
                                             setActiveIconId(link.to);
                                             setActiveIcon(link.activeIcon);
                                        }}
                                   >
                                        <StyledButton
                                             textUnderline="none"
                                             variant="linkWithImg"
                                             color={themes.white}
                                        >
                                             <StyledIcon marginRight="8px">
                                                  {activeIconId === link.to
                                                       ? activeIcon
                                                       : link.defaultIcon}
                                             </StyledIcon>
                                             {link.name}
                                        </StyledButton>
                                        {link.to === activeIconId && (
                                             <StyledDecloration />
                                        )}
                                   </NavLink>
                              );
                         })}
                    </StyledDiv>
                    <StyledDiv
                         marginLeft="139px"
                         marginLeftlaptop="56px"
                         orderLaptop={3}
                    >
                         <Input
                              value={searchInput}
                              onKeyDown={(e) => {
                                   if (
                                        e.keyCode === 40 && //arrow-donw
                                        hoverIndexResult < searchResults.length
                                   ) {
                                        setHoverIndexResult((prev) => prev + 1);
                                   } else if (
                                        e.keyCode === 38 && //arrow-up
                                        hoverIndexResult > -1
                                   )
                                        setHoverIndexResult((prev) => prev - 1);
                                   else if (e.keyCode === 13) {
                                        // enter
                                        let key =
                                             searchResults[hoverIndexResult]
                                                  .Key;
                                        let updatedExistingCity = {
                                             key,
                                             ...searchResults[hoverIndexResult],
                                        };
                                        if (!searchResults.length) {
                                             props.setNoResultAndEnter(true);
                                             setSearchIsFocus(false);
                                             props.setNotFoundCityName(
                                                  searchInput
                                             );
                                             return;
                                        }
                                        props.setExistingCity(
                                             updatedExistingCity
                                        );
                                        props.setNoResultAndEnter(false);
                                        setSearchIsFocus(false);
                                        {
                                             location.pathname !== "/home" &&
                                                  navigate("/home", {
                                                       state: {
                                                            selectedCityData: {
                                                                 key: searchResults[
                                                                      hoverIndexResult
                                                                 ].Key,
                                                                 LocalizedName:
                                                                      searchResults[
                                                                           hoverIndexResult
                                                                      ]
                                                                           .LocalizedName,
                                                                 Country: {
                                                                      LocalizedName:
                                                                           searchResults[
                                                                                hoverIndexResult
                                                                           ]
                                                                                .Country
                                                                                .LocalizedName,
                                                                 },
                                                            },
                                                       },
                                                  });
                                        }
                                   }
                              }}
                              onChange={(e: any) => {
                                   setSearchInput(e.target.value);
                                   setSearchIsFocus(true);
                              }}
                              onFocus={() => setSearchIsFocus(true)}
                              onBlur={() => {
                                   setTimeout(() => {
                                        setSearchIsFocus(false);
                                   }, 200);
                                   setHoverIndexResult(-1);
                              }}
                              variant="inactive"
                              laptopWidth="318px"
                              width="372px"
                              height="54px"
                              placeHolder="Try “Tel Aviv - Jaffa”..."
                              fontWeight="bold"
                              position="relative"
                         >
                              <StyledIcon
                                   position="absolute"
                                   top="50%"
                                   right="30px"
                                   transform="translate(0 , -50%)"
                              >
                                   <IconSearchDark />
                              </StyledIcon>
                              <SearchBox
                                   setExistingCity={props.setExistingCity}
                                   existingCity={props.existingCity}
                                   noResultAndEnter={props.noResultAndEnter}
                                   searchInput={searchInput}
                                   display={searchIsFocus && searchInput !== ""}
                                   results={searchResults}
                                   hoverIndexResult={hoverIndexResult}
                              />
                         </Input>
                    </StyledDiv>
                    <StyledDiv
                         onHover={true}
                         marginLeft="124px"
                         orderLaptop={5}
                         marginLeftlaptop="96px"
                    >
                         <StyledButton
                              variant="linkWithImg"
                              color={themes.white}
                              position="relative"
                         >
                              <StyledWrapperButton
                                   onClick={() => dispatch(toggleMap())}
                              >
                                   <StyledIcon width="30px" height="30px">
                                        {mapIsOpen ? <IconMap /> : ""}
                                   </StyledIcon>
                                   <StyledSpan>
                                        {" "}
                                        Switch to {mapIsOpen
                                             ? "map"
                                             : "layout"}{" "}
                                   </StyledSpan>
                              </StyledWrapperButton>
                              <StyledTooltip>
                                   <StyledTooltipText>
                                        Switch to {mapIsOpen ? "map" : "layout"}
                                   </StyledTooltipText>
                              </StyledTooltip>
                         </StyledButton>
                    </StyledDiv>
                    <StyledDiv
                         gap="38px"
                         marginLeft="85px"
                         marginLeftlaptop="40px"
                         gapLaptop="30px"
                         orderLaptop={4}
                    >
                         <Checkbox
                              onClick={() => dispatch(toggleDegress())}
                              htmlFor="degrees"
                              id="degrees"
                              variant="checkbox"
                              LeftIcon={<IconF />}
                              rightIcon={<IconC />}
                              top="55%"
                              checked={degressType === "F"}
                         />
                         <Checkbox
                              onClick={() => {
                                   dispatch(toggleBackground());
                              }}
                              htmlFor="mode"
                              id="mode"
                              variant="checkbox"
                              LeftIcon={<IconMoonDark />}
                              rightIcon={<IconSunDark />}
                              top="37.5%"
                              rotate={true}
                              checked={!renderPraimaryBg}
                         />
                    </StyledDiv>
                    <StyledDiv
                         marginLeft="72px"
                         marginRight="70px"
                         orderLaptop={6}
                         marginLeftlaptop="32px"
                         marginRightLaptop="50px"
                    >
                         <StyledButton
                              onClick={() => {
                                   dispatch(togglePopup());
                              }}
                              variant="linkWithImg"
                              color={themes.white}
                         >
                              <StyledIcon width="30px" height="30px">
                                   <IconLogout />
                              </StyledIcon>
                              <StyledSpan> Logout </StyledSpan>
                         </StyledButton>
                    </StyledDiv>
               </StyledHeader>
          </>
     );
};

export default Header;
