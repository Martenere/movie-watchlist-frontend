import { useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  rem,
  Checkbox,
  Space,
  Divider,
  MantineProvider,
  createTheme,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

import "./NavbarLinksGroup.css";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { currentWatchlistindexAtom } from "../../../state/CurrentlyEditingState";
import { useAtom } from "jotai";
import CreateWatchlistModal from "../../pages/DetailedView/CreateWatchlistModal";

interface LinksGroupProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  link: string;
  links: { label: string; link: string; icon: unknown; data: any }[];
  buttons: { label: string; link: string; icon: unknown }[];
  createNewWatchlistButton: JSX.Element;
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  // buttons,
  links,
  createNewWatchlistButton,
}: LinksGroupProps) {
  const nav = useNavigate();
  const location = useLocation()
  const [opened, setOpened] = useState(initiallyOpened || false);
  const [selectedWatchlistIndex, setSelectedWatchlistIndex] = useAtom(
    currentWatchlistindexAtom
  );
  const handleCheckboxClick = (linkItem: LinksGroupProps["links"][number]) => {
    setSelectedWatchlistIndex(linkItem.data.id);
  };

  const handleWatchlistTitleClick = (event, linkItem) => {
    event.preventDefault();
    setSelectedWatchlistIndex(linkItem.data.id);
    nav(linkItem.link);
  };

  const linkItems = links.map((linkItem) => (
    <div
      key={linkItem.data.id}
      className="link flex justify-between items-center "
    >
      <div className={`link-text flex flex-row items-center justify-between w-full pr-2  rounded-md ${location.pathname.includes(linkItem.link) ? 'bg-slate-700' : ''}`}>
      <Text
        component="a"
        fw={600}
        className={`flex grow justify-start p-3 rounded-md items-center text-ml h-12 mr-4 `}
        onClick={(event) => handleWatchlistTitleClick(event, linkItem)}
        style={{ cursor: "pointer" }}
      >
        {linkItem.label}
      </Text>
      <Text>{linkItem.data.movies.length}</Text>
      <Checkbox
        className="ml-4"
        icon={linkItem.icon}
        checked={selectedWatchlistIndex === linkItem.data.id}
        onChange={() => handleCheckboxClick(linkItem)}
        size="md"
        />
        </div>
    </div>
  ));

  const handleClick = () => {
    setOpened((o) => !o);
  };

  return (
    <>
      <UnstyledButton onClick={handleClick} className="control">
        <Group justify="space-between" gap={0}>
          <Box
            className="link-text"
            style={{ display: "flex", alignItems: "center", fontSize:'20px', fontWeight: 700}}
          >
            <ThemeIcon variant="light" size="xl">
              <Icon />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>

          <IconChevronRight
            className="chevron mr-3"
            stroke={1.5}
            style={{
              width: rem(16),
              height: rem(16),
              transform: opened ? "rotate(-90deg)" : "none",
            }}
          />
        </Group>
      </UnstyledButton>

      <Collapse className=" ml flex flex-col bir" in={opened}>
        {linkItems}
        <Space h="md" />
        <CreateWatchlistModal />
        {createNewWatchlistButton}
      </Collapse>
    </>
  );
}
