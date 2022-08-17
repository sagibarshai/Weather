import { ReactComponent as IconHomeFull } from "../svg/home-full.svg";
import { ReactComponent as IconFavoriteFull } from "../svg/fav-full.svg";
import { ReactComponent as IconHomeOutline } from "../svg/home-outline.svg";
import { ReactComponent as IconFavoriteOutlineWhite } from "../svg/fav-outline-white.svg";

export type LinksType = {
     to: string;
     name: string;
     activeIcon?: JSX.Element;
     defaultIcon?: JSX.Element;
};
const links: LinksType[] = [
     {
          to: "/home",
          name: "Home",
          activeIcon: <IconHomeFull />,
          defaultIcon: <IconHomeOutline />,
     },
     {
          to: "/favorites",
          name: "Favorite",
          activeIcon: <IconFavoriteFull />,
          defaultIcon: <IconFavoriteOutlineWhite />,
     },
];
export default links;
