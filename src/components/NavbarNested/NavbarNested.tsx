import { Group, Code, ScrollArea, rem } from "@mantine/core";
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
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
    icon: IconHome, // Replace with an icon representing home
  },
  {
    label: "Search",
    icon: IconSearch, // Replace with an icon representing search
  },
  {
    label: "My Watchlist",
    icon: IconStar, // Replace with an icon representing a star (favorite)
    links: [
      { label: "All Movies", link: "/watchlist" },
      { label: "To Watch", link: "/watchlist/to-watch" },
      { label: "Watched", link: "/watchlist/watched" },
    ],
  },
  {
    label: "Browse",
    icon: IconList, // Replace with an icon representing browsing
    links: [
      { label: "Genres", link: "/browse/genres" },
      { label: "Popular", link: "/browse/popular" },
      { label: "New Releases", link: "/browse/new-releases" },
    ],
  },
  {
    label: "Settings",
    icon: IconSettings, // Replace with an icon representing settings
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
