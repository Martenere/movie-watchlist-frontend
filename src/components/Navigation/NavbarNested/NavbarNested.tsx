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
import { useAtom } from "jotai";
import {
  WatchlistData,
  watchlistsFromApiAtom,
} from "../../../state/watchlistsState";
import CreateNewPlaylistButton from "./CreateNewPlaylistButton";

const mainButtons = [
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

const MyWatchLists = (links) => {
  return {
    label: "My Watchlists",
    icon: IconStar,
    initiallyOpened: true,
    links: links,
    buttons: [],
    createNewWatchlistButton: CreateNewPlaylistButton(),
  };
};

const generateWatchlistLink = (watchlistData: WatchlistData) => {
  return {
    label: watchlistData.name,
    link: "/watchlists/" + watchlistData.id,
    icon: IconPencil,
    data: watchlistData,
  };
};

export function NavbarNested() {
  const [watchlists, _] = useAtom(watchlistsFromApiAtom);

  const mainNavLinks = mainButtons.map((item) => (
    <NavbarLink {...item} key={item.label} />
  ));

  const watchlistLinks = watchlists.map((watchlist) =>
    generateWatchlistLink(watchlist)
  );

  return (
    <nav className="navbar">
      <ScrollArea className="links">
        <div className="linksInner flex flex-col gap-6 p-4">
          {mainNavLinks}
          <LinksGroup {...MyWatchLists(watchlistLinks)} />
        </div>
      </ScrollArea>
      <div className="footer"></div>
    </nav>
  );
}
