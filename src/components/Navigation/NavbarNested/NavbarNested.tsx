import { ScrollArea } from "@mantine/core";
import {
  IconHome,
  IconSearch,
  IconStar,
  IconPencil,
  IconPlus,
} from "@tabler/icons-react";

import "./NavbarNested.css";
import { LinksGroup } from "../NavbarLinkGroup/NavbarLinksGroup";
import { NavbarLink } from "../NavbarLink/NavbarLinks";

const mockdata = [
  {
    label: "Home",
    icon: IconHome,
    link: "/home",
  },
  {
    label: "Search for movies",
    icon: IconSearch,
    link: "/search-for-movies",
  },
];

const MyWatchLists = {
  label: "My Watchlists",
  icon: IconStar,

  links: [
    { label: "Summer Flicks", link: "/watchlists/1", icon: IconPencil },
    {
      label: "Horror bonanza",
      link: "/watchlists/2",
      icon: IconPencil,
    },
    { label: "Kubricks best", link: "/watchlists/3", icon: IconPencil },
    {
      label: "Create new playlist",
      link: "/createNewPlaylist",
      icon: IconPlus,
    },
  ],
};

export function NavbarNested() {
  const links = mockdata.map((item) => (
    <NavbarLink {...item} key={item.label} />
  ));

  return (
    <nav className="navbar">
      <ScrollArea className="links">
        <div className="linksInner flex flex-col gap-6 p-4">
          {links}
          <LinksGroup {...MyWatchLists} />
        </div>
      </ScrollArea>

      <div className="footer"></div>
    </nav>
  );
}
