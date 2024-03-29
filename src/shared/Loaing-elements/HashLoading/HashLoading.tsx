import { HashLoader } from "react-spinners";
import React from "react";
import { Props } from "./types";
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
                    position: `${props.fixedCenter ? "fixed" : "relative"}`,
                    top: `${props.fixedCenter === true ? "50%" : "unset"}`,
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
