import themes from "../themes/themes";
type ObjectTypes = {
     borderBottom?: string;
     textDecoration?: string;
     paddingBottom?: string;
     color?: string;
     marginRight?: string;
};
const NavLinkActiveStyle: ObjectTypes = {
     borderBottom: "3px solid white",
     textDecoration: "none",
     paddingBottom: "18px",
     color: themes.white,
};
export default NavLinkActiveStyle;
