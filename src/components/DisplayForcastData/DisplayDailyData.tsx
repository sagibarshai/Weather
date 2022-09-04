import React from "react";
import {
     StyledDivRow,
     StyledColumnDiv,
     StyledText,
     StyleSimpleButton,
} from "../HomePageDisplayCity/style";
import { StyledIcon } from "../../shared/Icons/Icon";
import DiscoverIcon from "../../shared/utils/Components/DiscoverIcon/DiscoverIcon";
import { epochConverter } from "../../shared/utils/Times/epochConverter";
import { ReactComponent as IconArrowWind } from "../../shared/svg/arrow-wind.svg";
import { ReactComponent as IconArrowLeft } from "../../shared/svg/arrow-square-left.svg";
import { scrollBarHandlerXAxis } from "../../shared/utils/Functions/scrollbarHandler";
import { toggleDeggres } from "../../shared/utils/Functions/toggleDeggres";
import { useSelector } from "react-redux";
import { StoreState } from "../../redux/store";
import { forcast12HoursType } from "../HomePageDisplayCity/types";
type Props = {
     forcast12Hours: forcast12HoursType;
     renderMobile: boolean | undefined;
     renderLaptopAnDesktop: boolean | undefined;
     selected: number;
     setSelected: (x: number) => void;
};
const DisplayDailyData: React.FC<Props> = (props) => {
     const degressType = useSelector(
          (state: StoreState) => state.headerSlice.degressType
     );
     return (
          <>
               <StyledDivRow
                    height="293px"
                    justifayContent="space-between"
                    mobileHeight="auto"
                    overFlowXMobile="scroll"
                    mobileWidth="90vw"
                    justifyContentMobile="flex-start"
                    mobileGap="10px"
                    marginMobile="48px 25px 0 25px"
                    marginTop="140px"
                    overFlowX="scroll"
                    id="forcast12Hours"
               >
                    {props.forcast12Hours &&
                         props.forcast12Hours.map((day, index) => {
                              return (
                                   <StyledColumnDiv
                                        id={`forcast12hours-${index}`}
                                        key={index}
                                        mobilePadding="16px 4px"
                                        padding="40px 17px 39.9px 16px"
                                        gap="24px"
                                        mobileGap="4px"
                                        height="293px"
                                        mobileHeight="120px"
                                        minMobileWidth="80px"
                                        alignItemsMobile="center"
                                        borderRadius="20px"
                                        minWidth="153px"
                                        selected={
                                             index === props.selected
                                                  ? true
                                                  : false
                                        }
                                   >
                                        <StyledText fontSizeMobile="1.4rem">
                                             {epochConverter(day.EpochDateTime)}
                                        </StyledText>
                                        <StyledText
                                             fontWeight="bold"
                                             fontSize="3.2rem"
                                             fontSizeMobile="1.8rem"
                                        >
                                             {toggleDeggres(
                                                  degressType,
                                                  day.Temperature.Value,
                                                  day.Temperature.Unit
                                             )}
                                             °
                                        </StyledText>
                                        <DiscoverIcon
                                             height="40px"
                                             width="40px"
                                             Icon={day.WeatherIcon}
                                             IconPhrase={day.IconPhrase}
                                        />
                                        <StyledText
                                             fontSizeMobile="1.2rem"
                                             marginTopMobile="25.7px"
                                        >
                                             <StyledIcon
                                                  mobileWidth="16px"
                                                  mobileHeight="16px"
                                             >
                                                  <IconArrowWind
                                                       style={{
                                                            transform: `rotate(${day.Wind.Direction.Degrees}deg)`,
                                                            width: 16.5,
                                                            height: 16.5,
                                                       }}
                                                  />{" "}
                                             </StyledIcon>
                                             {toggleDeggres(
                                                  degressType,
                                                  day.Wind.Speed.Value,
                                                  day.Temperature.Unit
                                             )}{" "}
                                             {day.Wind.Speed.Unit}
                                        </StyledText>
                                   </StyledColumnDiv>
                              );
                         })}
               </StyledDivRow>
               {props.renderLaptopAnDesktop && (
                    <StyledDivRow
                         justifayContent="flex-end"
                         gap="24px"
                         padding="0 20px 0 0 "
                    >
                         <StyleSimpleButton
                              onClick={() => {
                                   if (props.selected <= 0) return;
                                   let newIndex = props.selected - 1;
                                   props.setSelected(newIndex);
                                   scrollBarHandlerXAxis(
                                        "forcast12Hours",
                                        `forcast12hours-${props.selected}`,
                                        "-"
                                   );
                              }}
                         >
                              <IconArrowLeft />
                         </StyleSimpleButton>
                         <StyleSimpleButton
                              rotate="rotate(180deg)"
                              onClick={() => {
                                   if (props.selected >= 11)
                                        return props.setSelected(11);
                                   let newIndex = props.selected + 1;
                                   props.setSelected(newIndex);
                                   scrollBarHandlerXAxis(
                                        "forcast12Hours",
                                        `forcast12hours-${props.selected}`,
                                        "+"
                                   );
                              }}
                         >
                              <IconArrowLeft />
                         </StyleSimpleButton>
                    </StyledDivRow>
               )}
          </>
     );
};

export default DisplayDailyData;
