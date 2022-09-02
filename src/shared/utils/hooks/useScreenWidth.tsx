import { useState, useEffect } from "react";
import { jsBreakPoints } from "../../jsBreakPoints/jsBreakPoints";
function getWindowSize() {
     const { innerWidth } = window;
     return innerWidth;
}
export const useScreenWidth = () => {
     const [windowSize, setWindowSize] = useState(getWindowSize());
     const [devicesList, setDevicesList] = useState<string[] | []>([]);
     const deviceArr: string[] = [];
     useEffect(() => {
          for (let breakPoint of jsBreakPoints) {
               if (
                    innerWidth >= breakPoint.minWidth &&
                    innerWidth <= breakPoint.maxWidth
               )
                    deviceArr.push(breakPoint.name);
          }
          setDevicesList(deviceArr);

          function handleWindowResize() {
               setWindowSize(getWindowSize());
          }

          window.addEventListener("resize", handleWindowResize);

          return () => {
               window.removeEventListener("resize", handleWindowResize);
          };
     }, [innerWidth]);
     return devicesList;
};
