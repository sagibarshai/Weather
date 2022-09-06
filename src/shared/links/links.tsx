import { ReactComponent as IconHomeFull } from "../svg/home-full.svg";
import { ReactComponent as IconFavoriteFull } from "../svg/fav-full.svg";
import { ReactComponent as IconHomeOutline } from "../svg/home-outline.svg";
import { ReactComponent as IconFavoriteOutlineWhite } from "../svg/fav-outline-white.svg";

import { LinksType } from "./types";
const links: LinksType[] = [
     {
          to: "/home",
          name: "Home",
          activeIcon: <IconHomeFull />,
          defaultIcon: <IconHomeOutline />,
     },
     {
          to: "/favorites",
          name: "Favorites",
          activeIcon: <IconFavoriteFull />,
          defaultIcon: <IconFavoriteOutlineWhite />,
     },
];
export default links;
