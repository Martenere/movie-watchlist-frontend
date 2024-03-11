import { Group, Code, ScrollArea, rem } from "@mantine/core";
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
} from "@tabler/icons-react";

import classes from "./NavbarNested.module.css";
import { LinksGroup } from "../NavbarLinkGroup/NavbarLinksGroup";

const mockdata = [
  { label: "Explore Movies", icon: IconGauge },
  {
    label: "Watchlists",
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: "Action Movies", link: "/" },
      { label: "Humor", link: "/" },
      { label: "Flicks for rainy days", link: "/" },
    ],
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

      <div className={classes.footer}>{/* <UserButton /> */}</div>
    </nav>
  );
}
