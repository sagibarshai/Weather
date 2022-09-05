import { HashLoader } from "react-spinners";
import React from "react";
type Props = {
     loading: boolean;
     color?: string;
     size?: number;
     marginTop?: string;
     width?: string;
     fixedCenter?: boolean;
};
const HashLoading: React.FC<Props> = (props) => {
     return (
          <HashLoader
               loading={props.loading}
               color={`${props.color}`}
               cssOverride={{
                    borderColor: "#ffff",
                    height: "20px",
                    zIndex: 1000,
                    justifySelf: "center",
                    color: "#fffff",
                    // position: "fixed",
                    position: `${props.fixedCenter ? "fixed" : "relative"}`,
                    top: `${props.fixedCenter ? "50%" : "unset"},`,
                    left: `${props.fixedCenter ? "50%" : "unset"}`,
                    transform: `${
                         props.fixedCenter ? "translate(-50%,-50%)" : "unset"
                    }`,
                    marginTop: `${props.marginTop}`,
                    width: `${props.width || "20px"}`,
               }}
               size={props.size || 50}
          />
     );
};

export default HashLoading;
