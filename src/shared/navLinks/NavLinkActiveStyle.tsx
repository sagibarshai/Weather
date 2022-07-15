import themes from "../themes/themes";
type ObjectTypes = {
     textDecoration?: string;
     color?: string;
     position?: string;
};
const NavLinkActiveStyle: ObjectTypes = {
     textDecoration: "none",
     color: themes.white,
     position: "relative",
};
export default NavLinkActiveStyle;
