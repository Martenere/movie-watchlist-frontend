import { ScrollArea } from "@mantine/core";
import {
  IconHome,
  IconSearch,
  IconStar,
  IconList,
  IconSettings,
} from "@tabler/icons-react";
// import { UserButton } from "../UserButton/UserButton";

// import { Logo } from "./Logo";
import classes from "./NavbarNested.module.css";
import { LinksGroup } from "../NavbarLinkGroup/NavbarLinksGroup";

const mockdata = [
  {
    label: "Home",
    icon: IconHome,
  },
  {
    label: "Search",
    icon: IconSearch,
  },
  {
    label: "My Watchlist",
    icon: IconStar,
    links: [
      { label: "All Movies", link: "/watchlist" },
      { label: "To Watch", link: "/watchlist/to-watch" },
      { label: "Watched", link: "/watchlist/watched" },
    ],
  },
  {
    label: "Browse",
    icon: IconList,
    links: [
      { label: "Genres", link: "/browse/genres" },
      { label: "Popular", link: "/browse/popular" },
      { label: "New Releases", link: "/browse/new-releases" },
    ],
  },
  {
    label: "Settings",
    icon: IconSettings,
  },
];

export function NavbarNested() {
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <nav className={classes.navbar}>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}></div>
    </nav>
  );
}
