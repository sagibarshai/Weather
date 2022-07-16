import styled from "styled-components";
type StyledIconProps = {
     width?: string;
     height?: string;
     margin?: string | number;
     position?: string;
     top?: string;
     right?: string;
     left?: string;
     bottom?: string;
     transform?: string;
     zIndex?: number;
     marginRight?: string;
};
export const StyledIcon = styled.i<StyledIconProps>`
     width: ${(props) => props.width || "auto"};
     height: ${(props) => props.height || "auto"};
     margin: ${(props) => props.margin || 0};
     position: ${(props) => props.position};
     top: ${(props) => props.top};
     right: ${(props) => props.right};
     transform: ${(props) => props.transform};
     z-index: ${(props) => props.zIndex};
     margin-right: ${(props) => props.marginRight};
     vertical-align: middle;
`;
