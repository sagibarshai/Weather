import { StyledCloud, StyledCloudBig } from "./style";
type Props = {
     renderMobile: boolean;
     renderLaptopAnDesktop: boolean;
};
const BackgroundAnimation: React.FC<Props> = (props) => {
     return (
          <>
               {props.renderLaptopAnDesktop && (
                    <>
                         <StyledCloud
                              size="m"
                              top="30%"
                              right="0%"
                              endRight="100%"
                              time="150s"
                              displayOnMobile={false}
                         />
                         <StyledCloud
                              top="40%"
                              left="-20%"
                              endLeft="100%"
                              time="250s"
                              size="l"
                         />
                         <StyledCloud
                              top="55%"
                              right="0"
                              endRight="100%"
                              time="110s"
                              size="s"
                         />
                         <StyledCloud
                              size="m"
                              top="70%"
                              left="-10%"
                              endLeft="100%"
                              time="200s"
                              displayOnMobile={false}
                         />
                         <StyledCloud
                              top="90%"
                              right="0%"
                              endRight="100%"
                              time="300s"
                              size="l"
                         />
                         <StyledCloud
                              top="70%"
                              left="0%"
                              endLeft="100%"
                              time="210s"
                              size="s"
                         />

                         <StyledCloud
                              top="45%"
                              right="0%"
                              endRight="100%"
                              time="100s"
                              size="m"
                         />
                         <StyledCloud
                              top="75%"
                              right="20%"
                              endRight="80%"
                              time="180s"
                              size="m"
                         />
                         <StyledCloud
                              top="80%"
                              right="0%"
                              endRight="100%"
                              time="160s"
                              size="m"
                         />
                         <StyledCloud
                              top="75%"
                              right="20%"
                              endRight="80%"
                              time="100s"
                              size="m"
                         />
                         <StyledCloud
                              top="30%"
                              right="10%"
                              endRight="90%"
                              time="100s"
                              size="s"
                         />
                         <StyledCloud
                              top="62.5%"
                              left="-20%"
                              endLeft="100%"
                              time="200s"
                              size="l"
                         />
                    </>
               )}
               {props.renderMobile && (
                    <>
                         <StyledCloud
                              top="10%"
                              left="0%"
                              endLeft="100%"
                              time="45s"
                              size="s"
                         />

                         <StyledCloud
                              top="30%"
                              left="0%"
                              endLeft="100%"
                              time="100s"
                              size="s"
                         />

                         <StyledCloud
                              top="50%"
                              left="0%"
                              endLeft="100%"
                              time="20s"
                              size="s"
                         />

                         <StyledCloud
                              top="70%"
                              left="0%"
                              endLeft="100%"
                              time="36s"
                              size="s"
                         />

                         <StyledCloud
                              top="90%"
                              left="0%"
                              endLeft="100%"
                              time="40s"
                              size="s"
                         />
                    </>
               )}
          </>
     );
};
export default BackgroundAnimation;
